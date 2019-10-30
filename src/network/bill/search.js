import axios from '../axios'

export function billSearch(commoditiesname, suppliername, pay) {
  return axios({
    url: '/Bill/selectOne',
    method: 'post',
    params: {
      commoditiesname,
      suppliername,
      pay,
    }
  })
}