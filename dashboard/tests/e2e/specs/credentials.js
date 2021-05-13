const APP_URL = process.env.APP_URL || 'http://localhost:8080'
// TODO: logar no before each
describe('Credentials', () => {
  it('should generate an api key', () => {
    cy.visit(APP_URL)
    cy.login('igor@igor.me', '1234')
    cy.get('[data-test=credentials-link]').click()

    cy.get('[data-test=api-key]').invoke('text').then(oldApiKey => {
      cy.get('[data-test=generate-api-key]').click()

      cy.get('[data-test=api-key]').invoke('text')
        .should('not.equal', oldApiKey)
    })
  })

  it('should contain api key in script', () => {
    cy.visit(APP_URL)
    cy.login('igor@igor.me', '1234')
    cy.get('[data-test=credentials-link]').click()

    cy.get('[data-test=api-key]').invoke('text').then(apiKey => {
      cy.get('[data-test=script]').invoke('text')
        .should('include', `api_key=${apiKey}`)
    })

    cy.get('[data-test=generate-api-key]').click()

    cy.get('[data-test=api-key]').invoke('text').then(apiKey => {
      cy.get('[data-test=script]').invoke('text')
        .should('include', `api_key=${apiKey}`)
    })
  })

  it('should copy api key', () => {
    cy.visit(APP_URL)
    cy.login('igor@igor.me', '1234')
    cy.get('[data-test=credentials-link]').click()

    cy.get('[data-test=copy-api-key]').click()

    cy.get('[data-test=api-key]').invoke('text').then(apiKey => {
      cy.task('getClipboard').should('equal', apiKey)
    })
  })

  it('should copy script', () => {
    cy.visit(APP_URL)
    cy.login('igor@igor.me', '1234')
    cy.get('[data-test=credentials-link]').click()

    cy.get('[data-test=copy-script]').click()

    cy.get('[data-test=script]').invoke('text').then(script => {
      cy.task('getClipboard').should('equal', script)
    })
  })
})
