import axios from '../axios'

export function deleteRetailer(supplierId) {
  return axios({
    url: '/retailer/delete',
    method: 'post',
    data: {
      supplierId,
    }
  })
}