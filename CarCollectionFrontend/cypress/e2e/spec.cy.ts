describe('Prueba de login', () => {
  beforeEach(() => {
    cy.visit('/login'); 
  });

  it('Debería iniciar sesión', () => {
    const email = Cypress.env('EMAIL');
    const password = Cypress.env('PASSWORD');

    cy.get('[data-cy=username]').type(email, { log: false });  
    cy.get('[data-cy=password]').type(password, { log: false }); 
    cy.get('[data-cy=login-button]').click(); 

    // Verificar que redirige al dashboard
    cy.url().should('include', '/profile-info');
  });
});
