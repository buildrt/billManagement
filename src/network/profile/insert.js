import axios from '../axios'

export function userInsert(clientId, clientName, name,phoneNumber, crId, passWord) {
  return axios({
    url: '/profile/insert',
    method: 'post',
    data: {
      clientId,
      clientName,
      name,
      phoneNumber,
      crId,
      passWord
    }
  })
}