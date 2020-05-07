import { getGreeting } from '../support/app.po';
import { url } from 'inspector';

describe('home', () => {
  // Can Change the visit to any of the URLS. Probably best to use the main one
  beforeEach(() => cy.visit('https://rmslowside.github.io/rmslow/apps/home/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Home');
  });

  // it('Does not do much ! - will fail', () => {  // new style javascript lamda
  //   expect(true).to.equal(false)
  // })

  it('Does not do much ! - will pass', function test() {  // old style javascript function
    expect(true).to.equal(true)
  })

  it('Verify Home, S3 App link', () => {
        // Currently have to use the explicit wait, once hooked up will use route
        cy.contains('S3 App').click().wait(500)
        cy.url().should('include', '/apps/s3/') // "should" creates an assertion, which are automatically retried untill they pass or time out
        //cy.url().contains('/apps/s3/')        // "contains" gets the DOM element containing the text
        cy.contains('Folder0')

        // // might work once front end is hooked up...
        // cy.server()
        // cy.route('/s3/*').as('getFolders')
        // cy.contains('S3').click()
        // cy.wait('@getFolders')      // <--- wait explicitly for this route to finish
        // cy.contains('Folder0')

    // // Cypress Example 1 for Alias - will be useful once the frontend is hooked up.
    // cy.server()
    // cy.route('GET', /users/, [{ 'name': 'Maggy' }, { 'name': 'Joan' }]).as('getUsers')
    // cy.get('#fetch').click()
    // cy.wait('@getUsers')     // <--- wait explicitly for this route to finish
    // cy.get('table tr').should('have.length', 2)

    // // Cypress Example 2 for Alias
    // // Wait for the route aliased as 'getAccount' to respond
    // // without changing or stubbing its response
    // cy.server()
    // cy.route('/accounts/*').as('getAccount')
    // cy.visit('/accounts/123')
    // cy.wait('@getAccount').then((xhr) => {
    // // we can now access the low level xhr
    // // that contains the request body,
    // // response body, status, etc
    // })
  })

  it('Verify Home Lazy App link', () => {
    // Currently have to use the explicit wait, once hooked up will use route
    cy.contains('Lazy App').click().wait(500)
    cy.url().should('include', '/apps/lazy-load/')
    //cy.contains('Folder0')
  })

  it('Verify NGXS Form App link', () => {
    // Currently have to use the explicit wait, once hooked up will use route
    cy.contains('NGXS Form App').click().wait(500)
    cy.url().should('include', '/apps/ngxs-forms/')
    //cy.contains('Folder0')
    cy.get('[formcontrolname="novelName"]')     // "get" grabs one or more DOM elements by selector or alias
      .type('superfragacalalisticexpealadocious').should('have.value', 'superfragacalalisticexpealadocious')
    //cy.get("button").click  // not sure if this button click works, heck not even shure what the button is supposed to do...

    cy.contains('open dynamic form').click()
    cy.get('#firstName')  // # is short for id=
      .type(', Edward').should('have.value', 'Bombasto, Edward')

    cy.get('#emailAddress')
      .type('fake@email.com').should('have.value', 'fake@email.com')

  })



});
