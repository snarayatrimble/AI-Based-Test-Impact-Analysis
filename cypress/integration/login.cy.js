/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />
import landingpage from '../pageobjects/landingpage.js';
import 'cypress-wait-until';

describe('Verifying LandingPage Components', { testIsolation: false }, function () {

      it('Verify Header Text',() => {
        const page = new landingpage();

        cy.visit(Cypress.env('landingpageurl'))
        cy.wait(9000)
   //  page.getCookieAccept().click()  
     cy.fixture('data.json').then((user) => {
         cy.get('#username-field').type(user.email)
       cy.get('#enter_username_submit').click()
         cy.wait(1000)
         page.getUser().type(user.email)
        page.getPassword().type(user.password)
     })
     page.getSubmit().click()    
      page.getHeader().should('have.attr','header-title','Customer Hub')
    })
})
    