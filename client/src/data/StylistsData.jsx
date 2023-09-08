const _apiUrl = "/api/stylists";

//  Get all Stylists
export const getStylists = async () => {
    return await fetch(_apiUrl).then((r) => r.json());
}