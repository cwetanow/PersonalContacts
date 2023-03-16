const day = 5;
const birthDate = `${day.toString().padStart(2, '0')}/01/2002`;
const contact = {
  birthDate,
  firstName: 'John',
  lastName: 'Doe',
  street: 'Johh Mary 5',
  city: 'Quahog',
  zipCode: '784',
  phoneNumber: '+359889186752',
  iban: 'BG46STSA93008297336485'
};

function rename(firstName: string, lastName: string) {
  cy.get('input#firstName').clear().type(firstName);
  cy.get('input#lastName').clear().type(lastName);
}

function changeDetails(birthDate: string, day: number, street: string, city: string, zipCode: string, phoneNumber: string, iban: string) {
  cy.get('.p-calendar input').type(birthDate);
  cy.get('.p-datepicker-calendar-container span').contains(day).click();

  cy.get('input#street').type(street);
  cy.get('input#city').type(city);
  cy.get('input#zipCode').type(zipCode);

  cy.get('input#phoneNumber').type(phoneNumber);
  cy.get('input#iban').type(iban);
}

describe('Personal Contacts Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Should redirect to /contacts', () => {
    cy.url().should('include', '/contacts');
  });

  it('Should display table with contacts', () => {
  });

  it('Should display to contact details on details button click', () => {
    cy.intercept('GET', '/api/v1/PersonalContacts/*').as('getContactRequest');

    cy.get('.show-details-button').first().click();

    cy.wait('@getContactRequest')
      .then(interception => {
        const contactDetail = interception.response ? interception.response.body : {};
        cy.url().should('include', `/contacts/${contactDetail.id}`);

        cy.get('.p-card-title').should('contain.text', `${contactDetail.firstName} ${contactDetail.lastName}`);
        cy.get('.p-card-subtitle').should('contain.text', `${contactDetail.address.street}, ${contactDetail.address.city} ${contactDetail.address.zipCode}`);

        const expectedDateOfBirth = new Date(contactDetail.dateOfBirth).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        cy.get('#dateOfBirth').should('contain.text', expectedDateOfBirth);

        cy.get('#phoneNumber').should('contain.text', contactDetail.phoneNumber);
        cy.get('#iban').should('contain.text', contactDetail.iban);
      });
  });

  it('Should rename contact', () => {
    cy.intercept('GET', '/api/v1/PersonalContacts/*').as('getContactRequest');

    cy.get('.show-details-button').first().click();

    cy.wait('@getContactRequest')
      .then(interception => {
        const contactDetail = interception.response ? interception.response.body : {};
        cy.url().should('include', `/contacts/${contactDetail.id}`);

        cy.get('#renameButton').click();

        const newFirstName = 'Johny';
        const newLastName = 'Johnson';
        rename(newFirstName, newLastName);

        cy.get('#renameSaveButton').click();
        cy.get('.p-card-title').should('contain.text', `${newFirstName} ${newLastName}`);
      });
  });

  it('Should change details', () => {



  });

  it('Adds a contact and redirects to details', () => {
    cy.get('#addContact').click();

    rename(contact.firstName, contact.lastName);
    changeDetails(birthDate, day, contact.street, contact.city, contact.zipCode, contact.phoneNumber, contact.iban);

    cy.intercept('POST', '/api/v1/PersonalContacts').as('addContactRequest');

    cy.get('#saveButton').click();

    cy.wait('@addContactRequest')
      .then(interception => {
        const id = interception.response ? interception.response.body.id : '';
        return cy.url().should('include', `/contacts/${id}`);
      });
  });
});