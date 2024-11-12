let transactions = [];
let detalheTransacaoID;
// Função para carregar as transações do localStorage ao iniciar o aplicativo
function carregarTransacoes() {
    try {
        const transacoesSalvas = localStorage.getItem("transactions");
        if (transacoesSalvas) {
            transactions = JSON.parse(transacoesSalvas) || [];
        }
        atualizarTransacoes();
    } catch (error) {
        console.error("Erro ao carregar transações:", error);
    }
}

// Função para salvar as transações no localStorage
function salvarTransacoes() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Função para abrir o pop-up de adicionar transação
function abrirPopup() {
    document.getElementById("popup").style.display = "flex";
}

// Função para fechar o pop-up de adicionar transação
function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}







function filtrarPorData() {
    const dataInicial = document.getElementById("data-inicial").value;
    const dataFinal = document.getElementById("data-final").value;

    // Verifica se ambas as datas foram fornecidas
    if (!dataInicial || !dataFinal) {
        alert("Por favor, selecione ambas as datas para filtrar.");
        return;
    }

    // Converte as datas para o formato comparável
    const dataInicioObj = new Date(dataInicial);
    const dataFimObj = new Date(dataFinal);

    // Filtra as transações com base no intervalo de datas
    const transacoesFiltradas = transactions.filter(transacao => {
        const dataTransacao = new Date(transacao.dataPagamento);
        return dataTransacao >= dataInicioObj && dataTransacao <= dataFimObj;
    });

    // Atualiza a lista de transações com as filtradas
    atualizarTransacoes(transacoesFiltradas);
}











// Função para adicionar uma nova transação
function adicionarTransacao() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const dataPagamento = document.getElementById("data-pagamento").value;
    const statusPagamento = document.getElementById("status-pagamento").value; // Novo campo

    // Validação de entrada
    if (!descricao || isNaN(valor) || valor <= 0 || !dataPagamento || !statusPagamento) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const transacao = {
        id: Date.now(),
        descricao,
        valor,
        tipo,
        dataCadastro: new Date().toISOString().split("T")[0],
        dataPagamento,
        statusPagamento // Novo campo adicionado
    };

    // Adiciona a transação ao array e salva no localStorage
    transactions.push(transacao);
    salvarTransacoes();
    atualizarTransacoes();

    // Limpa os campos do formulário após adicionar
    document.getElementById("descricao").value = '';
    document.getElementById("valor").value = '';
    document.getElementById("tipo").value = 'ganho';
    document.getElementById("data-pagamento").value = '';
    document.getElementById("status-pagamento").value = 'não pago';

    fecharPopup();
}



function atualizarTransacoes(listaTransacoes = transactions) {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpenses = 0;

    listaTransacoes.forEach((transacao) => {
        const transacaoDiv = document.createElement("div");
        transacaoDiv.classList.add("transacao");

        transacaoDiv.innerHTML = `
            <div class="info">
                <h4>${transacao.descricao}</h4>
                <p>${transacao.tipo === "ganho" ? "Income" : "Expense"}</p>
                <p>Data de Cadastro: ${new Date(transacao.dataCadastro).toLocaleDateString("pt-BR")}</p>
                <p>Data de Pagamento: ${new Date(transacao.dataPagamento).toLocaleDateString("pt-BR")}</p>
                <p>Status: ${transacao.statusPagamento === "pago" ? "✅ Pago" : "❌ Não Pago"}</p>
            </div>
            <div class="valor ${transacao.tipo === "ganho" ? "positivo" : "negativo"}">
                ${transacao.tipo === "ganho" ? "+" : "-"} ${formatarMoeda(transacao.valor)}
            </div>
            <button class="ver-detalhes" onclick="verDetalhesTransacao(${transacao.id})">Ver Detalhes</button>
            <button class="remover" onclick="removerTransacao(${transacao.id})">X</button>
        `;

        transactionList.appendChild(transacaoDiv);

        // Atualiza o total de ganhos e despesas
        if (transacao.tipo === "ganho") {
            totalIncome += transacao.valor;
        } else {
            totalExpenses += transacao.valor;
        }
    });

    // Atualiza os totais no cabeçalho
    document.getElementById("total-income").innerText = formatarMoeda(totalIncome);
    document.getElementById("total-expenses").innerText = formatarMoeda(totalExpenses);
    document.getElementById("total-balance").innerText = formatarMoeda(totalIncome - totalExpenses);
}




// Função para remover uma transação
function removerTransacao(id) {
    transactions = transactions.filter(transacao => transacao.id !== id);
    salvarTransacoes();
    atualizarTransacoes();
    fecharDetalhePopup(); // Fecha o pop-up de detalhes, se estiver aberto
}




// Função para exibir detalhes de uma transação no pop-up
function verDetalhesTransacao(id) {
    const transacao = transactions.find(t => t.id === id);
    if (transacao) {
        document.getElementById("detalhe-descricao").innerText = transacao.descricao;
        document.getElementById("detalhe-valor").innerText = formatarMoeda(transacao.valor);
        document.getElementById("detalhe-tipo").innerText = transacao.tipo === "ganho" ? "Ganho" : "Despesa";
        document.getElementById("detalhe-data-cadastro").innerText = new Date(transacao.dataCadastro).toLocaleDateString("pt-BR");
        document.getElementById("detalhe-data-pagamento").innerText = new Date(transacao.dataPagamento).toLocaleDateString("pt-BR");
        document.getElementById("detalhe-status").innerText = transacao.statusPagamento === "pago" ? "✅ Pago" : "❌ Não Pago";

        detalheTransacaoID = id;
        document.getElementById("detalhe-popup").style.display = "flex";
    }
}

// Função para fechar o pop-up de detalhes
function fecharDetalhePopup() {
    document.getElementById("detalhe-popup").style.display = "none";
}

// Função para formatar valores como moeda BRL
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Carrega as transações ao iniciar o aplicativo
carregarTransacoes();
