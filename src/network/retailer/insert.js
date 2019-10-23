import axios from '../axios'

export function retailerInsert(supplierId, supplierName, contactPerson, phoneNumber, createTime, description) {
  return axios({
    url: '/retailer/insert',
    method: 'post',
    data: {
      supplierId,
      supplierName,
      contactPerson,
      phoneNumber,
      createTime,
      description
    }
  })
}