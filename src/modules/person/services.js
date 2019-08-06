import http from '$utils/http'

export const getOrderCount = () => {
    let param = {
        headers: {
            "X-Store-Id": ""
        }
    };
    return http.get('api/v1/user/pc-me', param)
}

export const getAccountTotal = () => {
    return http.post('api/v1/account-total')
}

export const editPasswd = ({ pass }) => {
    return http.post('api/v1/user/update-user', {
        password: pass
    })
}

export const getDelete = () => {
    return http.post('api/v1/account-total')
}