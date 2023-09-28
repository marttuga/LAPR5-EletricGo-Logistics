describe('Truck Test', () => {
 
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(1500, 800)
    })

    it('Initial project page', () => {
      cy.visit('/')
      cy.contains('Welcome to')
    })
 

    it('Login page', () => {
      cy.visit('login')
      cy.get('[type="email"]').type("martaespanha@gmail.com")
      cy.get('[type="password"]').type("Martaespanha1")
      cy.get('[class="btn-login"]').click()

    })

    it('Visits the fleet manager page', () => {
      cy.visit('fleet-manager')
      cy.get('[class="navbar"]').should('contain','Home')
      cy.get('[class="navbar"]').should('contain','Manage Trucks').click()


    })


    it('Visits the list Truck page', () => {
      cy.visit('fleet-manager/list-truck')
    })

    it('Searches Truck failed', () => {
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')
      cy.get('[class="btn-create"]').contains('Create').click()

    })


    it('Visits the create Truck page', () => {
      cy.visit('fleet-manager/create-truck')
      cy.get('h2').should('contain','NEED MORE TRUCKS?')
      cy.get('h3').should('contain','CREATE ANOTHER ONE')
    })

    /* it('creating truck fails', () => {
      cy.get('[class="textfield"]').should('have.length',6)
      cy.get('[type="text"]').eq(0).type('FFF')
      
      cy.get('[type="number"]').eq(0).type('8')
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Licence Plate must must be of format XX-00-XX!')
      
      cy.get('[type="number"]').eq(1).type('10')
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Tare must be between 3000kg and 20000kg!')
     
      cy.get('[type="number"]').eq(2).type('12')
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Capacity must be between 3000kg and 20000kg!')
     
      cy.get('[type="number"]').eq(3).type('12')
       cy.get('[class="requiredError"]').should('be.visible').should('contain','Max batery capacity must be between 80kWh and 200kWh!')
     
      cy.get('[type="number"]').eq(4).type('0')
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Autonomy must be between 100km and 8000km!')


      cy.get('[type="submit"]').should('be.disabled')
    

      cy.get('[type="text"]').eq(0).clear()   
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Time to charge must be between 1h and 5h!')
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Licence Plate is required!')

      cy.get('[type="number"]').eq(0).clear()
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Tare is required!')

      cy.get('[type="number"]').eq(1).clear()
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Capacity is required!')

      cy.get('[type="number"]').eq(2).clear()
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Max batery capacity is required!')

      cy.get('[type="number"]').eq(3).clear()
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Autonomy is required!')

      cy.get('[type="number"]').eq(4).clear()
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Time is required!')

    })
 */

 /*  
    it('Visits the create Truck page', () => {
      cy.visit('/views/create-truck')
      cy.get('h2').should('contain','NEED MORE TRUCKS?')
      cy.get('h3').should('contain','CREATE ANOTHER ONE')
    }) */

    it('creating truck success', () => {
      cy.get('[class="textfield"]').should('have.length',6)
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')


      cy.get('[type="number"]').eq(0).type('12000')
      cy.get('[type="number"]').eq(1).type('15000')
      cy.get('[type="number"]').eq(2).type('120')
      cy.get('[type="number"]').eq(3).type('120')
      cy.get('[type="number"]').eq(4).type('4')

      cy.get('[type="submit"]').should('be.enabled')
      cy.get('[type="submit"]').click()
      cy.get('[class="created-message"]').should('be.visible').contains("Truck created!")

    })


    it('Visits the list Truck page', () => {
      cy.visit('fleet-manager/list-truck')
    })

    it('Searches Truck success', () => {
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')
      cy.get('[class="ta"]').should('contain','AQ-11-QQ')


    })
    
    
/*     it('disable truck', () => {
      cy.get('[class="button"]').click()


    }) */







  })
