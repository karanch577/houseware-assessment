describe('todoMVC', () => {
  it('should able to add todos', () => {
    cy.visit('http://localhost:8080')

    // add the todo
    cy.get('[data-testid="header"]').type("todo1{enter}")

    // getting to added todo
    cy.get('[data-testid="todo-item-label"]').should("have.text", "todo1")
  })

  it('should able to edit the added todos', () => {
    cy.visit('http://localhost:8080')

    // add the todo
    cy.get('[data-testid="header"]').type("todo1{enter}")

    // getting to added todo
    cy.get('[data-testid="todo-item-label"]').should("have.text", "todo1").dblclick()

    // getting the edit todo input
    cy.get('.view .new-todo')
    .type("updated{enter}")
    cy.get('[data-testid="todo-item-label"]').should("have.text", "todo1updated")
  })

  it('should able to remove the added todos', () => {
    cy.visit('http://localhost:8080')

    // add the todo
    cy.get('[data-testid="header"]').type("todo1{enter}")

    // removing the added todo
    cy.get(".destroy")
    .invoke("show")
    .click()
  })
})