// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import http from '$utils/http'

// send login data and retrive a new token
export const postLogin = ({ username, password }) => {
  return http.post('api/v1/auth/login', {
    grant_type: 'password',
    client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
    client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
    username: username,
    password: password,
    scope: ''
  })
}


export const getCode = ({ ticket, randstr, username }) => {
  // try {
  return http.post('api/v1/tcatpcha', {
    client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
    client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
    ticket: ticket,
    randstr: randstr,
    mobile: username,
  });
  // } catch (e) {
  //   console.log(e)
  // }

};

export const postLoginByCode = ({ username, code }) => {

  return http.post('api/v1/user/login-by-code', {
    grant_type: 'code',
    client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
    client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
    mobile: username,
    code: code,
    scope: ''
  })
}



// get current user's data
export const loadUserData = () => http.get('api/v1/auth/me').catch(() => { })
