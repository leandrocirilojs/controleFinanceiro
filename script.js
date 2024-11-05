document.addEventListener('DOMContentLoaded', function () {
    const balanceScreen = document.querySelector('.balance-screen');
    const expensesChartScreen = document.querySelector('.expenses-chart-screen');
    const expenseCategoriesScreen = document.querySelector('.expense-categories-screen');
    
    // Exemplo de função para alternar entre telas
    function showScreen(screen) {
        balanceScreen.style.display = 'none';
        expensesChartScreen.style.display = 'none';
        expenseCategoriesScreen.style.display = 'none';
        screen.style.display = 'block';
    }

    // Inicialmente mostra apenas a tela de saldo
    showScreen(balanceScreen);

    // Adicionar evento para o botão de adicionar transação
    document.querySelector('.add-transaction-btn').addEventListener('click', function () {
        showScreen(expenseCategoriesScreen);
    });
});
