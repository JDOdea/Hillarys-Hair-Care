import { useState } from "react";
import { useEffect } from "react";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { createAppointment, getAppointments } from "../data/AppointmentsData";
import { getActiveStylists } from "../data/StylistsData";
import { getCustomers } from "../data/CustomersData";
import { getServices } from "../data/ServicesData";

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [modal, setModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [stylists, setStylists] = useState([]);
    const [stylistId, setStylistId] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(0);
    const [services, setServices] = useState([]);
    const [appointment, update] = useState(
        {
            serviceIds: [],
            scheduledDate: null,
            scheduledTime: "09:00"
        });

    const toggle = () => setModal(!modal);
    const onDismiss = () => setVisible(false);

    const getAllAppointments = () => {
        getAppointments().then(setAppointments);
    }

    useEffect(
        () => {
            getAllAppointments();

            getActiveStylists().then(setStylists);

            getCustomers().then(setCustomers);

            getServices().then(setServices);
        },
        []
    )


    const submit = () => {
        const chosenServices = [];
        for (const serviceId of appointment.serviceIds) {
            const foundService = services.find((s) => {
                return s.id === serviceId;
            })

            chosenServices.push(foundService)
        }

        const newAppointment = {
            stylistId: stylistId,
            customerId: customerId,
            services: chosenServices,
            scheduledDate: new Date(`${appointment.scheduledDate}T${appointment.scheduledTime}:00`),
            isCancelled: false
        }
        
        if (!appointment.scheduledDate || !newAppointment.services || stylistId == 0 || customerId == 0) {
            setVisible(true);
            return;
        }
        

        createAppointment(newAppointment).then((data) => {
            console.log(data)
            if (data === "Invalid data submitted") {
                setVisible(true);
                return;
            }

            toggle();
            getAllAppointments();
        })
    }

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Appointments</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Services</th>
                        <th>Scheduled Date</th>
                        <th>Total Cost</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((a) => (
                        <tr key={`appointment--${a.id}`}>
                            <th scope="row">{a.id}</th>
                            <td>{a.customer.firstName} {a.customer.lastName}</td>
                            <td>{a.stylist.firstName} {a.stylist.lastName}</td>
                            <td></td>
                            <td>{a.scheduledDate}</td>
                            <td>${a.totalCost}</td>
                            <td>
                                <Button>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                {
                                    a.isCancelled
                                    ?
                                    "Cancelled"
                                    :
                                    <Button>
                                        Cancel
                                    </Button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggle}>
                <div className="alert-float" style={{position: 'absolute', top: 10, left: 150}}>
                    <Alert color="info" isOpen={visible} toggle={onDismiss}>
                        Please fill each input
                    </Alert>
                </div>
                    <ModalHeader toggle={toggle}>Appointment</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="stylist">Stylist:</Label>
                                <Input 
                                    type="select"
                                    name="stylist"
                                    onChange={(e) => {
                                        setStylistId(parseInt(e.target.value));
                                    }}
                                >
                                    <option value="default" hidden>Select a Stylist</option>
                                    {stylists.map((s) => (
                                        <option
                                            value={s.id}
                                            key={`stylist--${s.id}`}
                                        >{s.firstName} {s.lastName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="customer">Customer:</Label>
                                <Input 
                                    type="select"
                                    name="customer"
                                    onChange={(e) => {
                                        setCustomerId(parseInt(e.target.value));
                                    }}
                                >
                                    <option value="default" hidden>Select a Customer</option>
                                    {customers.map((c) => (
                                        <option
                                            value={c.id}
                                            key={`customer--${c.id}`}
                                        >{c.firstName} {c.lastName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <div className="appointmentForm-bottom">
                                <FormGroup>
                                    <Label htmlFor="services">Services:</Label>
                                    <div className="appointmentForm-services">
                                        {
                                            services.map((s) => (
                                                <div className="appointmentForm-service" key={`service--${s.id}`}>
                                                    <Label htmlFor={`service--${s.id}`} key={`service--${s.id}`}>{s.name}</Label>
                                                    <div className="appointmentForm-checkbox">
                                                        <Input 
                                                            key={`service--${s.id}`}
                                                            type="checkbox"
                                                            name={`service--${s.id}`}
                                                            value={s.id}
                                                            onChange={(e) => {
                                                                let copy = {...appointment};
                                                                if (e.target.checked) {
                                                                    const serviceId = copy.serviceIds.find((si) => {
                                                                        return si === parseInt(e.target.value);
                                                                    });
                                                                    if (!serviceId) {
                                                                        copy.serviceIds.push(parseInt(e.target.value));
                                                                        update(copy);
                                                                    }
                                                                }
                                                                else {
                                                                    const serviceId = copy.serviceIds.find((si) => {
                                                                        return si === parseInt(e.target.value);
                                                                    })
                                                                    if (serviceId) {
                                                                        let filteredCopy = copy;
                                                                        filteredCopy.serviceIds = copy.serviceIds.filter((si) => {
                                                                            return si !== parseInt(e.target.value);
                                                                        })
                                                                        update(filteredCopy);
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </FormGroup>
                                <div className="appointmentForm-dateTime">
                                    <FormGroup>
                                        <Label htmlFor="date">Date:</Label>
                                        <Input 
                                            type="date"
                                            name="date"
                                            min={new Date().toJSON().slice(0,10).toString()}
                                            onChange={(e) => {
                                                const copy = {...appointment};
                                                copy.scheduledDate = e.target.value;
                                                update(copy);
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="time">Time:</Label>
                                        <Input 
                                            type="time"
                                            name="time"
                                            defaultValue={"09:00"}
                                            min={"09:00"}
                                            max={"18:00"}
                                            step={'900'}
                                            onChange={(e) => {
                                                const copy = {...appointment};
                                                copy.scheduledTime = e.target.value;
                                                update(copy);
                                            }}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <Button
                                onClick={submit}
                            >Submit</Button>
                        </Form>
                    </ModalBody>
            </Modal>
            <Button
                onClick={toggle}>
                    Add Appointment
            </Button>
        </div>
    )
}