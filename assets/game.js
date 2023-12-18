window.addEventListener('load', () => {
 document.querySelector('.slide-in').classList.add('show');
});

const hangmanImage = document.querySelector(".hangman-box img")
const wordDisplay = document.querySelector(".word-display")
const guessesText = document.querySelector(".guesses-text b")
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const newGameBtn = document.querySelector(".play-again");

let selectedWord, LettersCorrect, errorCounter;
const maximumErrors = 6;
const resetGame = () => {
 // Resetting all variables
 LettersCorrect = [];
 errorCounter = 0;
 hangmanImage.src = `assets/images/hangman-${errorCounter}.svg`;
 guessesText.innerText = `${errorCounter} / ${maximumErrors}`;
 keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
 wordDisplay.innerHTML = selectedWord.split("").map(() => `<li class="letter"></li>`).join("");
 gameModal.classList.remove("show");
}

// Getting a word and a hint randomly
const getRandomWord = () => {
 const { word, hint } = !sessionStorage.getItem('custom') ? wordList[Math.floor(Math.random() * wordList.length)] : JSON.parse(sessionStorage.getItem('custom'));
 sessionStorage.clear();
 selectedWord = word;
 console.log(word);
 document.querySelector(".hint-text b").innerText = hint;
 resetGame();
}

const endGame = (isVictory) => {
 // Showing the end game modal with content according to victory or defeat
 setTimeout(() => {
  const modalText = isVictory ? `You found the word: ` : `The correct word was: `
  gameModal.querySelector("img").src = `assets/images/${isVictory ? 'victory' : 'lost'}.gif`;
  gameModal.querySelector("h4").innerText = `${isVictory ? 'Congratulations!!!' : 'You lost ;-; !!!'}`;
  gameModal.querySelector("p").innerHTML = `${modalText}<b>${selectedWord}</b>`;
  gameModal.classList.add("show");
 }, 300)
}

const startGame = (button, clickedLetter) => {
 if (selectedWord.includes(clickedLetter)) {
  // Displaying correctly selected letters on the screen
  [...selectedWord].forEach((letter, index) => {
   if (letter === clickedLetter) {
    LettersCorrect.push(letter)
    wordDisplay.querySelectorAll("li")[index].innerText = letter;
    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
   }
  })
 } else {
  // Updating the image when there's an error
  errorCounter = (errorCounter == 6) ? 6 : errorCounter + 1;
  hangmanImage.src = `assets/images/hangman-${errorCounter}.svg`;
  guessesText.innerText = `${errorCounter} / ${maximumErrors}`;
 }

 button.disabled = true;

 // Checking player's success or failure
 if (errorCounter === maximumErrors) return endGame(false);
 if (LettersCorrect.length === selectedWord.length) return endGame(true);
}

// Creating keyboard buttons and adding click event
for (let i = 0; i < 26; i++) {
 const button = document.createElement("button");
 button.innerText = String.fromCharCode(97 + i);
 keyboardDiv.appendChild(button);
 button.addEventListener("click", e => startGame(e.target, String.fromCharCode(97 + i)));
}

getRandomWord();

newGameBtn.addEventListener("click", getRandomWord);
