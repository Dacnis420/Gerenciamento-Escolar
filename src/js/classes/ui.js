
function mostrarSecao(secao) {
   
    document.querySelectorAll('.section').forEach(s => {
        s.classList.add('hidden');
    });
    
  
    document.getElementById(`secao-${secao}`).classList.remove('hidden');
    
    document.querySelectorAll('.tabela-container').forEach(t => {
        t.classList.add('hidden');
    });
}

function toggleTabela(tabelaId) {
    const container = document.getElementById(`${tabelaId}-container`);
    container.classList.toggle('hidden');
    

    if (!container.classList.contains('hidden')) {
        switch(tabelaId) {
            case 'tabelaTurma':
                gerenciadorTurmas.atualizarTurma();
                break;
            case 'tabelaAluno':
                gerenciadorAlunos.atualizarAluno();
                break;
            case 'tabelaNotas':
                gerenciadorNotas.atualizarNotas();
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {

    mostrarSecao('turmas');
});