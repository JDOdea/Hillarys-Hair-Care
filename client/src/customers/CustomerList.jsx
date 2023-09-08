import { useState } from "react";
import { useEffect } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { createCustomer, getCustomers, removeCustomer } from "../data/CustomersData";



export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [modal, setModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [customer, update] = useState(
        {
            firstName: null,
            lastName: null,
            email: null
        }
    );

    const toggle = () => setModal(!modal);
    const onDismiss = () => setVisible(false);

    const getAllCustomers = () => {
        getCustomers().then(setCustomers);
    }

    useEffect(
        () => {
            getAllCustomers();
        },
        []
    )

    const submit = () => {
        const newCustomer = {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email
        }

        createCustomer(newCustomer).then((data) => {
            if (data == "Invalid data submitted") {
                setVisible(true);
                return;
            }
            
            toggle();
            getAllCustomers();
        })
    }



    return (
        <>
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Customers</h4>
            </div>  
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={`customer--${c.id}`}>
                            <th scope="row" key={`customer--${c.id}`}>{c.id}</th>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.email}</td>
                            <td>
                                <Button 
                                    key={`customer--${c.id}`}
                                    onClick={() => {
                                        removeCustomer(c.id)
                                            .then(getAllCustomers);
                                    }}
                                >Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggle} >
            <div className="alert-float" style={{position: 'absolute', top: 10, left: 150}}>
                <Alert color="info" isOpen={visible} toggle={onDismiss}>
                    Please fill each input
                </Alert>
            </div>
                <ModalHeader toggle={toggle}>New Customer</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                                type="text"
                                placeholder="First Name..."
                                name="firstName"
                                value={customer.firstName}
                                onChange={(e) => {
                                    const copy = {...customer};
                                    copy.firstName = e.target.value;
                                    update(copy);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                                type="text"
                                placeholder="Last Name..."
                                name="lastName"
                                value={customer.lastName}
                                onChange={(e) => {
                                    const copy = {...customer};
                                    copy.lastName = e.target.value;
                                    update(copy);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                                type="text"
                                placeholder="Email..."
                                name="email"
                                value={customer.email}
                                onChange={(e) => {
                                    const copy = {...customer};
                                    copy.email = e.target.value;
                                    update(copy);
                                }}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {submit()}}>
                        Submit
                    </Button>
                </ModalFooter>
            </Modal>
            <Button
                onClick={toggle}>
                    Add Customer
            </Button>
        </div>
        </>
    )
}