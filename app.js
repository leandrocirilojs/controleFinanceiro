// Seleciona os elementos do DOM
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');

let transactions = [];

// Atualiza o saldo total
function updateBalance() {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    balanceEl.textContent = `R$ ${total.toFixed(2)}`;
}

// Adiciona uma nova transação
function addTransaction(event) {
    event.preventDefault();
    
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || description.trim() === '') {
        alert('Por favor, insira uma descrição e um valor válido.');
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount
    };

    transactions.push(transaction);
    renderTransactions();
    updateBalance();

    // Limpa o formulário
    form.reset();
}

// Renderiza a lista de transações
function renderTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.description} 
            <span>${transaction.amount > 0 ? '+' : ''}R$ ${transaction.amount.toFixed(2)}</span>
            <button onclick="removeTransaction(${transaction.id})">x</button>
        `;
        transactionList.appendChild(li);
    });
}

// Remove uma transação
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    renderTransactions();
    updateBalance();
}

// Evento para adicionar uma nova transação
form.addEventListener('submit', addTransaction);
