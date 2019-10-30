import axios from '../axios'

export function passEdit(clientName, password) {
  return axios({
    url: '/client/passWord',
    method: 'post',
    params: {
      clientName,
      password
    }
  })
}