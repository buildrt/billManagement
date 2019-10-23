import axios from '../axios'

export function billInsert(billCode, commoditiesName, supplierName, price, pay, createTime, description) {
  return axios({
    url: '/bill/update',
    method: 'post',
    data: {
      billCode,
      commoditiesName,
      supplierName,
      price,
      pay,
      createTime,
      description
    }
  })
}