
import http from '$utils/http'

export const getOrderCount = () => {
    return http.get('api/v1/user/pc-me')
}

export const getAccountTotal = () => {
    return http.post('api/v1/account-total')
}

export const editPasswd = ({ pass }) => {
    return http.post('api/v1/user/update-user', {
        password: pass
    })
}