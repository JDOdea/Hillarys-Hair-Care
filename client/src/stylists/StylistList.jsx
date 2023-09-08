import { useEffect, useState } from "react";
import { getStylists } from "../data/StylistsData";
import { Table } from "reactstrap";

export const StylistList = () => {
    const [stylists, setStylists] = useState([]);

    const getAllStylists = () => {
        getStylists().then(setStylists);
    }

    useEffect(
        () => {
            getAllStylists();
        },
        []
    )

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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}