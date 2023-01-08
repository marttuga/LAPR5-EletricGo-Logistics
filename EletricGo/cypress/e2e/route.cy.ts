describe('Route Tests', () => {
 
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
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

    it('user and password should be empty, with buttons bellow', () => {
      cy.get('[type="text"]').should('be.empty')
      cy.get('[type="password"]').should('be.empty')
      cy.get('button').should('have.length',5)
      
    })

    it('Visits the logistics manager page', () => {
      cy.get('[class="btn-login"]').contains('Logistics Manager').click()
      cy.visit('/views/logistics-manager')
      cy.get('h1').contains('Welcome back!')
      cy.contains('Create Route').click()

    })


    it('Visits the Create Route page', () => {
      cy.visit('/views/logistics-manager/create-route')
      cy.get('h1').contains('Create a new route!')
    })


    it('Creating route fails', () => {
      cy.get('[class="textfield"]').should('have.length',5)
      cy.get('[type="text"]').eq(0).type(' ')
      cy.get('[type="text"]').eq(1).type(' ')
      cy.get('[type="text"]').eq(0).type(' ')
      cy.get('[type="text"]').eq(1).type(' ')
      cy.get('[type="text"]').eq(2).type(' ')
      cy.get('[type="text"]').eq(3).type(' ')
  
    })


    it('Creates a new route', () => {
      cy.visit('/views/logistics-manager/create-route')
      cy.get('[class="textfield"]').should('have.length',5)
      cy.get('[type="text"]').eq(0).type('W01')
      cy.get('[type="text"]').eq(1).type('12')
      cy.get('[type="text"]').eq(0).type('22')
      cy.get('[type="text"]').eq(1).type('22')
      cy.get('[type="text"]').eq(2).type('12')
      cy.get('[type="text"]').eq(3).type('22')

      cy.get('[type="submit"]').should('be.enabled')
      cy.get('[type="submit"]').click()    
    })
  

    it('Visits the List Available Routes page', () => {
      cy.visit('/views/logistics-manager/list-routes')
      cy.get('h2').contains('ALL ROUTES AVAILABLE')
    })

     it('Searches Route', () => {
      cy.get('th').should('have.length',8)
      cy.get('[type="text"]').eq(0).type('W01')
    }) 

  })
