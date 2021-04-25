import { getDiffTimeBetweenCurrentDate } from './getDiffTimeBetweenCurrentDate'

const dayInMilliseconds = 86400000
const now = new Date('2021-04-25T18:18:30.000Z')

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

  it('should give message with one day ago', () => {
    const yesterday = now.getTime() - dayInMilliseconds
    
    const received = getDiffTimeBetweenCurrentDate(yesterday, now)
    
    expect(received).toBe('1 dia atrás')
  })

  it('should give message with two days ago', () => {
    const beforeYesterday = now.getTime() - dayInMilliseconds * 2
    
    const received = getDiffTimeBetweenCurrentDate(beforeYesterday, now)
    
    expect(received).toBe('2 dias atrás')
  })

  it('should give message with one second ago', () => {
    const oneSec = now.getTime() - 1 * 1000
    
    const received = getDiffTimeBetweenCurrentDate(oneSec, now)
    
    expect(received).toBe('1 segundo atrás')
  })

  it('should give message with fifteen seconds ago', () => {
    const fifteenSec = now.getTime() - 15 * 1000
    
    const received = getDiffTimeBetweenCurrentDate(fifteenSec, now)
    
    expect(received).toBe('15 segundos atrás')
  })
})
