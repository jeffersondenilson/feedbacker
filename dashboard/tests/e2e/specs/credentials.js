const APP_URL = process.env.APP_URL || 'http://localhost:8080'
// testar script contendo api key
// testar copy
describe('Credentials', () => {
  it('should generate an api key', () => {
    cy.visit(APP_URL)
    cy.login('igor@igor.me', '1234')
    cy.get('[data-test=credentials-link]').click()

    const oldApiKey = cy.get('[data-test=api-key]').invoke('text')
    cy.get('[data-test=generate-api-key]').click()
    cy.wait(2000)
    const newApiKey = cy.get('[data-test=api-key]').invoke('text')
    expect(oldApiKey).to.not.equal(newApiKey)
  })
})
