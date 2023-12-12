function verificarDados() {
 let palavra = document.querySelector(".palavra").value;
 let dica = document.querySelector(".dica").value;

 if ((palavra && dica) && !contemCaracteresEspeciais(palavra) && !palavra.includes(' ') && !palavra.includes('-')) {
  localStorage.setItem('personalizado', JSON.stringify({
   palavra: palavra,
   dica: dica
  }));
  setTimeout(function () {
   window.location.href = "./game.html";
  }, 100);
 }
}
function contemCaracteresEspeciais(s) {
 return /[^a-z\s]/g.test(s);
}