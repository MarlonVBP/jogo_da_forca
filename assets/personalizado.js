window.addEventListener('load', () => {
  document.querySelector('.main').classList.add('show');
});

const alertMessage = document.querySelector(".alert-message");
const alertTitle = document.querySelector(".alert-title");

function verifyData() {
  const wordInput = document.querySelector(".word").value.toLowerCase().trim();
  const hintInput = document.querySelector(".hint").value.toLowerCase().trim();
  let message;

  if (!wordInput || !hintInput) {
    message = 'Type a word and a hint!!';
  } else if (wordInput.includes(' ') || wordInput.includes('-')) {
    message = 'The word cannot contain spaces or hyphens';
  } else if (containsSpecialCharacters(wordInput)) {
    message = 'The word cannot contain special characters';
  } else {
    sessionStorage.setItem('custom', JSON.stringify({
      word: wordInput,
      hint: hintInput
    }));

    setTimeout(() => {
      window.location.href = "./game.html";
    }, 100);
    return;
  }

  displayAlert(message);
}

function containsSpecialCharacters(s) {
  return /[^a-z\s]/g.test(s);
}

function displayAlert(message) {
  alertTitle.textContent = message;
  showAlert(true);
  setTimeout(() => {
    showAlert(false);
  }, 2000);
}

function showAlert(displayMessage) {
  alertMessage.classList.toggle('show', displayMessage);
}