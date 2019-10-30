import axios from '../axios'

export function billInsert(billcode, commoditiesname, suppliername, price, pay, createtime, description) {
  return axios({
    url: '/Bill/insert',
    method: 'post',
    data: {
      billcode,
      commoditiesname,
      suppliername,
      price,
      pay,
      createtime,
      description
    }
  })
}