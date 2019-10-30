import axios from '../axios'

export function userInsert(clientid, clientname, realname,phonenumber, rolename, password) {
  return axios({
    url: '/Client/insert',
    method: 'post',
    data: {
      clientid,
      clientname,
      realname,
      phonenumber,
      rolename,
      password
    }
  })
}