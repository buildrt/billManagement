import axios from '../axios'

export function passEdit(oldPass, newPass) {
  return axios({
    url: '/profile/update',
    method: 'post',
    data: {
      oldPass,
      newPass
    }
  })
}