import axios from '../axios'

export function profileSearch(clientName) {
  return axios({
    url: '/profile/select',
    method: 'post',
    data: {
      clientName,
    }
  })
}