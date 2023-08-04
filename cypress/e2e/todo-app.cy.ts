import { TodoApp } from 'cypress/pages/todo-app.page';
import '../support/commands';

describe('test todo app', () => {
  let todoAppPage: TodoApp;

  beforeEach(() => {
    todoAppPage = new TodoApp();
    cy.visit('/');
  });

  it('should test todo app', () => {
    cy.getByTestId('todo-app').should('be.visible');
  });

  it('should test initial app view', () => {
    todoAppPage.emptyList().should('be.visible');
    todoAppPage.emptyList().should('contain.text', 'No Todos! Add Todos.');
    todoAppPage.todoTable().should('not.exist');
    todoAppPage.todoInput().should('be.visible');
    todoAppPage.todoSubmitBtn().should('be.visible');
    todoAppPage.errorText().should('not.exist');
  });

  it('should test add todo with valid input', () => {
    todoAppPage.addTodo('Buy Groceries');

    todoAppPage.todoTable().should('be.visible');
    todoAppPage.errorText().should('not.exist');
    todoAppPage.todoListItem().should('have.length', 1);

    todoAppPage.addTodo('Complete Assignment');
    todoAppPage.addTodo('Pay Bills');

    todoAppPage.todoListItem().should('have.length', 3);
    todoAppPage.todoItem().then((todo) => {
      expect(todo[0]).to.contain.text('Buy Groceries');
      expect(todo[1]).to.contain.text('Complete Assignment');
      expect(todo[2]).to.contain.text('Pay Bills');
    });
  });

  it('should test add todo with empty input', () => {
    todoAppPage.todoSubmitBtn().first().click();

    todoAppPage.todoTable().should('not.exist');
    todoAppPage.todoInput().should('have.text', '');
    todoAppPage.errorText().should('be.visible');
    todoAppPage.errorText().should('contain.text', 'Please Enter Some Value');
  });

  it('should test strike a completed todo', () => {
    todoAppPage.addTodo('Buy Groceries');
    todoAppPage.addTodo('Complete Assignment');
    todoAppPage.addTodo('Pay Bills');

    todoAppPage.todoTable().should('be.visible');
    todoAppPage.todoListItem().should('have.length', 3);

    todoAppPage.strikeTodoItem(2);
    todoAppPage.todoItem().eq(2).should('have.class', 'strike');
    todoAppPage.todoItem().then((todo) => {
      expect(todo[0]).to.not.have.class('strike');
      expect(todo[1]).to.not.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });

    todoAppPage.strikeTodoItem(0);
    todoAppPage.todoItem().eq(0).should('have.class', 'strike');
    todoAppPage.todoItem().then((todo) => {
      expect(todo[0]).to.have.class('strike');
      expect(todo[1]).to.not.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });

    todoAppPage.strikeTodoItem(0);
    todoAppPage.todoItem().eq(0).should('not.have.class', 'strike');
    todoAppPage.todoItem().then((todo) => {
      expect(todo[0]).not.to.have.class('strike');
      expect(todo[1]).to.not.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });

    todoAppPage.strikeTodoItem(1);
    todoAppPage.todoItem().eq(1).should('have.class', 'strike');
    todoAppPage.todoItem().then((todo) => {
      expect(todo[0]).not.to.have.class('strike');
      expect(todo[1]).to.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });
  });

  it('should test delete todo', () => {
    todoAppPage.addTodo('Buy Groceries');
    todoAppPage.addTodo('Complete Assignment');
    todoAppPage.addTodo('Pay Bills');

    todoAppPage.todoTable().should('be.visible');
    todoAppPage.todoListItem().should('have.length', 3);

    todoAppPage.deleteTodo(2);
    todoAppPage.todoListItem().should('have.length', 2);
    todoAppPage.todoItem().then((todo) => {
      expect(todo[0]).to.contain.text('Buy Groceries');
      expect(todo[1]).to.contain.text('Complete Assignment');
    });

    todoAppPage.deleteTodo(1);
    todoAppPage.todoListItem().should('have.length', 1);
    todoAppPage.todoItem().then((todo) => {
      expect(todo[0]).to.contain.text('Buy Groceries');
    });

    todoAppPage.deleteTodo(0);
    todoAppPage.todoListItem().should('have.length', 0);
    todoAppPage.todoItem().should('not.exist');
    todoAppPage.todoTable().should('not.exist');
    todoAppPage.emptyList().should('exist');
  });
});
