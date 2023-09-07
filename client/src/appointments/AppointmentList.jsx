import { useState } from "react";
import { useEffect } from "react";
import { Table } from "reactstrap";
import { getAppointments } from "../data/AppointmentsData";

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    const getAllAppointments = () => {
        getAppointments().then(setAppointments);
    }

    useEffect(
        () => {
            getAllAppointments();
        },
        []
    )

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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}