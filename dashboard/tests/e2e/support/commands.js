// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-test=login-button]').click()
  cy.get('[data-test=login-form]')
  cy.get('[data-test=email-input]').type(email)
  cy.get('[data-test=password-input]').type(password)
  cy.get('[data-test=login-submit-button]').click()
})

Cypress.Commands.add('register', (name, email, password) => {
  cy.get('[data-test=create-account-button-top]').click()
  cy.get('[data-test=create-account-form]')
  cy.get('[data-test=name-input]').type(name)
  cy.get('[data-test=email-input]').type(email)
  cy.get('[data-test=password-input]').type(password)
  cy.get('[data-test=create-account-submit-button]').click()
})
