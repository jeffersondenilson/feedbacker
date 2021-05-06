const APP_URL = process.env.APP_URL || 'http://localhost:8080'
// testar botão de submit desabilitado quando tem erro
describe('Home Auth', () => {
  it('should login with email and password', () => {
    cy.visit(APP_URL)
    
    cy.login('igor@igor.me', '1234')

    cy.url().should('include', '/feedbacks')
  })

  it('should show an error with invalid email on ModalLogin', () => {
    cy.visit(APP_URL)
    
    cy.login('igor@igor', '1234')

    cy.get('[data-test=email-error-message]')
  })

  it('should show an error with invalid password on ModalLogin', () => {
    cy.visit(APP_URL)
    
    cy.login('igor@igor.me', '12')

    cy.get('[data-test=password-error-message]')
  })

  it.only('should create account and login successfully', () => {
    cy.visit(APP_URL)

    cy.register('test', `${Date.now()}@test.com`, '123')

    cy.url().should('include', '/feedbacks')
  })

  it.only('should show an error with invalid name on ModalCreateAccount', () => {
    cy.visit(APP_URL)
    
    cy.register(' ', 'me@me.com', '123')

    cy.get('[data-test=name-error-message]')
  })

  it('should show an error with invalid email on ModalCreateAccount', () => {
    cy.visit(APP_URL)
    
    cy.register('me', 'meme.com', '123')

    cy.get('[data-test=email-error-message]')
  })

  it('should show an error with invalid password on ModalCreateAccount', () => {
    cy.visit(APP_URL)
    
    cy.register('me', 'me@me.com', '1')

    cy.get('[data-test=password-error-message]')
  })

  it('should logout correctly', () => {
    cy.visit(APP_URL)
    cy.login('igor@igor.me', '1234')
    cy.url().should('include', '/feedbacks')

    cy.get('[data-test=logout-button]').click()

    cy.url().should('eq', `${APP_URL}/`)
  })
})
