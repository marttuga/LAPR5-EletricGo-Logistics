describe('User Test', () => {
 
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

    it('user and password shoul be empty', () => {
      cy.get('[type="text"]').should('be.empty')
      cy.get('[type="password"]').should('be.empty')
      
    })

    it('Visits the admin page', () => {
      cy.get('[class="btn-login"]').should('contain','Admin')
      cy.get('[class="btn-login"]').contains('Admin').click()
      cy.visit('/views/admin-page')
      cy.get('p').should('contain','WELCOME')
      cy.get('h1').should('contain','ADMIN!')
      cy.get('[class="navbar"]').should('contain','Home')
      cy.get('[class="navbar"]').should('contain','Manage Users')
     

    })


    it('Visits the list users page', () => {
      cy.visit('/views/list-user')
    })

    it('Searches user failed', () => {
      cy.get('[type="text"]').eq(0).type('joaotiago@gmail.com')
      cy.get('[class="btn-create"]').contains('Create').click()

    })


    it('Visits the create user page', () => {
      cy.visit('/views/create-user')
      cy.get('h2').should('contain','CREATE NEW USERS!')
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

    it('creating user success', () => {
      cy.get('[class="textfield"]').should('have.length',6)
      cy.get('[type="text"]').eq(0).type('joao')
      cy.get('[type="text"]').eq(1).type('tiago')
      cy.get('[type="email"]').eq(0).type('joaotiago@gmail.com')
      cy.get('[type="password"]').eq(0).type('Joaotiago1')
      cy.get('[type="text"]').eq(2).type('Logistics_Manager')
      cy.get('[type="number"]').eq(0).type('912323232')

      cy.get('[type="submit"]').should('be.enabled')
      cy.get('[type="submit"]').click()
      cy.get('[class="created-message"]').should('be.visible').contains("User created!")

    })


    it('Visits the list user page', () => {
      cy.visit('/views/list-user')
    })

    it('Searches user success', () => {
      cy.get('[type="text"]').eq(0).type('joaotiago@gmail.com')
      cy.get('[class="ta"]').should('contain','joaotiago@gmail.com')

      cy.get('[type="text"]').eq(0).clear()

    })
    
/*     it('anonimates the account', () => {
      cy.get('[type="text"]').eq(0).type('joaotiago@gmail.com')
      cy.get('[class="btn"]').click()
      cy.get('[class="ta"]').eq(0).should('contain','joaotiago@gmail.com')
      cy.get('[class="ta"]').eq(1).should('contain','role')
      cy.get('[class="ta"]').eq(2).should('contain','false')
      cy.get('[class="ta"]').eq(3).should('contain','first name')
      cy.get('[class="ta"]').eq(4).should('contain','last name')
      cy.get('[class="ta"]').eq(5).should('contain','999999999')

    })

    it('deletes the account', () => {
      cy.get('[class="btn-delete"]').click()
    }) */

/*     it('disable truck', () => {
      cy.get('[class="button"]').click()


    }) */







})
