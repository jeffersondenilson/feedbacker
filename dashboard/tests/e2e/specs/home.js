const APP_URL = process.env.APP_URL || 'http://localhost:8080'
// testar modal clickaway
// testar mensagens de erro
// testar criação de conta
describe('Home', () => {
  it('should render ModalCreateAccount when click top button', () => {
    cy.visit(APP_URL)

    cy.get('[data-test=create-account-button-top]').click()

    cy.get('[data-test=create-account-form]')
  })

  it('should render ModalCreateAccount when click middle button', () => {
    cy.visit(APP_URL)

    cy.get('[data-test=create-account-button-middle]').click()

    cy.get('[data-test=create-account-form]')
  })

  it('should render ModalLogin when click login button', () => {
    cy.visit(APP_URL)

    cy.get('[data-test=login-button]').click()

    cy.get('[data-test=login-form]')
  })

  it('should login with email and password', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=login-form]')

    cy.get('[data-test=email-input]').type('igor@igor.me')
    cy.get('[data-test=password-input]').type('1234')
    cy.get('[data-test=login-submit-button]').click()

    cy.url().should('include', '/feedbacks')
  })

  it('should show an error with invalid email', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=login-form]')

    cy.get('[data-test=email-input]').type('igor@igor')
    cy.get('[data-test=password-input]').type('1234')
    cy.get('[data-test=login-submit-button]').click()

    cy.get('[data-test=email-error-message]')
  })

  it('should logout correctly', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=login-form]')
    cy.get('[data-test=email-input]').type('igor@igor.me')
    cy.get('[data-test=password-input]').type('1234')
    cy.get('[data-test=login-submit-button]').click()
    cy.url().should('include', '/feedbacks')

    cy.get('[data-test=logout-button]').click()
    // TODO: melhorar verificação?
    // cy.url().should('include', '/')
    cy.url().to.equal('/')
  })
})
