const _apiUrl = "/api/services";

//  Get all Services
export const getServices = async () => {
    return await fetch(_apiUrl).then((r) => r.json());
}