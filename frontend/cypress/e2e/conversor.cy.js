describe("Pruebas funcionales del módulo Conversor SIRE", () => {
  const iniciarSesionYAbrirConversor = () => {
    cy.visit("/login");

    cy.get('input[placeholder="Ingrese su usuario"]').type("admin");
    cy.get('input[placeholder="••••••••"]').type("admin123");

    cy.contains("button", "Iniciar Sesión").click();

    cy.contains("Panel de Control").should("be.visible");
    cy.contains("a", "Conversor").click();

    cy.url().should("include", "/proceso");
  };

  beforeEach(() => {
    iniciarSesionYAbrirConversor();
  });

  it("PF-04 - Permite acceder al módulo Conversor", () => {
    cy.contains("Archivo SIRE").should("be.visible");
    cy.contains("Empresa").should("be.visible");
    cy.contains("Tipo de Registro").should("be.visible");
    cy.contains("Periodo").should("be.visible");
    cy.contains("button", "GENERAR MACRO EXCEL").should("be.visible");
  });

  it("PF-05 - Mantiene deshabilitada la generación si faltan datos", () => {
    cy.contains("button", "GENERAR MACRO EXCEL")
      .should("be.visible")
      .and("be.disabled");
  });

  it("PF-06 - Permite seleccionar un archivo CSV válido", () => {
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from(
          "periodo,ruc,serie,numero,total\n202610,20123456789,F001,000001,118.00"
        ),
        fileName: "sire_prueba.csv",
        mimeType: "text/csv",
      },
      { force: true }
    );

    cy.contains("sire_prueba.csv").should("be.visible");
  });

  it("PF-07 - Rechaza un archivo con extensión no permitida", () => {
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from("archivo no permitido"),
        fileName: "archivo_invalido.pdf",
        mimeType: "application/pdf",
      },
      { force: true }
    );

    cy.contains("archivo_invalido.pdf").should("not.exist");
    cy.contains("Arrastra tu archivo CSV del SIRE aquí").should("be.visible");
  });

  it("PF-08 - Permite cambiar entre Compras y Ventas", () => {
    cy.contains("button", "Ventas (VTA)").click();

    cy.get("select")
      .should("be.visible")
      .select("SERVICIOS")
      .should("have.value", "SERVICIOS");

    cy.contains("button", "Compras (COM)").click();

    cy.get("select").should("not.exist");
  });
});