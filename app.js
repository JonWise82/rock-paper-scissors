// Define constants for repeated string values
const RESULTS = {
    WIN: "WIN!",
    DEFEAT: "DEFEAT!",
    DRAW: "DRAW!",
  };

const CHOICES = ["rock", "paper", "scissors"];

// Function to get DOM elements
function getDomElements() {
    return {
        centreContainer: document.querySelector('.centre-container'),
        header: document.querySelector('.header'),
        roundNotice: document.querySelector('.rounds'),
        noRounds: document.querySelector('.rounds-input'),
        playerScoreContainer: document.querySelector('.player-score'),
        computerScoreContainer: document.querySelector('.computer-score'),
        resultContainer: document.querySelector('.result'),
        playerChoiceContainer: document.querySelector('.player-choice'),
        computerChoiceContainer: document.querySelector('.computer-choice'),
        roundsRemaining: document.querySelector('.rounds-remaining'),
    };
}
  
// Store all elements in a variable
const dom = getDomElements();

let roundsClicked = 0;
let playerScore = 0;
let computerScore = 0;
let numberRounds = 0;

// Event delegation on the container
document.body.addEventListener('click', handleContainerClick);

function handleContainerClick(event) {
    if (event.target.classList.contains('play-game')) {
        startGame();
    } else if (event.target.classList.contains('selection-button')) {
        playRound(event);
    }
}

function startGame() {
    if (validateAndSetRounds()) {
        resetGame();
    }
}

function validateAndSetRounds() {    
    numberRounds = +dom.noRounds.value;
    if (numberRounds === "") {
        dom.roundNotice.innerText  = "Enter a valid number of rounds";
        return false;
    } else {        
        dom.roundNotice.textContent  = `Good luck! Best of ${numberRounds} rounds!`;
        return true;
    }
}

function resetGame () {
    playerScore = 0;
    computerScore = 0;
    dom.playerScoreContainer.innerText = playerScore;
    dom.computerScoreContainer.innerText = computerScore;
    dom.playerChoiceContainer.innerText = "";
    dom.computerChoiceContainer.innerText = "";
    dom.resultContainer.innerText = "";
    dom.roundsRemaining.innerText = "";
    roundsClicked = 0;
}

function playRound(event) {
    roundsClicked++;
    if (roundsClicked <= numberRounds) {
        const result = runRound(event.target.textContent.toLowerCase());
        updateScores(result);
    if (roundsClicked === numberRounds) {
        endGame();
    }
    } else {
      dom.roundNotice.innerText = "Please restart the game.";
    }
}

function runRound (event) {    
    //get and log player choice
    const playerChoice = event;
    dom.playerChoiceContainer.innerText = `You selected ${playerChoice}...`;

    //choose and log computer choice
    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = CHOICES[randomIndex];    
    dom.computerChoiceContainer.innerText = `Computer selected ${computerChoice}...`;
    
    const result = decideResult(playerChoice, computerChoice);
    return result;
}


function decideResult (playerChoice, computerChoice) {
    //draw case
    if (playerChoice === computerChoice) {
        dom.resultContainer.innerText = RESULTS.DRAW;
        return RESULTS.DRAW
    }
    
    switch (playerChoice) {
        case "rock":
            if (computerChoice === "paper") {                
                dom.resultContainer.innerText = RESULTS.DEFEAT;
                return RESULTS.DEFEAT;
            } else if (computerChoice === "scissors") {                
                dom.resultContainer.innerText = RESULTS.WIN;
                return RESULTS.WIN;
            }
            break;
        case "scissors":
            if (computerChoice === "rock") {                
                dom.resultContainer.innerText = RESULTS.DEFEAT;
                return RESULTS.DEFEAT;
            } else if (computerChoice === "paper") {                
                dom.resultContainer.innerText = RESULTS.WIN;
                return RESULTS.WIN;
            }
            break;
        case "paper":
            if (computerChoice === "rock") {
                dom.resultContainer.innerText = RESULTS.WIN;
                return RESULTS.WIN;                
            } else if (computerChoice === "scissors") {
                dom.resultContainer.innerText = RESULTS.DEFEAT;
                return RESULTS.DEFEAT;                
            }
            break;
    }
}

function updateScores(result) {
    if (result === RESULTS.DEFEAT) {
        computerScore++;                    
        dom.computerScoreContainer.innerText = computerScore;
    }
    if (result === RESULTS.WIN) {
        playerScore++;
        dom.playerScoreContainer.innerText = playerScore;
    }

    dom.roundsRemaining.innerText = `There are ${numberRounds - roundsClicked} rounds remaining`;
}

function endGame() {
    const finalMessage = playerScore > computerScore
      ? "YOU WIN! WELL DONE"
      : computerScore > playerScore
      ? "YOU LOSE! TRY AGAIN"
      : "IT'S A DRAW! TRY AGAIN";
    dom.roundNotice.innerText = finalMessage;
  }






