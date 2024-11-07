/*let transactions = [];

// Carrega as transações do localStorage ao iniciar o aplicativo
function carregarTransacoes() {
    const transacoesSalvas = localStorage.getItem("transactions");
    if (transacoesSalvas) {
        transactions = JSON.parse(transacoesSalvas);
        atualizarTransacoes();
    }
}

// Salva as transações no localStorage
function salvarTransacoes() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function abrirPopup() {
    document.getElementById("popup").style.display = "flex";
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function adicionarTransacao() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;

    if (descricao && valor) {
        const transacao = {
            id: Date.now(), // Gera um ID único para cada transação
            descricao,
            valor,
            tipo
        };

        transactions.push(transacao);
        salvarTransacoes();
        atualizarTransacoes();
        fecharPopup();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function removerTransacao(id) {
    transactions = transactions.filter(transacao => transacao.id !== id);
    salvarTransacoes();
    atualizarTransacoes();
}

function atualizarTransacoes() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transacao) => {
        const transacaoDiv = document.createElement("div");
        transacaoDiv.classList.add("transacao");

        transacaoDiv.innerHTML = `
            <div class="info">
                <h4>${transacao.descricao}</h4>
                <p>${transacao.tipo === "ganho" ? "Income" : "Expense"}</p>
            </div>
            <div class="valor ${transacao.tipo === "ganho" ? "positivo" : "negativo"}">
                ${transacao.tipo === "ganho" ? "+" : "-"} ${transacao.valor}
            </div>
            <button class="remover" onclick="removerTransacao(${transacao.id})">Remover</button>
        `;

        transactionList.appendChild(transacaoDiv);

        if (transacao.tipo === "ganho") {
            totalIncome += transacao.valor;
        } else {
            totalExpenses += transacao.valor;
        }
    });

    document.getElementById("total-income").innerText = totalIncome;
    document.getElementById("total-expenses").innerText = totalExpenses;
    document.getElementById("total-balance").innerText = totalIncome - totalExpenses;
}

// Carrega as transações ao iniciar o aplicativo
carregarTransacoes();
*/

let transactions = [];

// Carrega as transações do localStorage ao iniciar o aplicativo
function carregarTransacoes() {
    const transacoesSalvas = localStorage.getItem("transactions");
    if (transacoesSalvas) {
        transactions = JSON.parse(transacoesSalvas);
        atualizarTransacoes();
    }
}

// Salva as transações no localStorage
function salvarTransacoes() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function abrirPopup() {
    document.getElementById("popup").style.display = "flex";
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function adicionarTransacao() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;

    // Validação de entrada
    if (!descricao || isNaN(valor) || valor <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const transacao = {
        id: Date.now(),
        descricao,
        valor,
        tipo
    };

    transactions.push(transacao);
    salvarTransacoes();
    atualizarTransacoes();
    fecharPopup();
}

function removerTransacao(id) {
    transactions = transactions.filter(transacao => transacao.id !== id);
    salvarTransacoes();
    atualizarTransacoes();
}

function atualizarTransacoes() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transacao) => {
        const transacaoDiv = document.createElement("div");
        transacaoDiv.classList.add("transacao");

        transacaoDiv.innerHTML = `
            <div class="info">
                <h4>${transacao.descricao}</h4>
                <p>${transacao.tipo === "ganho" ? "Ganho" : "Despesa"}</p>
            </div>
            <div class="valor ${transacao.tipo === "ganho" ? "positivo" : "negativo"}">
                ${transacao.tipo === "ganho" ? "+" : "-"} ${formatarMoeda(transacao.valor)}
            </div>
            <button class="remover" onclick="removerTransacao(${transacao.id})"> X </button>
        `;

        transactionList.appendChild(transacaoDiv);

        if (transacao.tipo === "ganho") {
            totalIncome += transacao.valor;
        } else {
            totalExpenses += transacao.valor;
        }
    });

    document.getElementById("total-income").innerText = formatarMoeda(totalIncome);
    document.getElementById("total-expenses").innerText = formatarMoeda(totalExpenses);
    document.getElementById("total-balance").innerText = formatarMoeda(totalIncome - totalExpenses);
}

// Função para formatar os valores como moeda
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Carrega as transações ao iniciar o aplicativo
carregarTransacoes();







let detalheTransacaoID = null;

// Função para abrir o pop-up de detalhes da transação
function verDetalhesTransacao(id) {
    const transacao = transactions.find(t => t.id === id);
    if (transacao) {
        // Carregar detalhes da transação
        document.getElementById("detalhe-descricao").innerText = transacao.descricao;
        document.getElementById("detalhe-valor").innerText = formatarMoeda(transacao.valor);
        document.getElementById("detalhe-tipo").innerText = transacao.tipo === "ganho" ? "Ganho" : "Despesa";
        document.getElementById("detalhe-data").innerText = new Date(transacao.id).toLocaleDateString("pt-BR");

        detalheTransacaoID = id;
        document.getElementById("detalhe-popup").style.display = "flex";
    }
}

// Função para fechar o pop-up de detalhes
function fecharDetalhePopup() {
    document.getElementById("detalhe-popup").style.display = "none";
}

// Função para editar transação
function editarTransacao() {
    const transacao = transactions.find(t => t.id === detalheTransacaoID);
    if (transacao) {
        document.getElementById("descricao").value = transacao.descricao;
        document.getElementById("valor").value = transacao.valor;
        document.getElementById("tipo").value = transacao.tipo;

        // Remove a transação atual para poder salvar as alterações como uma nova entrada
        removerTransacao(detalheTransacaoID);
        fecharDetalhePopup();
        abrirPopup();
    }
}

// Função para remover transação diretamente do pop-up de detalhes
function removerTransacao(id) {
    transactions = transactions.filter(transacao => transacao.id !== id);
    salvarTransacoes();
    atualizarTransacoes();
    fecharDetalhePopup();
}

// Função de formatação de moeda para valores
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
