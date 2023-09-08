import { useEffect, useState } from "react";
import { changeStylistStatus, createStylist, getStylists } from "../data/StylistsData";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

export const StylistList = () => {
    const [stylists, setStylists] = useState([]);
    const [modal, setModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [stylist, update] = useState(
        {
            firstName: null,
            lastName: null,
            isActive: true
        }
    );

    const toggle = () => setModal(!modal);
    const onDismiss = () => setVisible(false);

    const getAllStylists = () => {
        getStylists().then(setStylists);
    }

    useEffect(
        () => {
            getAllStylists();
        },
        []
    )

    const submit = () => {
        const newStylist = {
            firstName: stylist.firstName,
            lastName: stylist.lastName,
            isActive: stylist.isActive
        }

        createStylist(newStylist).then((data) => {
            if (data == "Invalid data submitted") {
                setVisible(true);
                return;
            }

            toggle();
            getAllStylists();
        })
    }

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Stylists</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stylists.map((s) => (
                        <tr key={`stylist--${s.id}`}>
                            <th scope="row" key={`stylist--${s.id}`}>{s.id}</th>
                            <td>{s.firstName}</td>
                            <td>{s.lastName}</td>
                            <td>{s.isActive ? "Active" : "Inactive"}</td>
                            <td>
                                {
                                    s.isActive 
                                    ? 
                                    <Button onClick={() => {
                                        changeStylistStatus(s.id)
                                            .then(getAllStylists());
                                    }}>Deactivate</Button>
                                    :
                                    <Button onClick={() => {
                                        changeStylistStatus(s.id)
                                            .then(getAllStylists());
                                    }}>Activate</Button>
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
                <ModalHeader toggle={toggle}>New Stylist</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={stylist.firstName}
                                onChange={(e) => {
                                    const copy = {...stylist};
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
                                value={stylist.lastName}
                                onChange={(e) => {
                                    const copy = {...stylist};
                                    copy.lastName = e.target.value;
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
                Add Stylist
            </Button>
        </div>
    )
}