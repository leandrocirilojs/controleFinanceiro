document.addEventListener('DOMContentLoaded', function () {
    const transactionForm = document.getElementById('transaction-form');
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    const saveTransactionBtn = document.getElementById('save-transaction-btn');
    const transactionList = document.getElementById('transaction-list');

    // Exibir o formulário de nova transação ao clicar no botão "+"
    addTransactionBtn.addEventListener('click', function () {
        transactionForm.style.display = transactionForm.style.display === 'none' ? 'block' : 'none';
    });

    // Função para salvar a nova transação
    saveTransactionBtn.addEventListener('click', function () {
        const description = document.getElementById('transaction-description').value;
        const amount = parseFloat(document.getElementById('transaction-amount').value);

        if (description && !isNaN(amount)) {
            const transactionItem = document.createElement('li');
            const amountClass = amount >= 0 ? 'income' : 'expense';
            transactionItem.innerHTML = `<span>${description}</span><span class="${amountClass}">${amount >= 0 ? '+' : '-'} R$ ${Math.abs(amount).toFixed(2)}</span>`;
            transactionList.appendChild(transactionItem);

            // Limpa o formulário
            document.getElementById('transaction-description').value = '';
            document.getElementById('transaction-amount').value = '';
            transactionForm.style.display = 'none'; // Oculta o formulário
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
});
