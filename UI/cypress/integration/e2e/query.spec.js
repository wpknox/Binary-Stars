
describe('Submit a basic query | Happy path', () => {
  it('Loads the home page', () => {
    cy.visit('http://localhost:8081/')

    cy.contains('Create New Query')
  })

  it('Clicks on the Create New Query button', () => {
    cy.contains('Create New Query').click()

    cy.url().should('include', '/query/step')
    cy.contains('New Query')
    cy.contains('Choose DB').should('be.visible')
  })

  it('Select a DB', () => {
    cy.get('.cy-db-select').click()
    cy.get('.cy-db-option').contains('COSMIC').click()

    cy.get('.mat-stepper-next').contains('Next').click()
  })

  it('Select Attributes', () => {
    //TODO
  })

  it('Select Weights', () => {
    //TODO
  })

  it('Choose Clustering Method', () => {
    //TODO
  })

  it('Set Parameters and Data Processor', () => {
    //TODO
  })

  it('Temporal Values', () => {
    //TODO
  })

  it('Review and Submit', () => {
    //TODO
  })
})
