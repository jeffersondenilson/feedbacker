import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
  validateEmptyAndName
} from './validators'

describe('Validators utils', () => {
  it('should give an error with empty password', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with less than 3 characters', () => {
    expect(validateEmptyAndLength3('12')).toBe('*No mínimo 3 caracteres')
  })

  it('should give true for 3 characters or more', () => {
    expect(validateEmptyAndLength3('777')).toBe(true)
  })

  it('should give an error with empty email', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
  })

  it('should give an error for invalid email', () => {
    expect(validateEmptyAndEmail('me')).toBe('*Este campo precisa ser um e-mail válido')
  })

  it('should give an error for email with no @', () => {
    expect(validateEmptyAndEmail('me.com')).toBe('*Este campo precisa ser um e-mail válido')
  })

  it('should give an error for email not ending in .something', () => {
    expect(validateEmptyAndEmail('me@me')).toBe('*Este campo precisa ser um e-mail válido')
  })

  it('should give true for valid email', () => {
    expect(validateEmptyAndEmail('me@me.com')).toBe(true)
  })

  it('should give true for valid email with dot before @', () => {
    expect(validateEmptyAndEmail('its.me@me.com')).toBe(true)
  })

  it('should give true for valid email with _ before @', () => {
    expect(validateEmptyAndEmail('its_me@me.br')).toBe(true)
  })

  it('should give true for valid email with - before @', () => {
    expect(validateEmptyAndEmail('its_me@me.net')).toBe(true)
  })

  it('should give an error with empty name', () => {
    expect(validateEmptyAndName()).toBe('*Este campo é obrigatório')
  })

  it('should give true with not empty name', () => {
    expect(validateEmptyAndName('anyname')).toBe(true)
  })
})
