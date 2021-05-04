import { getDiffTimeBetweenCurrentDate } from './getDiffTimeBetweenCurrentDate'

const dayInMilliseconds = 86400000
const minutesInMilliseconds = 3600000
const now = new Date('2021-04-25T18:30:30.000Z')

describe('getDiffTimeBetweenCurrentDate utils', () => {
  it('should return same value for null, undefined, false or true', () => {
    expect(getDiffTimeBetweenCurrentDate(null)).toBe(null)
    expect(getDiffTimeBetweenCurrentDate(undefined)).toBe('')
    expect(getDiffTimeBetweenCurrentDate(false)).toBe(false)
    expect(getDiffTimeBetweenCurrentDate(true)).toBe(true)
  })

  it('should return same value for invalid date string', () => {
    const invalidDate = new Date('2021-04-25T')

    const received = getDiffTimeBetweenCurrentDate(invalidDate, now)

    expect(received).toBe(invalidDate)
  })

  it('should return one day ago', () => {
    const yesterday = now.getTime() - dayInMilliseconds

    const received = getDiffTimeBetweenCurrentDate(yesterday, now)

    expect(received).toBe('1 dia atrás')
  })

  it('should return two days ago', () => {
    const beforeYesterday = now.getTime() - dayInMilliseconds * 2

    const received = getDiffTimeBetweenCurrentDate(beforeYesterday, now)

    expect(received).toBe('2 dias atrás')
  })

  it('should return one second ago', () => {
    const oneSec = now.getTime() - 1 * 1000

    const received = getDiffTimeBetweenCurrentDate(oneSec, now)

    expect(received).toBe('1 segundo atrás')
  })

  it('should return fifteen seconds ago', () => {
    const fifteenSec = now.getTime() - 15 * 1000

    const received = getDiffTimeBetweenCurrentDate(fifteenSec, now)

    expect(received).toBe('15 segundos atrás')
  })

  it('should return one minute ago', () => {
    const oneMin = now.getTime() - 1 * 60 * 1000

    const received = getDiffTimeBetweenCurrentDate(oneMin, now)

    expect(received).toBe('1 minuto atrás')
  })

  it('should return twenty three minutes ago', () => {
    const twentyThreeMin = now.getTime() - 23 * 60 * 1000

    const received = getDiffTimeBetweenCurrentDate(twentyThreeMin, now)

    expect(received).toBe('23 minutos atrás')
  })

  it('should return one hour ago', () => {
    const oneHour = now.getTime() - 1 * minutesInMilliseconds

    const received = getDiffTimeBetweenCurrentDate(oneHour, now)

    expect(received).toBe('1 hora atrás')
  })

  it('should return six hours ago', () => {
    const sixHour = now.getTime() - 6 * minutesInMilliseconds

    const received = getDiffTimeBetweenCurrentDate(sixHour, now)

    expect(received).toBe('6 horas atrás')
  })

  it('should round second to minute when turning back minute', () => {
    const prevMinute = now.getTime() - 31 * 1000

    const received = getDiffTimeBetweenCurrentDate(prevMinute, now)

    expect(received).toBe('1 minuto atrás')
  })

  it('should round minute to hour when turning back hour', () => {
    const prevHour = now.getTime() - 31 * 60 * 1000

    const received = getDiffTimeBetweenCurrentDate(prevHour, now)

    expect(received).toBe('1 hora atrás')
  })

  it('should round hour to day when turning back day', () => {
    const prevDay = now.getTime() - 19 * minutesInMilliseconds

    const received = getDiffTimeBetweenCurrentDate(prevDay, now)

    expect(received).toBe('1 dia atrás')
  })
  // TODO: passar teste
  it.skip('should return fifteen hours ago', () => {
    const fifteenHours = now.getTime() - 15 * minutesInMilliseconds

    const received = getDiffTimeBetweenCurrentDate(fifteenHours, now)

    expect(received).toBe('15 horas atrás')
  })
})
