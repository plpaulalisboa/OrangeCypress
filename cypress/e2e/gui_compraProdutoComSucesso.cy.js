/// <reference types="Cypress"/>


describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {
    it('Fluxo de compra de produtos', () => {
        cy.login_teste('standard_user', 'secret_sauce')
        cy.get('.product_label').should('contain','Products')

        // Ordenação de produtos de menor para maior valor:
        cy.get('.product_sort_container').select('Price (low to high)')
        // Validação da ordenação desses produtos:
        cy.get('.inventory_list > :nth-child(1)').should('contain', 'Sauce Labs Onesie')
        cy.get('.inventory_list > :nth-child(2)').should('contain', 'Sauce Labs Bike Light')
        cy.get('.inventory_list > :nth-child(3)').should('contain', 'Sauce Labs Bolt T-Shirt')

        // Adicionando produtos ao carrinho:
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.wait(1000); // aguarda 1 segundo
        cy.get('.inventory_details_back_button').click({ force: true });

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.wait(1000); // aguarda 1 segundo
        cy.get('.inventory_details_back_button').click({ force: true });

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.wait(1000); // aguarda 1 segundo
        cy.get('.inventory_details_back_button').click({ force: true });

        // Checagem da quantidade de produtos adicionados ao carrinho:
        cy.get('.fa-layers-counter').should('have.text', '3')

        // Check no carrinho:
        cy.get('.fa-layers-counter').click()
        cy.verificaProdutos()

        //Checkout:
        cy.get('.btn_action').click()
        cy.get('[data-test="firstName"]').type('Maria')
        cy.get('[data-test="lastName"]').type('Oliveira')
        cy.get('[data-test="postalCode"]').type('06454000')
        cy.get('.btn_primary').click()

        //Verificando produtos no checkout:
        cy.verificaProdutos()

        //Checagem no valor total:
        cy.get('.summary_total_label').should('have.text', 'Total: $36.69')

        cy.get('.btn_action').click()
        cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')

    });
});