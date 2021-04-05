import axios from 'axios'
import AuthService from './auth'
import UsersService from './user'
import router from '../router'
import { setGlobalLoading } from '../store/global'
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
  setGlobalLoading(true)
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
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.request.status === 401) {
    // TODO: remover token?
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
}

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, handleError)

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
}
