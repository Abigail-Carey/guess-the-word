const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordsInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const spanGuessRemains = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8; 

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const grabRandomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[grabRandomWord].trim();
    placeholder(word);
};

// start off game
getWord();
 
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
        countGuessesRemaining(guess);
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

const countGuessesRemaining = function (guess) {
    const upperCaseWord = word.toUpperCase();
    if (!upperCaseWord.includes(guess)) {
        message.innerText = `Sorry, not the right letter. Try again!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Hey, good job! You got one!`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `GAME OVER! The word was <span class=highlight>${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        spanGuessRemains.innerText = `1 last chance...`;
    } else {
        spanGuessRemains.innerText = `${remainingGuesses} guesses remaining.`;
    }
};

const didIWin = function () {
    if (word.toUpperCase() === wordsInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    guessesRemaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    spanGuessRemains.innerText = `${remainingGuesses} guesses.`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    // grab new word for new game
    getWord();

    guessButton.classList.remove("hide");
    guessesRemaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});

