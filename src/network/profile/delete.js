import axios from '../axios'

export function deleteUser(clientId) {
  return axios({
    url: '/profile/delete',
    method: 'post',
    data: {
      clientId,
    }
  })
}