import axios from 'axios'
import AuthService from './auth'
import UsersService from './users'
import router from '../router'
// TODO: criar variaveis de ambiente
const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  // inclui o token a cada requisição
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

const handleError = (error) => {
  // manda erro 500 para o catch
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    throw new Error(error.message)
  }

  if (error.request.status === 401) {
    // TODO: remover token?
    router.push({ name: 'Home' })
  }

  return error
}

httpClient.interceptors.response.use((response) => response, handleError)

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
}
