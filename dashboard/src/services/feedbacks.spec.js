import mockAxios from 'axios'
import FeedbacksService from './feedbacks'

jest.mock('axios')

describe('FeedbacksService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all feedbacks', async () => {
    //
  })

  it('should return all feedbacks with default pagination', async () => {
    //
  })

  it('should return all feedbacks with offset = 5 and limit = 5', async () => {
    //
  })

  it('should return all feedbacks with offset = 3 and limit = 2', async () => {
    //
  })

  it('should return all feedbacks with offset = 2 and limit = 5', async () => {
    //
  })

  it('should return all feedbacks of type ISSUE', async () => {
    //
  })

  it('should return all feedbacks of type IDEA', async () => {
    //
  })

  it('should return all feedbacks of type OTHER', async () => {
    //
  })

  it.only('should return count of each type of feedback', async () => {
    const summary = { all: 7, issue: 3, idea: 3, other: 1 }
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: summary })
    })

    const response = await FeedbacksService(mockAxios).getSummary()

    expect(response.data).toMatchSnapshot({
      all: expect.any(Number),
      issue: expect.any(Number),
      idea: expect.any(Number),
      other: expect.any(Number)
    })
  })
})
