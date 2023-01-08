describe('Planned Route Test', () => {
 
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(1500, 800)
    })

    it('Initial project page', () => {
      cy.visit('/')
      cy.contains('Welcome to')
      cy.contains('LOGIN').click()
    })
 

    it('Login page', () => {
      cy.visit('/views/login')
      cy.get('h1').should('contain','LOGIN')
    })

    it('user and password shoul be empty, with buttons bellow', () => {
      cy.get('[type="text"]').should('be.empty')
      cy.get('[type="password"]').should('be.empty')
      cy.get('button').should('have.length',6)
      
    })

    
    it('Visits the logistics manager page', () => {
      cy.get('[class="btn-login"]').contains('Logistics Manager').click()
      cy.visit('/views/logistics-manager')
      cy.get('h1').contains('Welcome back!')
      cy.contains('Get Planned Route').click()

    })


    it('Visits the get planned route page', () => {
      cy.visit('/views/get-planned-route')
      cy.get('h2').should('contain','PLANNED ROUTE')
      cy.get('h3').should('contain','SELECT THE PREFERED ROUTE OPTION')
      cy.get('h1').should('contain','WAREHOUSES IDS BY ORDER')

    })


  
    it('get method best route', () => {
      cy.get('[type="text"]').eq(0).type('20221205')
     
      cy.get('[type="text"]').eq(1).type('eTruck01')
     cy.get('[id="options"]').select('Get Best Route')
 cy.get('[type="text"]').eq(0).clear()
 cy.get('[type="text"]').eq(1).clear()

    })

    it('get method nearest warehouse', () => {
      cy.get('[type="text"]').eq(0).type('20221205')
      cy.get('[type="text"]').eq(1).type('eTruck01')
     cy.get('[id="options"]').select('Get Nearest Warehouse')
     cy.get('[type="text"]').eq(0).clear()
     cy.get('[type="text"]').eq(1).clear()

    })
    it('get method greater mass', () => {
      cy.get('[type="text"]').eq(0).type('20221205')
      cy.get('[type="text"]').eq(1).type('eTruck01')
     cy.get('[id="options"]').select('Get Delivery With Greater Mass')
     cy.get('[type="text"]').eq(0).clear()
     cy.get('[type="text"]').eq(1).clear()

    })
    it('get method best relation', () => {
      cy.get('[type="text"]').eq(0).type('20221205')
      cy.get('[type="text"]').eq(1).type('eTruck01')
     cy.get('[id="options"]').select('Get Fastest Route With Greater Mass')
     cy.get('[type="text"]').eq(0).clear()
     cy.get('[type="text"]').eq(1).clear()

    })

    

  })
