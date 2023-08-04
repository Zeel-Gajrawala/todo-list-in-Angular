import '../support/commands';

describe('test todo app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should test todo app', () => {
    cy.getByTestId('todo-app').should('be.visible');
  });

  it('should test initial app view', () => {
    cy.getByTestId('empty-todo-list').should('be.visible');
    cy.getByTestId('empty-todo-list').should(
      'contain.text',
      'No Todos! Add Todos.'
    );
    cy.getByTestId('todo-list-table').should('not.exist');
    cy.getByTestId('todo-input').should('be.visible');
    cy.getByTestId('todo-input-submit').should('be.visible');
    cy.getByTestId('todo-input-error').should('not.exist');
  });

  it('should test add todo with valid input', () => {
    cy.getByTestId('todo-input').first().type('Buy Groceries');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-list-table').should('be.visible');
    cy.getByTestId('todo-input-error').should('not.exist');
    cy.getByTestId('todo-list-item').should('have.length', 1);

    cy.getByTestId('todo-input').first().type('Complete Assignment');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-input').first().type('Pay Bills');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-list-item').should('have.length', 3);
    cy.getByTestId('todo-item').then((todo) => {
      expect(todo[0]).to.contain.text('Buy Groceries');
      expect(todo[1]).to.contain.text('Complete Assignment');
      expect(todo[2]).to.contain.text('Pay Bills');
    });
  });

  it('should test add todo with empty input', () => {
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-list-table').should('not.exist');
    cy.getByTestId('todo-input').should('have.text', '');
    cy.getByTestId('todo-input-error').should('be.visible');
    cy.getByTestId('todo-input-error').should(
      'contain.text',
      'Please Enter Some Value'
    );
  });

  it('should test strike a completed todo', () => {
    cy.getByTestId('todo-input').first().type('Buy Groceries');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-input').first().type('Complete Assignment');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-input').first().type('Pay Bills');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-list-table').should('be.visible');
    cy.getByTestId('todo-list-item').should('have.length', 3);

    cy.getByTestId('todo-input-checkbox').eq(2).click();
    cy.getByTestId('todo-item').eq(2).should('have.class', 'strike');
    cy.getByTestId('todo-item').then((todo) => {
      expect(todo[0]).to.not.have.class('strike');
      expect(todo[1]).to.not.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });

    cy.getByTestId('todo-input-checkbox').eq(0).click();
    cy.getByTestId('todo-item').eq(0).should('have.class', 'strike');
    cy.getByTestId('todo-item').then((todo) => {
      expect(todo[0]).to.have.class('strike');
      expect(todo[1]).to.not.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });

    cy.getByTestId('todo-input-checkbox').eq(0).click();
    cy.getByTestId('todo-item').eq(0).should('not.have.class', 'strike');
    cy.getByTestId('todo-item').then((todo) => {
      expect(todo[0]).not.to.have.class('strike');
      expect(todo[1]).to.not.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });

    cy.getByTestId('todo-input-checkbox').eq(1).click();
    cy.getByTestId('todo-item').eq(1).should('have.class', 'strike');
    cy.getByTestId('todo-item').then((todo) => {
      expect(todo[0]).not.to.have.class('strike');
      expect(todo[1]).to.have.class('strike');
      expect(todo[2]).to.have.class('strike');
    });
  });

  it('should test delete todo', () => {
    cy.getByTestId('todo-input').first().type('Buy Groceries');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-input').first().type('Complete Assignment');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-input').first().type('Pay Bills');
    cy.getByTestId('todo-input-submit').first().click();

    cy.getByTestId('todo-list-table').should('be.visible');
    cy.getByTestId('todo-list-item').should('have.length', 3);

    cy.getByTestId('todo-item-delete').eq(1).click();
    cy.getByTestId('todo-list-item').should('have.length', 2);
    cy.getByTestId('todo-item').then((todo) => {
      expect(todo[0]).to.contain.text('Buy Groceries');
      expect(todo[1]).to.contain.text('Pay Bills');
    });

    cy.getByTestId('todo-item-delete').eq(1).click();
    cy.getByTestId('todo-list-item').should('have.length', 1);
    cy.getByTestId('todo-item').then((todo) => {
      expect(todo[0]).to.contain.text('Buy Groceries');
    });

    cy.getByTestId('todo-item-delete').eq(0).click();
    cy.getByTestId('todo-list-item').should('have.length', 0);
    cy.getByTestId('todo-item').should('not.exist');
    cy.getByTestId('todo-list-table').should('not.exist');
    cy.getByTestId('empty-todo-list').should('exist');
  });
});
