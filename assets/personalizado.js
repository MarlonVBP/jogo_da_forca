const alertMessage = document.querySelector(".alert-message");
const alertTitle = document.querySelector(".alert-title");

function verificarDados() {
 let palavra = document.querySelector(".palavra").value;
 let dica = document.querySelector(".dica").value;
 let mensagem;

 if (!palavra || !dica) {
  mensagem = 'Digite uma palavra e dica!!'
 } else if (palavra.includes(' ') || palavra.includes('-')) {
  mensagem = 'A palavra não pode conter espaços nem hífens'
 } else if (contemCaracteresEspeciais(palavra)) {
  mensagem = 'A palavra não pode conter caracteres especiais'
 } else {
  localStorage.setItem('personalizado', JSON.stringify({
   palavra: palavra,
   dica: dica
  }));

  setTimeout(function () {
   window.location.href = "./game.html";
  }, 100);
  return;
 }

 alertTitle.textContent = mensagem;
 exibirMensagem(true);
 setTimeout(() => {
  exibirMensagem(false);
 }, 2000)
}

function contemCaracteresEspeciais(s) {
 return /[^a-z\s]/g.test(s);
}

function exibirMensagem(bool) {
 if (bool) {
  alertMessage.classList.add('show');
  return;
 }
 alertMessage.classList.remove('show');
}
