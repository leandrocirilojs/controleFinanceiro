let transactions = [];

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
            descricao,
            valor,
            tipo
        };

        transactions.push(transacao);
        atualizarTransacoes();
        fecharPopup();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
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
