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
    cy.get('button').should('have.length', 5)

  })

  it('Visits the Warehouse manager page', () => {
    cy.get('[class="btn-login"]').contains('Warehouse Manager').click()
    cy.visit('/views/warehouse-manager')
    cy.contains('Create Warehouse').click()
  })


  it('Visits the create warehouse page', () => {
    cy.visit('/views/create-warehouse')
  })

  it('creating warehouse fails', () => {
    cy.get('[class="textfield"]').should('have.length',9)
    cy.get('[type="text"]').eq(0).type('ff')
    cy.get('[type="text"]').eq(1).type('wtv')
    cy.get('[class="wrongID"]').should('be.visible').contains("Warehouse Identifier must have 3 characters!")
    cy.get('[type="number"]').eq(0).type('2')
    cy.get('[type="number"]').eq(1).type('2')
    cy.get('[type="text"]').eq(2).type('wtv')
    cy.get('[type="number"]').eq(2).type('0')
    cy.get('[type="text"]').eq(3).type('wtv')
    cy.get('[class="wrongNumber"]').should('be.visible').contains("Door number cannot be zero or negative!")
    cy.get('[type="text"]').eq(4).type('35')
    cy.get('[type="text"]').eq(5).type('35')
    cy.get('[class="wrongPattern"]').should('be.visible').contains("ZipCode must have this format: XXXX-XXX!")


    cy.get('[type="submit"]').should('be.disabled')



     cy.get('[type="text"]').eq(0).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="text"]').eq(1).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="number"]').eq(0).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="number"]').eq(1).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="text"]').eq(2).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="number"]').eq(2).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="text"]').eq(3).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="text"]').eq(4).clear()
     cy.get('[class="requiredError"]').should('be.visible')
     cy.get('[type="text"]').eq(5).clear()
     cy.get('[class="requiredError"]').should('be.visible')

  })

 /* it('creating warehouse fails', () => {
    cy.get('[class="textfield"]').should('have.length',3)
    cy.get('[type="text"]').type('wtv')
    cy.get('[type="number"]').eq(0).type('f')
    cy.get('[type="number"]').eq(1).type('f')
    cy.get('[type="text"]').eq(2).type('wtv')
    cy.get('[type="number"]').eq(3).type('f')
    cy.get('[type="text"]').eq(4).type('f')
    cy.get('[type="text"]').eq(5).type('2')
    cy.get('[type="text"]').eq(6).type('2')

    cy.get('[type="submit"]').click()

    cy.get('[type="button"]').click()

    cy.get('[type="text"]').clear()
    cy.get('[type="number"]').eq(0).clear()
    cy.get('[type="number"]').eq(1).clear()
    cy.get('[type="number"]').eq(2).clear()
    cy.get('[type="number"]').eq(3).clear()
    cy.get('[type="number"]').eq(4).clear()


  })*/

  it('Visits the list warehouse page', () => {
    cy.visit('/views/list-warehouses')
  })

  /*it('Searches Truck', () => {
    cy.get('[class="table"]').should('have.length',6)
    cy.get('[type="text"]').type('FF-12-Ff')
    cy.get('[class="table"]').contains('FF-12-Ff')
  })*/

})
