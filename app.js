function abrirPopup(tipo) {
    document.getElementById(`popup-${tipo}`).style.display = 'flex';
}

function fecharPopup(tipo) {
    document.getElementById(`popup-${tipo}`).style.display = 'none';
}

function cadastrarTransacao(tipo) {
    const descricao = document.getElementById(`descricao-${tipo}`).value;
    const valor = parseFloat(document.getElementById(`valor-${tipo}`).value);

    if (descricao && !isNaN(valor)) {
        console.log(`Tipo: ${tipo}, Descrição: ${descricao}, Valor: ${valor}`);
        fecharPopup(tipo);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
