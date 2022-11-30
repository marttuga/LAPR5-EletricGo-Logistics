describe('Truck Test', () => {
 
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

    it('user and password shoul be empty, with buttons bellow', () => {
      cy.get('[type="text"]').should('be.empty')
      cy.get('[type="password"]').should('be.empty')
      cy.get('button').should('have.length',5)
      
    })

    it('Visits the fleet manager page', () => {
      cy.get('[class="btn-login"]').contains('Fleet Manager').click()
      cy.visit('/views/fleet-manager')
      cy.get('p').contains('WELCOME')
      cy.get('h1').contains('FLEET MANAGER!')
      cy.contains('Manage Trucks').click()
    })


    it('Visits the create Truck page', () => {
      cy.visit('/views/create-truck')
      cy.get('h2').contains('NEED MORE TRUCKS?')
      cy.get('h3').contains('CREATE ANOTHER ONE')
    })

    it('creating truck fails', () => {
      cy.get('[class="textfield"]').should('have.length',6)
      cy.get('[type="text"]').type('FFbkkf')
      cy.get('[type="number"]').eq(0).type('12000')
      cy.get('[type="number"]').eq(1).type('15000')
      cy.get('[type="number"]').eq(2).type('120')
      cy.get('[type="number"]').eq(3).type('120')
      cy.get('[type="number"]').eq(4).type('2')

      cy.get('[type="submit"]').click()

      cy.get('[type="button"]').click()

      cy.get('[type="text"]').clear()
      cy.get('[type="number"]').eq(0).clear()
      cy.get('[type="number"]').eq(1).clear()
      cy.get('[type="number"]').eq(2).clear()
      cy.get('[type="number"]').eq(3).clear()
      cy.get('[type="number"]').eq(4).clear()
     

    })

    it('Visits the list Truck page', () => {
      cy.visit('/views/list-truck')
      cy.get('h2').contains('ALL EXISTENT TRUCKS')
    })

    it('Searches Truck', () => {
      cy.get('[class="table"]').should('have.length',6)
      cy.get('[type="text"]').type('FF-12-Ff')
      cy.get('[class="table"]').contains('FF-12-Ff')
    })



/*     it('creates truck', () => {
      cy.visit('/views/create-truck')
      cy.get('[class="textfield"]').should('have.length',6)
      cy.get('[type="text"]').type('FF-12-Ff')
      cy.get('[type="number"]').eq(0).type('12000')
      cy.get('[type="number"]').eq(1).type('15000')
      cy.get('[type="number"]').eq(2).type('120')
      cy.get('[type="number"]').eq(3).type('120')
      cy.get('[type="number"]').eq(4).type('2')
      cy.get('[type="submit"]').click()
    })
  
    it('Visits the list Truck page', () => {
      cy.visit('/views/list-truck')
      cy.get('h2').contains('ALL EXISTENT TRUCKS')
   
    })
 */

  })
