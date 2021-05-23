const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Home Modal', () => {
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

  it('should close ModalCreateAccount when clicks close button', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=create-account-button-middle]').click()
    cy.get('[data-test=create-account-form]')

    cy.get('[data-test=close-button]').click()

    cy.get('[data-test=create-account-form]').should('not.exist')
  })

  it('should render ModalLogin when click login button', () => {
    cy.visit(APP_URL)

    cy.get('[data-test=login-button]').click()

    cy.get('[data-test=login-form]')
  })

  it('should close ModalLogin when clicks close button', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=login-form]')

    cy.get('[data-test=close-button]').click()

    cy.get('[data-test=login-form]').should('not.exist')
  })

  it('should not close modal when clicks form', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=login-button]').click()

    cy.get('[data-test=login-form]').click()

    cy.get('[data-test=login-form]')
  })

  it('should close modal when clicks overlay', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=login-form]')

    cy.get('[data-test=modal-overlay]').click('topLeft')
    
    cy.get('[data-test=login-form]').should('not.exist')
  })
})
