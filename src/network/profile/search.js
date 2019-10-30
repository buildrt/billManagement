import axios from '../axios'

export function profileSearch(clientName) {
  return axios({
    url: '/Client/selectOne',
    method: 'post',
    params: {
      clientName,
    }
  })
}