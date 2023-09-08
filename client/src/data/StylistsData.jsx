const _apiUrl = "/api/stylists";

//  Get all Stylists
export const getStylists = async () => {
    return await fetch(_apiUrl).then((r) => r.json());
}

//  Add Stylist
export const createStylist = (stylist) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stylist),
    }).then((res) => res.json());
}