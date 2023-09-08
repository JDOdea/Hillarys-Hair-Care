const _apiUrl = "/api/customers"

//  Get all Customers
export const getCustomers = async () => {
    return await fetch(_apiUrl).then((r) => r.json());
}

//  Add Customer
export const createCustomer = (customer) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    }).then((res) => res.json());
}

//  Remove Customer
export const removeCustomer = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
}