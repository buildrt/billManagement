import axios from '../axios'

export function deleteBill(billCode) {
  return axios({
    url: '/bill/select',
    method: 'post',
    data: {
      billCode,
    }
  })
}