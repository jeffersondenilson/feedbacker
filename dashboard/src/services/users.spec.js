import mockAxios from 'axios'
import UserService from './users'

jest.mock('axios')

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return user info', async () => {
    const user = { name: 'user1', email: 'user1@gmail.com' }
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await UserService(mockAxios).getMe()

    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('email')
    expect(response).toMatchSnapshot()
  })

  it('should return api key', async () => {
    const apiKey = 'a1p2i3k4e5y'
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: { apiKey } })
    })

    const response = await UserService(mockAxios).getMe()

    expect(response.data).toHaveProperty('apiKey')
    expect(response).toMatchSnapshot()
  })
})
