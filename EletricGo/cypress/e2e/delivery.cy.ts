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
      cy.get('button').should('have.length',6)
      
    })

    it('Visits the warehouse manager page', () => {
      cy.get('[class="btn-login"]').contains('Warehouse Manager').click()
      cy.visit('/views/warehouse-manager')
      cy.get('[class="navbar"]').should('contain','Home')
    })


    it('Visits the create Delivery page', () => {
      cy.visit('/views/warehouse-manager/create-delivery')
      cy.get('h1').contains('New Delivery?')
      cy.get('h2').contains('Enter all information here!')
    })

    it('Creating delivery fails', () => {
      cy.get('[type="text"]').eq(0).type('01')
      cy.get('[type="text"]').eq(1).type('2222')
      cy.get('[type="number"]').eq(0).type('-5')
      cy.get('[type="number"]').eq(1).type('0')
      cy.get('[type="number"]').eq(2).type('0')
    

      cy.get('[type="submit"]').click()

      cy.get('[type="text"]').eq(0).clear()
      cy.get('[type="text"]').eq(1).clear()
      cy.get('[type="number"]').eq(0).clear()
      cy.get('[type="number"]').eq(1).clear()
      cy.get('[type="number"]').eq(2).clear()
    
     

    })

    it('Visits the list Delivery page', () => {
      cy.visit('/views/warehouse-manager/list-deliveries')
    })

    it('Visits the create Delivery page', () => {
      cy.visit('/views/warehouse-manager/create-delivery')
      cy.get('h1').contains('New Delivery?')
      cy.get('h2').contains('Enter all information here!')
    })

    it('Creating delivery success', () => {
      cy.get('[type="text"]').eq(0).type('D01')
      cy.get('[type="text"]').eq(1).type('12052022')
      cy.get('[type="number"]').eq(0).type('15')
      cy.get('[type="number"]').eq(1).type('2')
      cy.get('[type="number"]').eq(2).type('7')
      

      cy.get('[type="submit"]').click()
      cy.get('[class="created-message"]').should('be.visible').contains("Delivery created!")
    

      cy.get('[type="text"]').eq(0).clear()
      cy.get('[type="text"]').eq(1).clear()
      cy.get('[type="number"]').eq(0).clear()
      cy.get('[type="number"]').eq(1).clear()
      cy.get('[type="number"]').eq(2).clear()

    })

    it('Visits the list Deliveries page', () => {
      cy.visit('/views/warehouse-manager/list-deliveries')
    })

    it('Searches Delivery success', () => {
      cy.get('[type="text"]').eq(0).type('W02')


    })
    

    

  })
