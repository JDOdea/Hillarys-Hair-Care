import { useState } from "react";
import { useEffect } from "react";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { cancelAppointment, createAppointment, getAppointments, putUpdatedAppointment } from "../data/AppointmentsData";
import { getActiveStylists, getStylists } from "../data/StylistsData";
import { getCustomers } from "../data/CustomersData";
import { getServices } from "../data/ServicesData";


export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    const [createModal, setCreateModal] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const [stylists, setStylists] = useState([]);
    const [activeStylists, setActiveStylists] = useState([]);
    const [stylistId, setStylistId] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(0);
    const [services, setServices] = useState([]);
    const [serviceIds, setServiceIds] = useState([]);
    const [appointment, update] = useState(
        {
            serviceIds: [],
            scheduledDate: null,
            scheduledTime: "09:00"
        });
    const [appointmentEdit, updateAppointment] = useState({});


    const toggle = () => setCreateModal(!createModal);
    const onDismiss = () => setCreateVisible(false);
    const editToggle = () => setEditModal(!editModal);
    const editOnDismiss = () => setEditVisible(false);

    const getAllAppointments = () => {
        getAppointments().then(setAppointments);
    }

    useEffect(
        () => {
            getAllAppointments();

            getStylists().then(setStylists);

            getActiveStylists().then(setActiveStylists);

            getCustomers().then(setCustomers);

            getServices().then(setServices);
        },
        []
    )

    const displayDateTime = (date) => {
        const displayDate = new Date(date).toUTCString().slice(0, 16);
        const displayTime = new Date(date).toLocaleTimeString().slice(0, 23);
        const dateString = `${displayTime} ${displayDate}`

        return dateString;
    }

    const editAppointmentMatch = (appointment) => {
        const copy = {...appointment};
        copy.serviceIds = [];
        copy.scheduledDate = appointment.scheduledDate.slice(0,10)
        copy.scheduledTime = appointment.scheduledDate.slice(11, 16)

        for (const service of copy.services) {
            copy.serviceIds.push(service.id);
        }
        
        updateAppointment(copy);
    }

    const handleUpdate = () => {
        const chosenServices = [];
        for (const serviceId of appointmentEdit.serviceIds) {
            const foundService = services.find((s) => {
                return s.id === serviceId;
            })

            chosenServices.push(foundService)
        }

        const utcYear = appointmentEdit.scheduledDate.substr(0, 4);
        const utcMonth = appointmentEdit.scheduledDate.substr(5, 2) - 1;
        const utcDay = appointmentEdit.scheduledDate.substr(8, 2);
        const utcHour = appointmentEdit.scheduledTime.substr(0, 2);
        const utcMinute = appointmentEdit.scheduledTime.substr(3, 2);


        const utcDateTime = new Date(Date.UTC(utcYear, utcMonth, utcDay, utcHour, utcMinute))

        const updatedAppointment = {
            stylistId: appointmentEdit.stylistId,
            customerId: appointmentEdit.customerId,
            services: chosenServices,
            scheduledDate: utcDateTime,
            isCancelled: appointmentEdit.isCancelled
        }
        
        putUpdatedAppointment(appointmentEdit.id, updatedAppointment)
            .then(() => {
                editToggle();
                getAllAppointments();
            })
    }

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
            scheduledDate: new Date(`${appointment.scheduledDate}T${appointment.scheduledTime}:00`).toISOString(),
            isCancelled: false
        }
        
        if (!appointment.scheduledDate || !newAppointment.services || stylistId == 0 || customerId == 0) {
            setCreateVisible(true);
            return;
        }
        

        createAppointment(newAppointment).then((data) => {
            if (data === "Invalid data submitted") {
                setCreateVisible(true);
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
                            <td>
                                <div className="displayDateTime">
                                    {displayDateTime(a.scheduledDate)}
                                </div>
                            </td>
                            <td>${a.totalCost}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        editAppointmentMatch(a);
                                        editToggle();
                                    }}
                                >
                                    Edit
                                </Button>
                            </td>
                            <td>
                                {
                                    a.isCancelled
                                    ?
                                    "Cancelled"
                                    :
                                    <Button
                                        onClick={() => {
                                            cancelAppointment(a.id);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                editModal
                ?
                <Modal isOpen={editModal} toggle={editToggle}>
                <ModalHeader toggle={editToggle}>Edit Appointment</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="stylist">Stylist:</Label>
                            <Input
                                type="select"
                                name="stylist"
                                defaultValue={appointmentEdit.stylistId}
                                onChange={(e) => {
                                    const copy = {...appointmentEdit};
                                    copy.stylistId = parseInt(e.target.value);
                                    updateAppointment(copy);
                                }}>
                                {
                                    stylists.map((s) => (
                                        <option
                                            value={s.id}
                                            key={`stylist--${s.id}`}
                                        >{s.firstName} {s.lastName}</option>
                                    ))
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="customer">Customer:</Label>
                            <Input
                                type="select"
                                name="customer"
                                defaultValue={appointmentEdit.customerId}
                                onChange={(e) => {
                                    const copy = {...appointmentEdit};
                                    copy.customerId = parseInt(e.target.value);
                                    updateAppointment(copy);
                                }}
                            >
                                {
                                    customers.map((c) => (
                                        <option
                                            value={c.id}
                                            key={`customer--${c.id}`}
                                        >{c.firstName} {c.lastName}</option>
                                    ))
                                }
                            </Input>
                        </FormGroup>
                        <div className="appointmentForm-bottom">
                            <FormGroup>
                                <Label htmlFor="services">Services:</Label>
                                <div className="appointmentForm-services">
                                    {
                                        services.map((s) => (
                                            <div className="appointmentForm-services" key={`service--${s.id}`}>
                                                {
                                                    appointmentEdit.serviceIds.find((sid) => {
                                                        return sid === s.id;
                                                    })
                                                    ?
                                                    (
                                                        <>
                                                            <div className="appointmentForm-service">
                                                            <Label htmlFor={`service--${s.id}`} key={`service--${s.id}`}>{s.name}</Label>
                                                                <div className="appointmentForm-checkbox">
                                                                    <Input
                                                                        key={`service--${s.id}`}
                                                                        type="checkbox"
                                                                        name={`service--${s.id}`}
                                                                        value={s.id}
                                                                        checked
                                                                        onChange={(e) => {
                                                                            let copy = {...appointmentEdit};
                                                                            const serviceId = copy.serviceIds.find((si) => {
                                                                                return si === parseInt(e.target.value);
                                                                            })
                                                                            if (e.target.checked) {
                                                                                if (!serviceId) {
                                                                                    copy.serviceIds.push(parseInt(e.target.value));
                                                                                    updateAppointment(copy);
                                                                                }
                                                                            }
                                                                            else {
                                                                                if (serviceId) {
                                                                                    let filtered = copy;
                                                                                    filtered.serviceIds = copy.serviceIds.filter((si) => {
                                                                                        return si !== parseInt(e.target.value);
                                                                                    })
                                                                                    updateAppointment(filtered);
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <div className="appointmentForm-service">
                                                            <Label htmlFor={`service--${s.id}`} key={`service--${s.id}`}>{s.name}</Label>
                                                                <div className="appointmentForm-checkbox">
                                                                    <Input
                                                                        key={`service--${s.id}`}
                                                                        type="checkbox"
                                                                        name={`service--${s.id}`}
                                                                        value={s.id}
                                                                        onChange={(e) => {
                                                                            let copy = {...appointmentEdit};
                                                                            const serviceId = copy.serviceIds.find((si) => {
                                                                                return si === parseInt(e.target.value);
                                                                            })
                                                                            if (e.target.checked) {
                                                                                if (!serviceId) {
                                                                                    copy.serviceIds.push(parseInt(e.target.value));
                                                                                    updateAppointment(copy);
                                                                                }
                                                                            }
                                                                            else {
                                                                                if (serviceId) {
                                                                                    let filtered = copy;
                                                                                    filtered.serviceIds = copy.serviceIds.filter((si) => {
                                                                                        return si !== parseInt(e.target.value);
                                                                                    })
                                                                                    updateAppointment(filtered);
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
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
                                        defaultValue={appointmentEdit.scheduledDate}
                                        onChange={(e) => {
                                            const copy = {...appointmentEdit};
                                            copy.scheduledDate = e.target.value;
                                            updateAppointment(copy);
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="time">Time:</Label>
                                    <Input 
                                        type="time"
                                        name="time"
                                        defaultValue={appointmentEdit.scheduledTime}
                                        min={"09:00"}
                                        max={"18:00"}
                                        step={'900'}
                                        onChange={(e) => {
                                            const copy = {...appointmentEdit};
                                            copy.scheduledTime = e.target.value;
                                            updateAppointment(copy);
                                        }}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                handleUpdate();
                            }}
                        >Update</Button>
                    </Form>
                </ModalBody>
                </Modal>
                :
                ""
            }
            <Modal isOpen={createModal} toggle={toggle}>
                <div className="alert-float" style={{position: 'absolute', top: 10, left: 150}}>
                    <Alert color="info" isOpen={createVisible} toggle={onDismiss}>
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
                                    {activeStylists.map((s) => (
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