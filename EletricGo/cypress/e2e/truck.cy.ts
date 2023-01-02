describe('Truck Test', () => {
 
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
      cy.get('button').should('have.length',5)
      
    })

    it('Visits the fleet manager page', () => {
      cy.get('[class="btn-login"]').should('contain','Fleet Manager')
      cy.get('[class="btn-login"]').contains('Fleet Manager').click()
      cy.visit('/views/fleet-manager')
      cy.get('p').should('contain','WELCOME')
      cy.get('h1').should('contain','FLEET MANAGER!')
      cy.get('[class="navbar"]').should('contain','Home')
      cy.get('[class="navbar"]').should('contain','Manage Trucks')
      cy.get('[class="navbar"]').should('contain','See active Trucks')
      cy.get('[class="navbar"]').should('contain','Change the status')

    })


    it('Visits the create Truck page', () => {
      cy.visit('/views/create-truck')
      cy.get('h2').should('contain','NEED MORE TRUCKS?')
      cy.get('h3').should('contain','CREATE ANOTHER ONE')
    })

    it('creating truck fails', () => {
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


    it('Visits the list Truck page', () => {
      cy.visit('/views/list-truck')
      cy.get('h2').should('contain','ALL ACTIVE TRUCKS')
    })

    it('Searches Truck failed', () => {
      cy.get('[type="text"]').eq(0).type('FFF')
    })

    it('Visits the create Truck page', () => {
      cy.visit('/views/create-truck')
      cy.get('h2').should('contain','NEED MORE TRUCKS?')
      cy.get('h3').should('contain','CREATE ANOTHER ONE')
    })

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
      cy.visit('/views/list-truck')
      cy.get('h2').should('contain','ALL ACTIVE TRUCKS')
    })

    it('Searches Truck success', () => {
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')
      cy.get('[class="table"]').should('contain','AQ-11-QQ')


    })


    it('Visits the Change status page', () => {
      cy.visit('/views/truck-status')
      cy.get('h2').should('contain','TRUCK STATUS')
      cy.get('h3').should('contain','Enter licence plate')
    })

    it('Searches Truck wrong ', () => {
      cy.get('[class="textfield"]').should('have.length',1)
      cy.get('[type="text"]').eq(0).type('FFF')
      
      
      cy.get('[class="buttonn"]').click() 
   
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Licence Plate must must be of format XX-00-XX!')

      cy.get('[type="submit"]').should('be.disabled')
    

      cy.get('[type="text"]').eq(0).clear()   
      cy.get('[class="requiredError"]').should('be.visible').should('contain','Licence Plate is required!')

    })

    
    it('Searches Truck right ', () => {
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')

      cy.get('[type="submit"]').should('be.enabled')
      cy.get('[class="buttonn"]').click()
      cy.get('[class="table"]').should('contain','true')
      cy.get('[type="submitt"]').should('be.enabled')
      cy.get('[type="submittt"]').should('be.enabled')

    })

    it('Disable Truck', () => {
      cy.get('[class="buttondisable"]').click()
      cy.get('[class="created-message"]').should('be.visible').contains("Success!")

      cy.visit('/views/list-truck')
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')


    })

    it('Enable Truck again ', () => {
      cy.visit('/views/truck-status')
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')

      cy.get('[type="submit"]').should('be.enabled')
      cy.get('[class="buttonn"]').click()
/*       cy.get('[class="table"]').should('contain','false')
 */      cy.get('[type="submitt"]').should('be.enabled')
      cy.get('[type="submittt"]').should('be.enabled')


      cy.get('[class="buttonenable"]').click()
      cy.get('[class="created-message"]').should('be.visible').contains("Success!")

      cy.visit('/views/list-truck')
      cy.get('[type="text"]').eq(0).type('AQ-11-QQ')
      cy.get('[class="table"]').should('contain','AQ-11-QQ')


    })





  })
