describe('test todo app', () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it('should test todo app', () => {
        cy.get('[data-testid="todo-app"]').should('be.visible');
    })

    it('should test initial app view', () => {
        cy.get('[data-testid="empty-todo-list"]').should('be.visible');
        cy.get('[data-testid="empty-todo-list"]').should('contain.text', 'No Todos! Add Todos.');
        cy.get('[data-testid="todo-list-table"]').should('not.exist');
        cy.get('[data-testid="todo-input"]').should('be.visible');
        cy.get('[data-testid="todo-input-submit"]').should('be.visible');
        cy.get('[data-testid="todo-input-error"]').should('not.exist');
    })

    it('should test add todo with valid input', () => {
        cy.get('[data-testid="todo-input"]').first().type('Buy Groceries');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-list-table"]').should('be.visible');
        cy.get('[data-testid="todo-input-error"]').should('not.exist');
        cy.get('[data-testid="todo-list-item"]').should('have.length', 1);

        cy.get('[data-testid="todo-input"]').first().type('Complete Assignment');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-input"]').first().type('Pay Bills');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-list-item"]').should('have.length', 3);
        cy.get('[data-testid="todo-item"]').then((todo) => {
            expect(todo[0]).to.contain.text('Buy Groceries')
            expect(todo[1]).to.contain.text('Complete Assignment')
            expect(todo[2]).to.contain.text('Pay Bills')
        });
    })

    it('should test add todo with empty input', () => {
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-list-table"]').should('not.exist');
        cy.get('[data-testid="todo-input"]').should('have.text', '');
        cy.get('[data-testid="todo-input-error"]').should('be.visible');
        cy.get('[data-testid="todo-input-error"]').should('contain.text', 'Please Enter Some Value');
    })

    it('should test strike a completed todo', () => {
        cy.get('[data-testid="todo-input"]').first().type('Buy Groceries');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-input"]').first().type('Complete Assignment');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-input"]').first().type('Pay Bills');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-list-table"]').should('be.visible');
        cy.get('[data-testid="todo-list-item"]').should('have.length', 3);

        cy.get('[data-testid="todo-input-checkbox"]').eq(2).click();
        cy.get('[data-testid="todo-item"]').eq(2).should('have.class', 'strike');
        cy.get('[data-testid="todo-item"]').then((todo) => {
            expect(todo[0]).to.not.have.class('strike')
            expect(todo[1]).to.not.have.class('strike')
            expect(todo[2]).to.have.class('strike')
        });

        cy.get('[data-testid="todo-input-checkbox"]').eq(0).click();
        cy.get('[data-testid="todo-item"]').eq(0).should('have.class', 'strike');
        cy.get('[data-testid="todo-item"]').then((todo) => {
            expect(todo[0]).to.have.class('strike')
            expect(todo[1]).to.not.have.class('strike')
            expect(todo[2]).to.have.class('strike')
        });

        cy.get('[data-testid="todo-input-checkbox"]').eq(0).click();
        cy.get('[data-testid="todo-item"]').eq(0).should('not.have.class', 'strike');
        cy.get('[data-testid="todo-item"]').then((todo) => {
            expect(todo[0]).not.to.have.class('strike')
            expect(todo[1]).to.not.have.class('strike')
            expect(todo[2]).to.have.class('strike')
        });

        cy.get('[data-testid="todo-input-checkbox"]').eq(1).click();
        cy.get('[data-testid="todo-item"]').eq(1).should('have.class', 'strike');
        cy.get('[data-testid="todo-item"]').then((todo) => {
            expect(todo[0]).not.to.have.class('strike')
            expect(todo[1]).to.have.class('strike')
            expect(todo[2]).to.have.class('strike')
        });
    })

    it('should test delete todo', () => {
        cy.get('[data-testid="todo-input"]').first().type('Buy Groceries');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-input"]').first().type('Complete Assignment');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-input"]').first().type('Pay Bills');
        cy.get('[data-testid="todo-input-submit"]').first().click();

        cy.get('[data-testid="todo-list-table"]').should('be.visible');
        cy.get('[data-testid="todo-list-item"]').should('have.length', 3);

        cy.get('[data-testid="todo-item-delete"]').eq(1).click();
        cy.get('[data-testid="todo-list-item"]').should('have.length', 2);
        cy.get('[data-testid="todo-item"]').then((todo) => {
            expect(todo[0]).to.contain.text('Buy Groceries')
            expect(todo[1]).to.contain.text('Pay Bills')
        });

        cy.get('[data-testid="todo-item-delete"]').eq(1).click();
        cy.get('[data-testid="todo-list-item"]').should('have.length', 1);
        cy.get('[data-testid="todo-item"]').then((todo) => {
            expect(todo[0]).to.contain.text('Buy Groceries')
        });

        cy.get('[data-testid="todo-item-delete"]').eq(0).click();
        cy.get('[data-testid="todo-list-item"]').should('have.length', 0);
        cy.get('[data-testid="todo-item"]').should('not.exist');
        cy.get('[data-testid="todo-list-table"]').should('not.exist');
        cy.get('[data-testid="empty-todo-list"]').should('exist');
    })
})