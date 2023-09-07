import { useState } from "react";
import { useEffect } from "react";
import { Table } from "reactstrap";
import { getCustomers } from "../data/CustomersData";

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const getAllCustomers = () => {
        getCustomers().then(setCustomers);
    }

    useEffect(
        () => {
            getAllCustomers();
        },
        []
    )

    return (
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
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={`customer--${c.id}`}>
                            <th scope="row">{c.id}</th>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}