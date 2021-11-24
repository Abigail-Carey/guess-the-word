const guessesLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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
    const guessInput = letterInput.value;
    console.log(guessInput)
    letterInput.value = "";
})