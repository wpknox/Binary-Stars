
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
    cy.get('.mat-list-text').contains('Luminosity').click()
    cy.get('.mat-list-text').contains('Radius').click()
    cy.get('.mat-list-text').contains('Effective Temperature').click()
    cy.get('.mat-raised-button').contains('arrow_forward').click()

    cy.get('.mat-stepper-next').contains('Next').click({force: true})
  })

  it('Select Weights', () => {
    cy.get('.cy-weight-0').type('34')
    cy.get('.cy-weight-1').type('34')
    cy.get('.cy-weight-2').type('32')

    cy.get('.mat-stepper-next').contains('Next').click({force: true})
  })

  it('Choose Clustering Method', () => {
    cy.get('.cy-cluster-method-select').click()
    cy.get('.cy-cluster-method-option').contains('K-Means').click()

    cy.get('.mat-stepper-next').contains('Next').click({force: true})
  })

  it('Set Parameters and Data Processor', () => {
    cy.get('.cy-cluster-num').type('4')
    cy.get('.cy-data-processor-select').click()
    cy.get('.cy-data-processor-option').contains('MinMax').click()

    cy.get('.mat-stepper-next').contains('Next').click({force: true})
  })

  it('Temporal Values', () => {
    //TODO
  })

  it('Review and Submit', () => {
    cy.server()
    cy.route('POST', '**/api/binarystars/cluster').as('cluster')

    cy.get('.cy-submit-query').click()

    cy.wait('@cluster', {timeout: 20000})

    cy.get('.cy-3D-graph').should('be.visible')
  })
})
