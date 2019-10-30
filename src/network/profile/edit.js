import axios from '../axios'

export function userEdit(clientId, clientName, name,phoneNumber, crId) {
  return axios({
    url: '/Client/update',
    method: 'post',
    data: {
      clientId,
      clientName,
      name,
      phoneNumber,
      crId
    }
  })
}