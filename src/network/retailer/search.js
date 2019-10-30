import axios from '../axios'

export function retailerSearch(suppliername) {
  return axios({
    url: '/Supplier/selectOne',
    method: 'post',
    params: {
      suppliername,
    }
  })
}