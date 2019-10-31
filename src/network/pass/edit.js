import axios from '../axios'

export function passEdit(clientid, password) {
  return axios({
    url: '/client/passWord',
    method: 'post',
    params: {
      clientid,
      password
    }
  })
}