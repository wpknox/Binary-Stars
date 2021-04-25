describe('Select DB Test', () => {
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

      it('Tests Stepper state for DB selection', () => {
        cy.get('button[matStepperNext]:visible').should('be.visible')
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', true)

        cy.get('app-db').find('mat-select').click()
        cy.get('.mat-option').contains('COSMIC').click()
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', false)
      })
    
  })

  describe('Weight Errots Test', () => {
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

      it('Selects a DB', () => {
        cy.get('app-db').find('mat-select').click()
        cy.get('.mat-option').contains('COSMIC').click()
    
        cy.get('button[matStepperNext]:visible').click()
      })
    
      it('Select Attributes', () => {
        cy.get('.list-item').contains('Orbital Period').click()
        cy.get('.list-item').contains('Eccentricity').click()
        cy.get('.list-item').contains('Mass(P)').click()
        cy.get('.list-item').contains('Evolution Time').click()
        cy.get('.list-item').contains('Radius(P)').click()
        cy.get('.mat-raised-button').contains('arrow_forward').click()
    
        cy.get('button[matStepperNext]:visible').click()
      })
    
      it('Check initial weight input states', () => {
        cy.get('.weight-list').find('input[matInput]').should('have.length', 5)
        cy.get('app-weight').find('.mat-checkbox-input').should('be.not.checked')
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', true)
      })

      it('Click allow empty input box', () => {
        cy.get('app-weight').find('mat-checkbox').click()
        cy.get('app-weight').find('.mat-checkbox-input').should('be.checked')
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', false)
      })

      it('Tests total weight with empty inputs allowed', () => {
        cy.get('.weight-list').find('input[matInput]').first().type('100')
        cy.get('button[matStepperNext]:visible').click()
        cy.get('simple-snack-bar').should('be.visible')
      })

      it('Tests invalid weight total with no empty inputs', () => {
        cy.get('app-weight').find('mat-checkbox').click()
        cy.get('app-weight').find('.mat-checkbox-input').should('be.not.checked')

        cy.get('.weight-list').find('input[matInput]').first().type('100')
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', true)

        cy.get('.weight-list').find('input[matInput]').first().clear()
        cy.get('.weight-list').find('input[matInput]').first().should('be.empty')

        cy.get('.weight-list').find('input[matInput]').each(($el, index, $list) => {
            cy.wrap($el).type('1')
          })
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', false)

        cy.get('button[matStepperNext]:visible').click()
        cy.get('simple-snack-bar').should('be.visible')

        cy.get('.weight-list').find('input[matInput]').first().clear()
        cy.get('app-weight').find('mat-checkbox').click()
        cy.get('button[matStepperNext]:visible').click()
      })
  })

  describe('Select Cluster Method Test', () => {
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

      it('Selects a DB', () => {
        cy.get('app-db').find('mat-select').click()
        cy.get('.mat-option').contains('COSMIC').click()
    
        cy.get('button[matStepperNext]:visible').click()
      })

      it('Select Attribute and Weight', () => {
        cy.get('.list-item').contains('Radius(P)').click()
        cy.get('.mat-raised-button').contains('arrow_forward').click()
    
        cy.get('button[matStepperNext]:visible').click()

        cy.get('.weight-list').find('input[matInput]').type('100')
        cy.get('button[matStepperNext]:visible').click()
      })

      it('Tests initial Cluster Method step state', () => {
        cy.get('button[matStepperNext]:visible').should('be.visible')
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', true)
      })

      it('Tests Cluster Method step state', () => {
        cy.get('button[matStepperNext]:visible').should('be.visible')
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', true)

        cy.get('app-cluster-method').find('mat-select').click()
        cy.get('.mat-option').contains('DBScan').click()
        cy.get('button[matStepperNext]:visible').should('have.prop', 'disabled', false)
      })
    
  })