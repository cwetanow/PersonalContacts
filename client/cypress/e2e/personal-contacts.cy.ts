describe('Personal Contacts Page', () => {
  it('Redirects to /contacts', () => {
    cy.visit('http://localhost:4200');

    cy.url().should('include', '/contacts')
  })
});