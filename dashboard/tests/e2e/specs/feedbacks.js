const baseUrl = process.env.APP_URL || 'http://localhost:8080'
const APP_URL = `${baseUrl}/feedbacks`
import { LABELS } from '../../../src/utils/constants.js'

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

  it('should not load more feedbacks when reached total', () => {
    cy.visit(APP_URL)
    cy.get('[data-test=feedback-cards]').should('have.length', 5)
    cy.scrollTo('bottom')
    cy.get('[data-test=feedback-cards]').should('have.length', 7)

    cy.scrollTo('bottom')

    cy.get('[data-test=feedback-cards]').should('have.length', 7)
  })

  it('should load only feedbacks of type issue', () => {
    cy.visit(APP_URL)

    cy.get('[data-test-filter-type=issue]').click()
    cy.get('[data-test=feedback-cards] [data-test=badge]')
      .then(badges => {
        const expected = LABELS.issue.repeat(badges.length)
        expect(badges.text()).to.eq(expected)
      })
  })
})
