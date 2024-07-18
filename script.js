function mostrarConteudo(id) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        if (section.id === id) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function atualizarEstiloAlunos() {
    const alunos = document.querySelectorAll('#alunoList li');
    alunos.forEach(aluno => {
        const texto = aluno.textContent;
        const dataContrato = texto.match(/Vencimento do Contrato: (\d{4}-\d{2}-\d{2})/)[1];
        const dataVencimento = new Date(dataContrato);
        const hoje = new Date();
        const diffTime = dataVencimento - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        aluno.classList.remove('vencido', 'quase-vencido');

        if (diffDays < 0) {
            aluno.classList.add('vencido');
        } else if (diffDays <= 2) {
            aluno.classList.add('quase-vencido');
        }
    });
}

function atualizarFaturamento() {
    const alunos = document.querySelectorAll('#alunoList li');
    let totalReceitas = 0;
    alunos.forEach(aluno => {
        const texto = aluno.textContent;
        const taxaMensal = parseFloat(texto.match(/Taxa Mensal: R\$ (\d+\.?\d*)/)[1]);
        totalReceitas += taxaMensal;
    });

    const gastos = document.querySelectorAll('#gastoList li');
    let totalGastos = 0;
    gastos.forEach(gasto => {
        const valorGasto = parseFloat(gasto.textContent.match(/R\$ (\d+\.?\d*)/)[1]);
        totalGastos += valorGasto;
    });

    const faturamentoTotal = totalReceitas - totalGastos;
    document.getElementById('faturamentoTotal').textContent = `Total: R$ ${faturamentoTotal.toFixed(2)}`;
}

document.getElementById('alunoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const dataContrato = document.getElementById('dataContrato').value;
    const taxaMensal = document.getElementById('taxaMensal').value;

    const listItem = document.createElement('li');
    listItem.textContent = `Nome: ${nome}, Vencimento do Contrato: ${dataContrato}, Taxa Mensal: R$ ${taxaMensal}`;

    document.getElementById('alunoList').appendChild(listItem);

    atualizarEstiloAlunos();
    
    atualizarFaturamento();

    document.getElementById('nome').value = '';
    document.getElementById('dataContrato').value = '';
    document.getElementById('taxaMensal').value = '';
});


document.getElementById('gastoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valorGasto = document.getElementById('valorGasto').value;

    const listItem = document.createElement('li');
    listItem.textContent = `${descricao}: R$ ${valorGasto}`;

    document.getElementById('gastoList').appendChild(listItem);

    atualizarFaturamento();

    document.getElementById('descricao').value = '';
    document.getElementById('valorGasto').value = '';
});

document.addEventListener('DOMContentLoaded', atualizarEstiloAlunos);
document.addEventListener('DOMContentLoaded', atualizarFaturamento);
