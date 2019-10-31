import axios from '../axios'

export function userEdit(clientid, clientname, realname,phonenumber, rolename) {
  return axios({
    url: '/Client/update?rolename='+rolename,
    method: 'post',
    data: {
      clientid,
      clientname,
      realname,
      phonenumber,
    }
  })
}