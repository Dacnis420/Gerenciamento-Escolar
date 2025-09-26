class Turma {
    constructor() {
        this.turmas = [];
    }

    getInfo(numeroTurma) {
        const turma = this.turmas.find(t => t.numero === numeroTurma);
        if (turma) {
            return `CURSO ${turma.numero} - NOME ${turma.nome}`;
        }
        return "Turma não encontrada";
    }

    adicionarTurma() {
        let numeroTurma = Number(document.getElementById("inputnumero").value);
        let nomeTurma = document.getElementById("inputnomeTurma").value;

        if (isNaN(numeroTurma)) {
            alert("Só números são aceitos");
            document.getElementById("inputnumero").focus();
            return;
        }

        if (nomeTurma === "") {
            alert("Digite o nome do curso");
            document.getElementById("inputnomeTurma").focus();
            return;
        }

        let turma = {
            numero: numeroTurma,
            nome: nomeTurma
        };

        this.turmas.push(turma);
        alert(`${turma.nome} Número ${turma.numero} ADICIONADA !!`);
        
        document.getElementById("inputnumero").value = "";
        document.getElementById("inputnomeTurma").value = "";
        this.atualizarTurma();
    }

    removerTurma(index) {
        const turmaRemovida = this.turmas.splice(index, 1)[0]; 
        alert(`Turma ${turmaRemovida.nome} removida !!`); 
        this.atualizarTurma();
    }

    atualizarTurma() {
        const tabelaTurma = document.getElementById("tabelaTurma");
        tabelaTurma.innerHTML = "";

        if (this.turmas.length === 0) {
            tabelaTurma.innerHTML = '<tr><td colspan="3">Nenhuma turma encontrada</td></tr>';
            return;
        }

        this.turmas.forEach((turma, index) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${turma.numero}</td> 
                <td>${turma.nome}</td>
                <td> 
                    <button class="btn-remover" onclick="gerenciadorTurmas.removerTurma(${index})"> 
                    🗑️ Remover
                    </button>  
                </td>
            `;
            tabelaTurma.appendChild(linha);
        });
    }
}
