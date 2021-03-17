export function validateEmptyAndLength6 (value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }

  if (value.length < 6) {
    return '*No mínimo 6 caracteres'
  }

  return true
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }

  const isValid = /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)
  if (!isValid) {
    return '*Este campo precisa ser um e-mail válido'
  }

  return true
}
