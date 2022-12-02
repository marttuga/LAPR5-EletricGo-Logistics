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
      cy.visit('/views/create-route')
      cy.get('h1').contains('Create a new route!')
    })

    it('Visits the List Available Routes page', () => {
      cy.visit('/views/list-routes')
      cy.get('h2').contains('ALL ROUTES AVAILABLE')
    })

/*     it('Searches Route', () => {
      //cy.get('[class="table"]').should('have.length',7)
      cy.get('[type="text"]').type('W01')
      cy.get('[class="table"]').contains('W01')
    }) */



/*     it('creates routes', () => {
      cy.visit('/views/create-route')
      cy.get('[class="textfield"]').should('have.length',7)
      cy.get('[type="text"]').type('W01')
      cy.get('[type="number"]').eq(0).type('12')
      cy.get('[type="number"]').eq(1).type('22')
      cy.get('[type="number"]').eq(2).type('22')
      cy.get('[type="number"]').eq(3).type('12')
      cy.get('[type="number"]').eq(4).type('22')
      cy.get('[type="submit"]').click()
    })
  
    it('Visits the list Route page', () => {
      cy.visit('/views/list-routes')
      cy.get('h2').contains('ALL AVAILABLE ROUTES')
   
    })
 */

  })
