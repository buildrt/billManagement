import axios from '../axios'

export function deleteRetailer(supplierid) {
  return axios({
    url: '/Supplier/delete',
    method: 'post',
    params: {
      supplierid,
    }
  })
}