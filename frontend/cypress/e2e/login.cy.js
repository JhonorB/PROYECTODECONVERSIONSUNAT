describe("Pruebas funcionales de autenticación", () => {

  beforeEach(() => {
    cy.visit("/login");
  });

  it("PF-01 - Permite iniciar sesión con credenciales válidas", () => {
    cy.get('input[placeholder="Ingrese su usuario"]')
      .type("admin");

    cy.get('input[placeholder="••••••••"]')
      .type("admin123");

    cy.contains("button", "Iniciar Sesión").click();

    cy.url().should("eq", "http://localhost:5173/");
    cy.contains("Panel de Control").should("be.visible");
  });

  it("PF-02 - Rechaza credenciales incorrectas", () => {
    cy.get('input[placeholder="Ingrese su usuario"]')
      .type("usuario_invalido");

    cy.get('input[placeholder="••••••••"]')
      .type("clave_incorrecta");

    cy.contains("button", "Iniciar Sesión").click();

    cy.contains(/credenciales inválidas|credenciales incorrectas/i)
      .should("be.visible");

    cy.url().should("include", "/login");
  });

  it("PF-03 - Valida los campos obligatorios", () => {
    cy.contains("button", "Iniciar Sesión").click();

    cy.contains("Por favor ingrese usuario y contraseña")
      .should("be.visible");

    cy.url().should("include", "/login");
  });

});