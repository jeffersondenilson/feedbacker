import mockAxios from 'axios'
import FeedbacksService from './feedbacks'
import feedbacks from './__mocks__/feedbacks'

jest.mock('axios')

describe('FeedbacksService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return feedbacks within default pagination', async () => {
    const expectedPagination = {
      limit: 5,
      offset: 0,
      total: feedbacks.length
    }
    mockAxios.get.mockImplementationOnce((url, config) => {
      const { limit, offset } = config.params
      return Promise.resolve({
        data: {
          results: feedbacks.slice(offset, limit),
          pagination: { limit, offset, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll()

    expect(response.data).toHaveProperty('results')
    expect(response.data).toHaveProperty('pagination')
    expect(response.data.pagination).toStrictEqual(expectedPagination)
    expect(response).toMatchSnapshot()
  })

  it('should return feedbacks within offset = 2 limit = 5', async () => {
    const expectedPagination = {
      limit: 5,
      offset: 2,
      total: feedbacks.length
    }
    mockAxios.get.mockImplementationOnce((url, config) => {
      const { limit, offset } = config.params
      return Promise.resolve({
        data: {
          results: feedbacks
            .slice(offset, feedbacks.length)
            .slice(0, limit),
          pagination: { limit, offset, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll({
      limit: 5,
      offset: 2
    })

    expect(response.data).toHaveProperty('results')
    expect(response.data).toHaveProperty('pagination')
    expect(response.data.pagination).toStrictEqual(expectedPagination)
    expect(response).toMatchSnapshot()
  })

  it('should return feedbacks within offset = 5 limit = 5', async () => {
    const expectedPagination = {
      limit: 5,
      offset: 5,
      total: feedbacks.length
    }
    mockAxios.get.mockImplementationOnce((url, config) => {
      const { limit, offset } = config.params
      return Promise.resolve({
        data: {
          results: feedbacks
            .slice(offset, feedbacks.length)
            .slice(0, limit),
          pagination: { limit, offset, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll({
      limit: 5,
      offset: 5
    })

    expect(response.data).toHaveProperty('results')
    expect(response.data).toHaveProperty('pagination')
    expect(response.data.pagination).toStrictEqual(expectedPagination)
    expect(response).toMatchSnapshot()
  })

  it('should return feedbacks within offset = 3 limit = 2', async () => {
    const expectedPagination = {
      limit: 2,
      offset: 2,
      total: feedbacks.length
    }
    mockAxios.get.mockImplementationOnce((url, config) => {
      let { limit, offset } = config.params

      if (offset > limit) {
        offset = limit
      }

      return Promise.resolve({
        data: {
          results: feedbacks
            .slice(offset, feedbacks.length)
            .slice(0, limit),
          pagination: { limit, offset, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll({
      limit: 2,
      offset: 3
    })

    expect(response.data).toHaveProperty('results')
    expect(response.data).toHaveProperty('pagination')
    expect(response.data.pagination).toStrictEqual(expectedPagination)
    expect(response).toMatchSnapshot()
  })

  it('should return feedbacks within offset = 0 limit = 11', async () => {
    const expectedPagination = {
      limit: 5,
      offset: 0,
      total: feedbacks.length
    }
    mockAxios.get.mockImplementationOnce((url, config) => {
      let { limit, offset } = config.params

      if (limit > 10) {
        limit = 5
      }

      return Promise.resolve({
        data: {
          results: feedbacks
            .slice(offset, feedbacks.length)
            .slice(0, limit),
          pagination: { limit, offset, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll({
      limit: 11,
      offset: 0
    })

    expect(response.data).toHaveProperty('results')
    expect(response.data).toHaveProperty('pagination')
    expect(response.data.pagination).toStrictEqual(expectedPagination)
    expect(response).toMatchSnapshot()
  })

  it('should return all feedbacks of type ISSUE', async () => {
    mockAxios.get.mockImplementationOnce((url, config) => {
      const { type } = config.params
      return Promise.resolve({
        data: {
          results: feedbacks.filter(fb => fb.type === type.toUpperCase()),
          pagination: { limit: 5, offset: 0, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll({
      type: 'issue'
    })

    expect(response.data).toHaveProperty('results')
    expect(response).toMatchSnapshot()
  })

  it('should return all feedbacks of type IDEA', async () => {
    mockAxios.get.mockImplementationOnce((url, config) => {
      const { type } = config.params
      return Promise.resolve({
        data: {
          results: feedbacks.filter(fb => fb.type === type.toUpperCase()),
          pagination: { limit: 5, offset: 0, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll({
      type: 'idea'
    })

    expect(response.data).toHaveProperty('results')
    expect(response).toMatchSnapshot()
  })

  it('should return all feedbacks of type OTHER', async () => {
    mockAxios.get.mockImplementationOnce((url, config) => {
      const { type } = config.params
      return Promise.resolve({
        data: {
          results: feedbacks.filter(fb => fb.type === type.toUpperCase()),
          pagination: { limit: 5, offset: 0, total: feedbacks.length }
        }
      })
    })

    const response = await FeedbacksService(mockAxios).getAll({
      type: 'other'
    })

    expect(response.data).toHaveProperty('results')
    expect(response).toMatchSnapshot()
  })

  it('should return count of feedback types', async () => {
    const summary = { all: 7, issue: 3, idea: 3, other: 1 }
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: summary })
    })

    const response = await FeedbacksService(mockAxios).getSummary()

    expect(response).toMatchSnapshot({
      data: {
        all: expect.any(Number),
        issue: expect.any(Number),
        idea: expect.any(Number),
        other: expect.any(Number)
      }
    })
  })
})
