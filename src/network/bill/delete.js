import axios from '../axios'

export function deleteBill(billid) {
  return axios({
    url: '/Bill/delete',
    method: 'post',
    params: {
      billid,
    }
  })
}