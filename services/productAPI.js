const baseUrl = "https://62b9626541bf319d227b2b79.mockapi.io/products"

function apiGetProduct() {
    return axios({
        url: baseUrl,
        method: "GET"
    })
}