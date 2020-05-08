import { getGreeting } from '../support/app.po';

describe('s3', () => {
  // Can Change the visit to any of the URLS. Probably best to use the main one
  beforeEach(() => cy.visit('https://rmslowside.github.io/rmslow/apps/s3/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('S3');
  });

  it('Verify folder CRUD, S3 App', () => {
   cy.contains('Folder') // doing a partial, not Folder0 or Folder1

    // Create - new folder
    cy.get("button").contains("create_new_folder").click()
    cy.get('[placeholder="Folder Name"]').type("new folder")  // get the input with the placeholder=Folder Name
    cy.get("button").contains("OK").click()
    cy.wait(500)  // MUST HAVE THIS WAIT... can I use cy.wrap() and wait on a promise???

    // Read
    cy.get("span").contains("new folder")

    // Update - grab new folder and rename it
    cy.get("span").contains("new folder").rightclick()
    cy.get("button").contains("Rename").click()
    cy.get('[placeholder="Folder Name"]')     // "get" grabs one or more DOM elements by selector or alias
      .type('new folder CRUD').should('have.value', 'new folder CRUD')
    cy.get("button").contains("OK").click().wait(500)
    cy.get("span").contains("new folder CRUD").should('be.visible')
    //cy.get(".element-container:last").contains("new folder CRUD").should('be.visible') // uses the class, not recommended by cypress
    //cy.get("span").contains("new folder CRUD").should('have.value', 'new folder CRUD') // does not work, not how you check the value in cypress

    // Delete
    cy.get("span").contains("new folder CRUD").rightclick()
    cy.get("button").contains("Delete").click()
    cy.get("span").contains("new folder CRUD").should('not.exist')


    //cy.wait(7000) // to see

  });

});
