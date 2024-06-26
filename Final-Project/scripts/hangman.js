// Array of words for the Hangman game
const words = ["javascript", "hangman", "computer", "programming", "elephant", "apple", "banana", "penguin"];

let chosenWord = "";
let wordDisplay = [];
let guessesLeft = 6;
let correctGuesses = [];
let incorrectGuesses = [];

// Function to start a new game
function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay = Array(chosenWord.length).fill("_");
    guessesLeft = 6;
    correctGuesses = [];
    incorrectGuesses = [];

    updateDisplay();
}

// Function to update the display with current game state
function updateDisplay() {
    document.getElementById("wordDisplay").textContent = wordDisplay.join(" ");
    document.getElementById("guessesLeftSpan").textContent = guessesLeft;
    document.getElementById("correctGuessesSpan").textContent = correctGuesses.join(", ");
    document.getElementById("incorrectGuessesSpan").textContent = incorrectGuesses.join(", ");
}

// Function to handle a guessed letter or full word
function guessLetterOrWord() {
    let guess = document.getElementById("guessInput").value.toLowerCase().trim();

    if (guess.length === 1 && guess.match(/[a-z]/)) {
        guessLetter(guess);
    } else if (guess.length > 1 && guess.match(/[a-z]+/)) {
        guessWord(guess);
    } else {
        alert("Please enter a valid single letter or a valid word.");
    }

    // Clear input field after guessing
    document.getElementById("guessInput").value = "";
}

// Function to handle a guessed letter
function guessLetter(guess) {
    if (correctGuesses.includes(guess) || incorrectGuesses.includes(guess)) {
        alert("You already guessed that letter!");
        return;
    }

    if (chosenWord.includes(guess)) {
        correctGuesses.push(guess);
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                wordDisplay[i] = guess;
            }
        }
    } else {
        incorrectGuesses.push(guess);
        guessesLeft--;
    }

    updateDisplay();
    checkGameStatus();
}

// Function to handle a guessed full word
function guessWord(guess) {
    if (guess === chosenWord) {
        wordDisplay = chosenWord.split("");
        updateDisplay();
        endGame(true);
    } else {
        incorrectGuesses.push(guess);
        guessesLeft--;
        updateDisplay();
        checkGameStatus();
    }
}

// Function to check if the game is won or lost
function checkGameStatus() {
    if (wordDisplay.join("") === chosenWord) {
        endGame(true); // Guessed the word correctly
    } else if (guessesLeft === 0) {
        endGame(false); // Ran out of guesses
    }
}

// Function to end the game
function endGame(won) {
    let messageElement = document.getElementById("hangmanMessage");
    let playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.addEventListener("click", resetGame);

    if (won) {
        messageElement.textContent = "Congratulations! You guessed the word.";
    } else {
        messageElement.textContent = `You lose! The word was "${chosenWord}". Try again!`;
    }

    // Append play again button
    messageElement.appendChild(document.createElement("br"));
    messageElement.appendChild(playAgainButton);
}

// Function to reset the game
function resetGame() {
    document.getElementById("guessInput").value = "";
    startGame();
}

// Initialize game when the page loads
startGame();
