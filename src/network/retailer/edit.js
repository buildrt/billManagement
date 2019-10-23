import axios from '../axios'

export function retailerEdit(supplierId, supplierName, contactPerson, phoneNumber, createTime, description) {
  return axios({
    url: '/retailer/update',
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