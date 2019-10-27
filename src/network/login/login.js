import axios from '../axios'

export function login(username,password,rememberMe) {
  return axios({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      rememberMe
    }
  })
}