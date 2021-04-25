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

    // expect
  })
})
