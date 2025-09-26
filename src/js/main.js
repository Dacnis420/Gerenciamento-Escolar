
const gerenciadorTurmas = new Turma();
const gerenciadorAlunos = new Aluno(gerenciadorTurmas);
const gerenciadorNotas = new Notas(gerenciadorAlunos);


window.gerenciadorTurmas = gerenciadorTurmas;
window.gerenciadorAlunos = gerenciadorAlunos;
window.gerenciadorNotas = gerenciadorNotas;


window.mostrarSecao = mostrarSecao;
window.toggleTabela = toggleTabela;

console.log("✅ Sistema escolar inicializado!");