function abrirPopup(tipo) {
    document.getElementById(`popup-${tipo}`).style.display = 'flex';
}

function fecharPopup(tipo) {
    document.getElementById(`popup-${tipo}`).style.display = 'none';
}

function adicionarRegistro(tipo) {
    let descricao, valor;

    if (tipo === 'despesa') {
        descricao = document.getElementById('descricao-despesa').value;
        valor = document.getElementById('valor-despesa').value;
    } else {
        descricao = document.getElementById('descricao-ganho').value;
        valor = document.getElementById('valor-ganho').value;
    }

    if (descricao && valor) {
        const tabela = document.getElementById('tabela-financeira').getElementsByTagName('tbody')[0];
        const novaLinha = tabela.insertRow();

        const celulaTipo = novaLinha.insertCell(0);
        const celulaDescricao = novaLinha.insertCell(1);
        const celulaValor = novaLinha.insertCell(2);

        celulaTipo.innerHTML = tipo === 'despesa' ? 'Despesa' : 'Ganho';
        celulaDescricao.innerHTML = descricao;
        celulaValor.innerHTML = `R$ ${parseFloat(valor).toFixed(2)}`;

        fecharPopup(tipo);

        // Limpar os campos de entrada
        if (tipo === 'despesa') {
            document.getElementById('descricao-despesa').value = '';
            document.getElementById('valor-despesa').value = '';
        } else {
            document.getElementById('descricao-ganho').value = '';
            document.getElementById('valor-ganho').value = '';
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}
