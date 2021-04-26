import mockAxios from 'axios'
import AuthService from './auth'

jest.mock('axios')

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user login', async () => {
    const token = '123.123.123'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios)
      .login({ email: 'me@me.com', password: '123' })

    expect(response.errors).toBe(null)
    expect(response.data).toHaveProperty('token')
    expect(response).toMatchSnapshot()
  })

  it('should return an user when register', async () => {
    const user = {
      name: 'Me',
      password: '123',
      email: 'me@me.com'
    }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register(user)

    expect(response.errors).toBe(null)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')
    expect(response).toMatchSnapshot()
  })

  it('should return errors on login response', async () => {
    const errors = { status: 404, statusText: 'Not Found' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios)
      .login({ email: 'me@me.com', password: '123' })

    expect(response.data).toBe(undefined)
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
    expect(response).toMatchSnapshot()
  })

  it('should return errors on register response', async () => {
    const user = {
      name: 'Me',
      password: '123',
      email: 'me@me.com'
    }
    const errors = { status: 400, statusText: 'Bad request' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).register(user)

    expect(response.data).toBe(undefined)
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
    expect(response).toMatchSnapshot()
  })
})
