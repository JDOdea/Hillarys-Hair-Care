const _apiUrl = "/api/customers"

//  Get all Customers
export const getCustomers = async () => {
    return await fetch(_apiUrl).then((r) => r.json());
}