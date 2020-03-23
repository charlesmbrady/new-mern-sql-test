/// <reference types="cypress" />

describe('coverage', function() {
  it('cover the tested code', function() {
    cy.visit('/');
    cy.get('button').click();
  });
});

describe('coverage2', function() {
  it('should pass', function() {
    expect(1).to.equal(1);
  });
});

describe('Users', function() {
  it('Can create user', function() {
    // cy.visit('/');

    cy.request('POST', `${Cypress.config('apiUrl')}/auth/register`, {
      firstName: 'charles',
      lastName: 'brady',
      email: 'ranom',
      password: 'myPassword1!'
    }).then(response => {
      // response.body is automatically serialized into JSON
      expect(response.body).to.have.property('firstName', 'charles'); // true
    });
  });
});
