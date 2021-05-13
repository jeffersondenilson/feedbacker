const baseUrl = process.env.APP_URL || 'http://localhost:8080'
const APP_URL = `${baseUrl}/feedbacks`

describe('Feedbacks', () => {
  beforeEach(() => {
    // TODO: ler api url das variaveis de ambiente
    cy.request('POST',  'http://localhost:3000/auth/login', {
      email: 'igor@igor.me',
      password: '1234'
    }).then(data => {
      localStorage.setItem('token', data.body.token)
    })
  })

  it('should have loaded feedbacks', () => {
    cy.visit(APP_URL)

    cy.get('[data-test=feedback-cards]').should('have.length', 5)
  })

  it('should load more feedbacks when scroll', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=feedback-cards]').should('have.length', 5)

    cy.scrollTo('bottom')

    cy.get('[data-test=feedback-cards]').should('have.length.gt', 5)
  })

  // TODO: esperar todas as requests serem resolvidas
  it('should not load more feedbacks when reached total', () => {
    cy.visit(APP_URL)
    cy.wait(5000)
    cy.scrollTo('bottom')
    cy.wait(5000)

    cy.get('[data-test=feedback-cards]').then(prevCards => {
      cy.scrollTo('bottom')
      cy.wait(5000)
      cy.get('[data-test=feedback-cards]')
        .should('not.have.length.gt', prevCards.length)
    })
  })

  it.only('should load only feedbacks of type issue', () => {
    cy.visit(APP_URL)

    cy.get('[data-test-filter-type=issue]').click()
    cy.get('[data-test=feedback-cards] [data-test=badge]')
      .then(badges => {
        // const q = Array.from(badges)
        console.log(badges)
      })
  })
})
