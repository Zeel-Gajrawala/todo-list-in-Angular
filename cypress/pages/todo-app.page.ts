import '../support/commands';

export class TodoApp {
  public todoTable(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getByTestId('todo-list-table');
  }

  public todoInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getByTestId('todo-input');
  }

  public todoSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getByTestId('todo-input-submit');
  }

  public todoListItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getByTestId('todo-list-item');
  }

  public todoItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getByTestId('todo-item');
  }

  public emptyList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getByTestId('empty-todo-list');
  }

  public errorText(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getByTestId('todo-input-error');
  }

  public addTodo(itemName: string) {
    cy.getByTestId('todo-input').first().type(itemName);
    cy.getByTestId('todo-input-submit').first().click();
  }

  public strikeTodoItem(todoIndex: number) {
    cy.getByTestId('todo-input-checkbox').eq(todoIndex).click();
  }

  public deleteTodo(todoIndex: number) {
    cy.getByTestId('todo-item-delete').eq(todoIndex).click();
  }
}
