const _apiUrl = "/api/appointments";

//  Get all Appointments
export const getAppointments = async () => {
    return await fetch(_apiUrl).then((r) => r.json());
}

//  Create Appointment
export const createAppointment = (appointment) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
    }).then((res) => (res.json()));
}

//  Edit Appointment
export const putUpdatedAppointment = async (id, appointment) => {
    await fetch(`${_apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
    });
}

//  Cancel Appointment
export const cancelAppointment = async (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });
}