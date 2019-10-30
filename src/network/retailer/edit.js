import axios from '../axios'

export function retailerEdit(supplierid, suppliername, contactperson, phonenumber, createtime, description) {
  return axios({
    url: '/Supplier/update',
    method: 'post',
    data: {
      supplierid,
      suppliername,
      contactperson,
      phonenumber,
      createtime,
      description
    }
  })
}