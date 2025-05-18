describe('Проверка функциональности сайта', function() {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' });
        cy.visit('/');
    });

    describe('Проверка модальных окон', function() {
        beforeEach(() => {
            cy.get('[data-cy=sauce2]').click();
            cy.get('[data-cy=modal]').as('modal');
        });

        it('Проверка открытия модального окна', function() {
            cy.get('@modal')
                .contains('Соус 2')
                .should('exist');
        });

        it('Закрытие по клику на крестик', function() {
            cy.get('[data-cy=modal] button').click();
            cy.get('@modal').should('not.exist');
        });

        it('Закрытие модального окна кликом на оверлей', function() {
            cy.get('body').click(0, 0);
            cy.get('@modal').should('not.exist');
        });
    });

    describe('Проверка добавления ингредиентов', function() {
        it('Добавление булки в конструктор', function() {
            cy.get('[data-cy=bun1]').contains('Добавить').click();
            cy.get('[data-cy=constuctor-bun-up]')
                .contains('Булка 1')
                .should('exist');
            cy.get('[data-cy=constuctor-bun-down]')
                .contains('Булка 1')
                .should('exist');
        });

        it('Добавление мяса в конструктор', function() {
            cy.get('[data-cy=main1]').contains('Добавить').click();
            cy.get('[data-cy=constructor-element-main1]')
                .contains('Мясо 1')
                .should('exist');
        });

        it('Добавление соуса в конструктор', function() {
            cy.get('[data-cy=sauce1]').contains('Добавить').click();
            cy.get('[data-cy=constructor-element-sauce1]')
                .contains('Соус 1')
                .should('exist');
        });
    });

    describe('Проверка оформления заказа', function() {
        beforeEach(() => {
            cy.intercept("GET", "api/auth/user", { fixture: "user" });
            cy.intercept("POST", "api/orders", { fixture: "order" });
            window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'));
            cy.setCookie('accessToken', 'testAccessToken');
        });

        afterEach(() => {
            cy.clearCookies();
            cy.clearLocalStorage();
        });

        it('Сбор заказа и нажатие кнопки "Купить"', function() {
            cy.get('[data-cy=bun1]').contains('Добавить').click();
            cy.get('[data-cy=main1]').contains('Добавить').click();
            cy.get('[data-cy=sauce1]').contains('Добавить').click();
            cy.contains('Оформить заказ').click();
            cy.get('[data-cy=modal]')
                .contains('123456')
                .should('exist');
            cy.get('[data-cy=modal] button').click();
            cy.get('[data-cy=modal]').should('not.exist');
            cy.contains('Выберите булки').should('exist');
            cy.contains('Выберите начинку').should('exist');
        });
    });
});
