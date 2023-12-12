const hangmanImage = document.querySelector(".hangman-box img")
const wordDisplay = document.querySelector(".word-display")
const guessesText = document.querySelector(".guesses-text b")
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const novoJogoBtn = document.querySelector(".play-again");

let palavraSelecionada, letrasCorretas, contadorDeErros;
const maximoDeErros = 6;
const resetGame = () => {
 // Resetando todas as variaveis
 letrasCorretas = [];
 contadorDeErros = 0;
 hangmanImage.src = `assets/images/hangman-${contadorDeErros}.svg`;
 guessesText.innerText = `${contadorDeErros} / ${maximoDeErros}`;
 keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
 wordDisplay.innerHTML = palavraSelecionada.split("").map(() => `<li class="letter"></li>`).join("");
 gameModal.classList.remove("show");
}

// Pegando uma palavra e uma dica aleatoriamente
const getRandomWord = () => {
 const { palavra, dica } = !localStorage.getItem('personalizado') ? listaPalavras[Math.floor(Math.random() * listaPalavras.length)] : JSON.parse(localStorage.getItem('personalizado'));
 localStorage.clear();
 palavraSelecionada = palavra;
 console.log(palavra);
 document.querySelector(".hint-text b").innerText = dica;
 resetGame();
}

const fimDeJogo = (ganhou) => {
 // Mostrando o modal de fim de jogo com o conteúdo dinâmico de acondo com a vitória ou derrota
 setTimeout(() => {
  const modalText = ganhou ? `Você achou a palavra: ` : `A palavra correta era: `
  gameModal.querySelector("img").src = `assets/images/${ganhou ? 'victory' : 'lost'}.gif`;
  gameModal.querySelector("h4").innerText = `${ganhou ? 'Parabéns!!!' : 'Você perdeu ;-; !!!'}`;
  gameModal.querySelector("p").innerHTML = `${modalText}<b>${palavraSelecionada}</b>`;
  gameModal.classList.add("show");
 }, 300)
}

const inicarJogo = (button, clickedLetter) => {
 if (palavraSelecionada.includes(clickedLetter)) {
  // Exibindo a letra corretamente selecionadas na tela
  [...palavraSelecionada].forEach((letter, index) => {
   if (letter === clickedLetter) {
    letrasCorretas.push(letter)
    wordDisplay.querySelectorAll("li")[index].innerText = letter;
    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
   }
  })
 } else {
  // Atualizando a imagem quando houver erro
  contadorDeErros = (contadorDeErros == 6) ? 6 : contadorDeErros + 1;
  hangmanImage.src = `assets/images/hangman-${contadorDeErros}.svg`;
  guessesText.innerText = `${contadorDeErros} / ${maximoDeErros}`;
 }

 button.disabled = true;

 // Verificando sucesso é fracasso do jogador
 if (contadorDeErros === maximoDeErros) return fimDeJogo(false);
 if (letrasCorretas.length === palavraSelecionada.length) return fimDeJogo(true);
}

// Criando os botões do teclado e adicionando o evento de click
for (let i = 0; i < 26; i++) {
 const button = document.createElement("button");
 button.innerText = String.fromCharCode(97 + i);
 keyboardDiv.appendChild(button);
 button.addEventListener("click", e => inicarJogo(e.target, String.fromCharCode(97 + i)));
}

getRandomWord();

novoJogoBtn.addEventListener("click", getRandomWord);