import axios from '../axios'

export function retailerInsert(suppliername, contactperson, phonenumber, createtime, description) {
  return axios({
    url: '/Supplier/insert',
    method: 'post',
    data: {
      suppliername,
      contactperson,
      phonenumber,
      createtime,
      description
    }
  })
}