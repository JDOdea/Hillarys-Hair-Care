import { useEffect, useState } from "react";
import { getServices } from "../data/ServicesData";
import { Table } from "reactstrap";

export const ServiceList = () => {
    const [services, setServices] = useState([]);

    const getAllServices = () => {
        getServices().then(setServices);
    }

    useEffect(
        () => {
            getAllServices();
        },
        []
    )

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Services</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Service</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((s) => (
                        <tr key={`service--${s.id}`}>
                            <th scope="row">{s.id}</th>
                            <td>{s.name}</td>
                            <td>${s.charge}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}