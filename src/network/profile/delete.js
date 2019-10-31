import axios from '../axios'

export function deleteUser(clientId) {
  return axios({
    url: '/Client/delete',
    method: 'post',
    params: {
      clientId,
    }
  })
}