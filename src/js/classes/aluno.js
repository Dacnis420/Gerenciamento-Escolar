class Aluno {
    constructor(gerenciadorTurmas) {
        this.alunos = [];
        this.gerenciadorTurmas = gerenciadorTurmas; 
    }

    adicionarAluno() {
        let matricula = Number(document.getElementById("inputmatricula").value);
        let nomeAluno = document.getElementById("inputnomeAluno").value;
        let turmaSelecionada = document.getElementById("selectTurma").value;
        
        // Validações
        if (isNaN(matricula)) {
            alert("Apenas números são aceitos na matrícula");
            document.getElementById("inputmatricula").focus();
            return;
        }

        if (nomeAluno === "") {
            alert('Por favor, digite o nome do aluno!');
            document.getElementById("inputnomeAluno").focus();
            return;
        }

        if (turmaSelecionada === "") {
            alert('Por favor, selecione uma turma!');
            return;
        }

        let numeroTurma = Number(turmaSelecionada);

        const turma = this.gerenciadorTurmas.turmas.find(t => t.numero === numeroTurma);
        if (!turma) {
            alert('Turma selecionada não existe!');
            return;
        }

        let aluno = {
           matricula: matricula,
           nome: nomeAluno,
           turma: numeroTurma, 
           nomeTurma: turma.nome 
        };

        this.alunos.push(aluno);
        alert(`ALUNO: ${aluno.nome} - Matrícula: ${aluno.matricula} - Turma: ${turma.nome} ADICIONADO!`);
        
        this.atualizarAluno();
        this.limparCampos();
    }


    removerAluno(index) {
        if (confirm("Tem certeza que deseja remover este aluno?")) {
            const alunoRemovido = this.alunos.splice(index, 1)[0];
            alert(`Aluno ${alunoRemovido.nome} removido com sucesso!`);
            this.atualizarAluno();
        }
    }



    getInfo(matricula) {
        const aluno = this.alunos.find(a => a.matricula === matricula);
        if (aluno) {
            return `Matrícula: ${aluno.matricula} - Nome: ${aluno.nome} - Turma: ${aluno.nomeTurma}`;
        }
        return "Aluno não encontrado";
    }

    atualizarAluno() {
        const tabelaAluno = document.getElementById("tabelaAluno");
        tabelaAluno.innerHTML = '';

        if (this.alunos.length === 0) {
            tabelaAluno.innerHTML = '<tr><td colspan="4">Nenhum aluno encontrado</td></tr>';
            return;
        }

        this.alunos.forEach((aluno, index) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.nomeTurma}</td> <!-- ✅ Mostra a turma -->
                <td>
                    <button class="btn-remover" onclick="gerenciadorAlunos.removerAluno(${index})">
                        🗑️ Remover
                    </button>
                </td>
            `;
            tabelaAluno.appendChild(linha);
        });
    }

    atualizarSelectTurmas() {
        const selectTurma = document.getElementById("selectTurma");
        selectTurma.innerHTML = '<option value="">Selecione uma turma</option>';
        
        this.gerenciadorTurmas.turmas.forEach(turma => {
            const option = document.createElement('option');
            option.value = turma.numero;
            option.textContent = `${turma.numero} - ${turma.nome}`;
            selectTurma.appendChild(option);
        });
    }

    limparCampos() {
        document.getElementById("inputnomeAluno").value = "";
        document.getElementById("inputmatricula").value = "";
        document.getElementById("inputnomeAluno").focus();
    }
}