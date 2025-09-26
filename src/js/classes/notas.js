class Notas {
    constructor(gerenciadorAlunos) {
        this.notas = [];
        this.gerenciadorAlunos = gerenciadorAlunos;
    }

    adicionarNotas() {
        let matricula = Number(document.getElementById("selectMatricula").value);
        let av1 = Number(document.getElementById("inputav1").value);
        let av2 = Number(document.getElementById("inputav2").value);

        
        const aluno = this.gerenciadorAlunos.alunos.find(a => a.matricula === matricula);
        if (!aluno) {
            alert('Aluno não encontrado!');
            document.getElementById("selectMatricula").focus();
            return;
        }

        if (isNaN(matricula)) {
            alert("Apenas números são permitidos na matrícula");
            document.getElementById("selectMatricula").focus();
            return;
        }

        if (isNaN(av1) || av1 < 0 || av1 > 10) {
            alert("Digite uma nota AV1 válida (0 a 10)");
            document.getElementById("inputav1").focus();
            return;
        }

        if (isNaN(av2) || av2 < 0 || av2 > 10) {
            alert("Digite uma nota AV2 válida (0 a 10)");
            document.getElementById("inputav2").focus();
            return;
        }

        const media = (av1 + av2) / 2;
        const situacao = media >= 7 ? "Aprovado" : "Reprovado";

        let nota = {
            matricula: matricula,
            nomeAluno: aluno.nome,
            av1: av1,
            av2: av2,
            media: media,
            situacao: situacao
        };

        this.notas.push(nota);
        alert(`NOTAS DO ALUNO: ${aluno.nome} ADICIONADAS COM SUCESSO!`);

        this.atualizarNotas();
        this.limparCampos();
    }

    removerNotas(index) {
        if (confirm("Tem certeza que deseja remover estas notas?")) {
            const notaRemovida = this.notas.splice(index, 1)[0];
           alert(`Notas do aluno ${notaRemovida.nomeAluno} removidas com sucesso!`);
            this.atualizarNotas();
        }
    }

    calcularMedia(av1, av2) {
        return (av1 + av2) / 2;
    }

    verificarSituacao(media) {
        return media >= 7 ? "Aprovado" : "Reprovado";
    }

    atualizarNotas() {
        const tabelaNotas = document.getElementById("tabelaNotas");
        tabelaNotas.innerHTML = "";

        if (this.notas.length === 0) {
            tabelaNotas.innerHTML = '<tr><td colspan="6">Nenhuma nota encontrada</td></tr>';
            return;
        }

        this.notas.forEach((nota, index) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${nota.matricula}</td>
                <td>${nota.nomeAluno}</td>
                <td>${nota.av1.toFixed(1)}</td>
                <td>${nota.av2.toFixed(1)}</td>
                <td>${nota.media.toFixed(1)}</td>
                <td>${nota.situacao}</td>
                <td>
                    <button class="btn-remover" onclick="gerenciadorNotas.removerNotas(${index})">
                        🗑️ Remover
                    </button>
                </td>
            `;
            tabelaNotas.appendChild(linha);
        });
    }

    atualizarSelectMatriculas() {
        const selectMatricula = document.getElementById("selectMatricula");
        selectMatricula.innerHTML = '<option value="">Selecione uma matrícula</option>';
        
        this.gerenciadorAlunos.alunos.forEach(aluno => {
            const option = document.createElement('option');
            option.value = aluno.matricula;
            option.textContent = `${aluno.matricula} - ${aluno.nome}`;
            selectMatricula.appendChild(option);
        });
    }

    limparCampos() {
        document.getElementById("inputav1").value = "";
        document.getElementById("inputav2").value = "";
        document.getElementById("selectMatricula").focus();
    }
}