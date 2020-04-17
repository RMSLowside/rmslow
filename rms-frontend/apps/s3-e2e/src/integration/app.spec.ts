import { getGreeting } from '../support/app.po';

describe('s3', () => {
  // Can Change the visit to any of the URLS. Probably best to use the main one
  beforeEach(() => cy.visit('https://smcfall2.github.io/rmslow/apps/s3/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('S3');
  });
});
