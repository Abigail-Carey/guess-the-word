const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordsInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const spanGuessRemains = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];
 
const placeholder = function (word) {
    const individualDots = [];
    for (const letter of word) {
        console.log(letter);
        individualDots.push("●");
    }
    wordsInProgress.innerText = individualDots.join("");
};

placeholder(word);

guessButton.addEventListener("click",  function (e) {
    e.preventDefault();
    // empty message here
    message.innerText = "";
    // grab answer that was entered into input
    const guess = letterInput.value;
    
    // make sure it's a single letter
    const goodGuess = validatedInput(guess);

    if (goodGuess) {
    // We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validatedInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a guess!";
    } else if (input.length > 1) {
        message.innerText = "Only one guess at a time!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "A-Z letters only, please!";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter, silly!";   
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showLettersGuessed();
        updateWordInProgress(guessedLetters);
    } 
};

const showLettersGuessed = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●")
        }
    }
    wordsInProgress.innerText = revealWord.join("");
    didIWin();
};

const didIWin = function () {
    if (word.toUpperCase() === wordsInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class ="highlight">You guessed the correct word! Congrats!</p>`
    }
};