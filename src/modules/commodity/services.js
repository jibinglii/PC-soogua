// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import http from '$utils/http'

// send login data and retrive a new token
export const getGoods = (params) => {
    return http.get('/api/v2/store/user/goods', params)
}