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

    // Create of CRUD
    cy.get("button").contains("create_new_folder").click()
    cy.get('[placeholder="Folder Name"]').type("new folder")  // get the input with the placeholder=Folder Name
    cy.get("button").contains("OK").click()

    // Read
    cy.contains('new folder')

    // Update
    //cy.get("div").contains("new folder").rightclick()  // can't rightclick or click a folder, rewrites the DOM...

//    cy.get("div").contains("new folder").trigger('mouseover')
//    cy.get("div").contains("Folder9").trigger('mouseover')

//    cy.get("div").contains("new folder").invoke('mouseover')
//    cy.get("div").contains("Folder9").invoke('mouseover')
    //cy.wrap()

//    cy.get("div").contains("new folder").click()

    //cy.get("button").contains("Rename").click()


    // Delete

//    cy.wait(7000)

  });

});
