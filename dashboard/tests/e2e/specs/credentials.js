const APP_URL = process.env.APP_URL || 'http://localhost:8080'
// testar copy
describe('Credentials', () => {
  it('should generate an api key', () => {
    cy.get(APP_URL)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=login-form]')
    cy.get('[data-test=email-input]').type('igor@igor.me')
    cy.get('[data-test=password-input]').type('1234')
    cy.get('[data-test=login-submit-button]').click()
    cy.wait(4000)
    cy.get('[data-test=credentials-link]').click()
    cy.wait(2000)

    const oldApiKey = cy.get('[data-test=api-key]').invoke('text')
    cy.get('[data-test=generate-api-key]').click()
    cy.wait(2000)
    const newApiKey = cy.get('[data-test=api-key]').invoke('text')
    expect(oldApiKey).to.not.equal(newApiKey)
  })
})
