const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];


const wordsInProgress = function(word) {
    const eachLetter = [];
 for (const letter of word) {
     console.log(letter);
     eachLetter.push("●")
 }
 wordInProgress.innerText = eachLetter.join("");
};

wordsInProgress(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
      message.innerText = "";
    const guessInput = letterInput.value;
    //console.log(guessInput)
    const goodGuess = validateInput(guessInput);

    if (goodGuess) {
        makeGuess(guessInput);
    }
    letterInput.value = "";    
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please guess a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please guess just one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please guess a letter from A-Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guessInput) {
    guessInput = guessInput.toUpperCase();

    if (guessedLetters.includes(guessInput)) {
        message.innerText = "You already guessed that letter, silly. Try again!";
    } else {
        guessedLetters.push(guessInput);
        console.log(guessedLetters);
    }
};