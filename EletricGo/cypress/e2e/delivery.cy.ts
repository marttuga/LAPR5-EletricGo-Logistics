describe('Delivery Test', () => {
 
    beforeEach(() => {
      cy.viewport(1800, 900)
    })

    it('Initial project page', () => {
      cy.visit('/')
      cy.contains('Welcome to')
      cy.contains('LOGIN').click()
    })
 

    it('Login page', () => {
      cy.visit('/views/login')
      cy.get('h1').contains('LOGIN')
    })

    it('user and password shoul be empty, with buttons bellow', () => {
      cy.get('[type="text"]').should('be.empty')
      cy.get('[type="password"]').should('be.empty')
      cy.get('button').should('have.length',5)
      
    })

    it('Visits the warehouse manager page', () => {
      cy.get('[class="btn-login"]').contains('Warehouse Manager').click()
      cy.visit('/views/warehouse-manager')
      cy.contains('Create Delivery').click()
    })


    it('Visits the create Delivery page', () => {
      cy.visit('/views/create-delivery')
      cy.get('h1').contains('New Delivery?')
      cy.get('h2').contains('Enter all information here!')
    })

    /*it('creating delivery fails', () => {
      cy.get('[type="text"]').type('01')
      cy.get('[type="text"]').eq(0).type('2222')
      cy.get('[type="number"]').eq(1).type('-5')
      cy.get('[type="number"]').eq(2).type('0')
      cy.get('[type="number"]').eq(3).type('0')
      cy.get('[type="text"]').eq(4).type('2')

      cy.get('[type="submit"]').click()

      cy.get('[type="button"]').click()

      cy.get('[type="text"]').clear()
      cy.get('[type="text"]').eq(0).clear()
      cy.get('[type="number"]').eq(1).clear()
      cy.get('[type="number"]').eq(2).clear()
      cy.get('[type="number"]').eq(3).clear()
      cy.get('[type="text"]').eq(4).clear()
     

    })*/

    it('Visits the list Delivery page', () => {
      cy.visit('/views/list-deliveries')
      cy.get('h2').contains('All Deliveries')
    })

    it('Visits the create Delivery page', () => {
      cy.visit('/views/create-delivery')
      cy.get('h1').contains('New Delivery?')
      cy.get('h2').contains('Enter all information here!')
    })
/*
    it('creating delivery success', () => {
      cy.get('[type="text"]').type('D01')
      cy.get('[type="text"]').eq(0).type('12052022')
      cy.get('[type="number"]').eq(1).type('15')
      cy.get('[type="number"]').eq(2).type('2')
      cy.get('[type="number"]').eq(3).type('7')
      cy.get('[type="text"]').eq(4).type('W01')

      cy.get('[type="submit"]').click()

      

      cy.get('[type="text"]').clear()
      cy.get('[type="text"]').eq(0).clear()
      cy.get('[type="number"]').eq(1).clear()
      cy.get('[type="number"]').eq(2).clear()
      cy.get('[type="number"]').eq(3).clear()
      cy.get('[type="text"]').eq(4).clear()
     

    })*/

    it('Visits the list Deliveries page', () => {
      cy.visit('/views/list-deliveries')
      cy.get('h2').contains('All Deliveries')
    })

    

  })
