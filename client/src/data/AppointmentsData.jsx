const _apiUrl = "/api/appointments";

//  Get all Appointments
export const getAppointments = async () => {
    return await fetch(_apiUrl).then((r) => r.json());
}