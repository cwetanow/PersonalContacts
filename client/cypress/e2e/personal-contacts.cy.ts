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

function changeDetails(dateOfBirth: string, dayOfBirth: number, street: string, city: string, zipCode: string, phoneNumber: string, iban: string) {
  cy.get('.p-calendar input').type(dateOfBirth);
  cy.get('.p-datepicker-calendar-container span').contains(dayOfBirth).click();

  cy.get('input#street').clear().type(street);
  cy.get('input#city').clear().type(city);
  cy.get('input#zipCode').clear().type(zipCode);

  cy.get('input#phoneNumber').clear().type(phoneNumber);
  cy.get('input#iban').clear().type(iban);
}

function addContact() {
  cy.get('#addContact').click();

  rename(contact.firstName, contact.lastName);
  changeDetails(birthDate, day, contact.street, contact.city, contact.zipCode, contact.phoneNumber, contact.iban);

  cy.get('#saveButton').click();

  cy.visit('http://localhost:4200');
}

describe('Personal Contacts Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/PersonalContacts').as('getContactsRequest');

    cy.visit('http://localhost:4200');
  });

  it('Should redirect to /contacts', () => {
    cy.url().should('include', '/contacts');
  });

  it('Should add a contact and redirect to details', () => {
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

  it('Should display table with contacts', () => {
    cy.wait('@getContactsRequest')
      .then(interception => {
        const contacts = interception.response ? interception.response.body : [];

        cy.get('.p-datatable-tbody tr')
          .each((row, index) => {
            const rowContact = contacts[index];
            expect(row.text()).to.contain(rowContact.fullName);
            expect(row.text()).to.contain(rowContact.address);
          });
      });
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
    cy.get('.show-details-button').first().click();

    cy.get('#renameButton').click();

    const newFirstName = 'Johny';
    const newLastName = 'Johnson';
    rename(newFirstName, newLastName);

    cy.get('#renameSaveButton').click();
    cy.get('.p-card-title').should('contain.text', `${newFirstName} ${newLastName}`);
  });

  it('Should change details', () => {
    cy.intercept('GET', '/api/v1/PersonalContacts/*').as('getContactRequest');

    cy.get('.show-details-button').first().click();

    cy.wait('@getContactRequest')
      .then(interception => {
        const contactDetail = interception.response ? interception.response.body : {};
        cy.get('#changeDetailsButton').click();

        const oldDateOfBirth = new Date(contactDetail.dateOfBirth);

        const newDay = 12;
        const newBirthDate = new Date(oldDateOfBirth.getFullYear(), oldDateOfBirth.getMonth(), newDay);

        const newStreet = 'Johh Mary 51';
        const newCity = 'New Quahog';
        const newZipCode = '785';
        const newPhoneNumber = '+359889184932';
        const newIban = 'DE68500105178297336485';

        changeDetails(newBirthDate.toString(), newDay, newStreet, newCity, newZipCode, newPhoneNumber, newIban);

        cy.get('#changeDetailsSaveButton').click();

        cy.get('.p-card-subtitle').should('contain.text', `${newStreet}, ${newCity} ${newZipCode}`);
        cy.log(new Date(newBirthDate).toString());

        const expectedDateOfBirth = new Date(newBirthDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        cy.log(expectedDateOfBirth);
        cy.get('#dateOfBirth').should('contain.text', expectedDateOfBirth);

        cy.get('#phoneNumber').should('contain.text', newPhoneNumber);
        cy.get('#iban').should('contain.text', newIban);
      });
  });

  it('Should delete contact', () => {
    let countBeforeDeletion = 0;

    addContact();

    cy.get('.p-datatable-tbody tr')
      .then(elements => {
        countBeforeDeletion = elements.length;
        cy.get('.show-details-button').first().click();
        cy.get('#deleteContactButton').click();
        cy.get('button.p-confirm-dialog-accept').click();

        return cy.get('.p-datatable-tbody tr');
      })
      .then(elements => {
        const countAfterDeletion = elements.length;

        expect(countAfterDeletion).to.be.eq(countBeforeDeletion - 1);
      });
  });
});