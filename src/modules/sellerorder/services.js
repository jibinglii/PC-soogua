// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import http from '$utils/http'

// send login data and retrive a new token
export const getOrder = (params) => {
    return http.get('/api/v1/user/seller-orders', params)
}