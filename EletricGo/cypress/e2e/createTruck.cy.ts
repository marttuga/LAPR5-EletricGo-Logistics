describe('Visit first page Test', () => {
    it('Initial project page', () => {
      cy.visit('/')
      cy.contains('Welcome to')
    })
  })
  describe('Visit Login', () => {
    it('Login page, fleet manager', () => {
      cy.visit('/views/login')
      cy.contains('LOGIN')
    })
  })
  
describe('Fleet manager ', () => {
    it('Visits the fleet manager page', () => {
      cy.visit('/views/fleet-manager')
      cy.contains('WELCOME')
    })
  })