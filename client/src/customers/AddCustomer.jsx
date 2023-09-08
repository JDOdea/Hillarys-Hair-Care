import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom/dist";

export const AddCustomer = () => {
    const navigate = useNavigate();

    const [customer, update] = useState(
        {
            firstName: "",
            lastName: "",
            email: ""
        });


        const submit = () => {

        }

        return (
            <div className="container">
                <h4>Add a New Customer</h4>
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
                    <Button></Button>
                </Form>
            </div>
        )
}