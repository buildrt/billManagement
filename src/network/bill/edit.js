import axios from '../axios'

export function billEdit(billid,billcode, commoditiesname, suppliername, price, pay, createtime, description) {
  return axios({
    url: '/Bill/update',
    method: 'post',
    data: {
      billid,
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