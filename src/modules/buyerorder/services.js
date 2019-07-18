
import http from '$utils/http'

export const orderConfirm = (id) => {
    return http.post('api/v1/order/confirm/' + id)
}
export const orderDelete = (id) => {
    return http.delete('api/v1/order/' + id)
}