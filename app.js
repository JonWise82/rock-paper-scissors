const centreContainer = document.querySelector('.centre-container');
const header = document.querySelector('.header');
const roundNotice = document.querySelector('.rounds');
const noRounds = document.querySelector('.rounds-input');
const playerScoreContainer = document.querySelector('.player-score');
const computerScoreContainer = document.querySelector('.computer-score');
const resultContainer = document.querySelector('.result');
const playerChoiceContainer = document.querySelector('.player-choice');
const computerChoiceContainer = document.querySelector('.computer-choice');
const roundsRemaining = document.querySelector('.rounds-remaining');
let roundsClicked = 0;
let playerScore = 0;
let computerScore = 0;
let numberRounds = 0;

document.addEventListener('click', function(event) {

    //start game
    if (event.target.classList.contains('play-game')) {
        checkAndLogNoRounds();
        resetGlobalVariables();
    }

    if (event.target.classList.contains('selection-button')) {
        roundsClicked++        
        if (roundsClicked < numberRounds) {
            let result = runRoundAndReturnResult(event);
            manageScore(result);
                
        } else if (roundsClicked === numberRounds) {
            let result = runRoundAndReturnResult(event);
            manageScore(result)
            logFinalResult();
     
        } else if (roundsClicked > numberRounds) {
            roundNotice.innerText  = "Please restart the game.";
        }
    }   
});

function checkAndLogNoRounds() {    
    numberRounds = +noRounds.value;
    if (numberRounds === "") {
        roundNotice.innerText  = "Enter a valid number of rounds";
    } else {        
        roundNotice.textContent  = `Good luck! Best of ${numberRounds} rounds!`;
    }
}

function resetGlobalVariables () {
    playerScore = 0;
    computerScore = 0;
    playerScoreContainer.innerText = playerScore;
    computerScoreContainer.innerText = computerScore;
    playerChoiceContainer.innerText = "";
    computerChoiceContainer.innerText = "";
    resultContainer.innerText = "";
    roundsRemaining.innerText = "";
    roundsClicked = 0;
} 


function checkRoundsInput() {
    if (noRounds.value === "") {        
        return false;
    } else {        
        return true;
    }
}

function runRoundAndReturnResult (event) {    
    //get and log player choice
    let playerChoice = event.target.textContent.toLowerCase();
    playerChoiceContainer.innerText = `You selected ${playerChoice}...`;

    //choose and log computer choice
    const possibleChoices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = possibleChoices[randomIndex];    
    computerChoiceContainer.innerText = `Computer selected ${computerChoice}...`;
    
    const result = decideResult(playerChoice, computerChoice);
    return result;
}

function decideResult (playerChoice, computerChoice) {
    //draw case
    if (playerChoice === computerChoice) {
        resultContainer.innerText = "DRAW!";
        return "draw"
    }
    
    switch (playerChoice) {
        case "rock":
            if (computerChoice === "paper") {                
                resultContainer.innerText = "DEFEAT!";
                return "defeat";
            } else if (computerChoice === "scissors") {                
                resultContainer.innerText = "WIN!";
                return "win";
            }
            break;
        case "scissors":
            if (computerChoice === "rock") {                
                resultContainer.innerText = "DEFEAT!";
                return "defeat";
            } else if (computerChoice === "paper") {                
                resultContainer.innerText = "WIN!";
                return "win";
            }
            break;
        case "paper":
            if (computerChoice === "rock") {
                resultContainer.innerText = "WIN!";
                return "win";                
            } else if (computerChoice === "scissors") {
                resultContainer.innerText = "DEFEAT!";
                return "defeat";                
            }
            break;
    }
}

function manageScore(result) {
    if (result === "defeat") {
        computerScore += 1;                    
        computerScoreContainer.innerText = computerScore;
    }
    if (result === "win") {
        playerScore += 1;
        playerScoreContainer.innerText = playerScore;
    }

    roundsRemaining.innerText = `There are ${numberRounds - roundsClicked} rounds remaining`;
}


function logFinalResult () {
    if (playerScore > computerScore) {
        roundNotice.innerText  = "YOU WIN! WELL DONE";
    } else if (computerScore > playerScore) {
        roundNotice.innerText  = "YOU LOSE! TRY AGAIN";
    } else {
        roundNotice.innerText  = "IT'S A DRAW! TRY AGAIN";
    }  
} 






