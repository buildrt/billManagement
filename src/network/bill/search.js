import axios from '../axios'

export function billSearch(billCode, supplierName, pay) {
  return axios({
    url: '/bill/select',
    method: 'post',
    data: {
      billCode,
      supplierName,
      pay,
    }
  })
}