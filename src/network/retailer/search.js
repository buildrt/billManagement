import axios from '../axios'

export function retailerSearch(supplierName) {
  return axios({
    url: '/retailer/select',
    method: 'post',
    data: {
      supplierName,
    }
  })
}