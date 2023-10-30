const centreContainer = document.querySelector('.centre-container');
const header = document.querySelector('.header');
const roundNotice = document.querySelector('.rounds');
const noRounds = document.querySelector('.rounds-input');
const playerScoreContainer = document.querySelector('.player-score');
const computerScoreContainer = document.querySelector('.computer-score');
const resultContainer = document.querySelector('.result');
const playerChoiceContainer = document.querySelector('.player-choice');
const computerChoiceContainer = document.querySelector('.computer-choice');

document.addEventListener('click', function(event) {

    if (event.target.classList.contains('selection-button')) {
        let numberRounds = noRounds.value;
        let playerScore = 0;
        let computerScore = 0; 
        let i = 0;    
        
        if (numberRounds === "") {
            playerScoreContainer.innerText = "Enter a valid number of rounds";
        
        } else {

            do {
                let playerChoice = logPlayerChoice(event);
                let computerChoice = decideAndlogComputerChoice();
                let result = decideResult(playerChoice, computerChoice);
                logResult(result);   
                
                //manage score
                if (result === "defeat") {
                    computerScore += 1;                    
                    computerScoreContainer.innerText = computerScore;
                }
                if (result === "win") {
                    playerScore += 1;
                    playerScoreContainer.innerText = playerScore;
                }
                
                i++;
            
            } while (i < numberRounds);

        }
    }

    //start game
    if (event.target.classList.contains('play-game')) {
        startGame();
    }
});

function startGame() {
    if (checkRoundsInput()) {

        let numberRounds = noRounds.value;
        roundNotice.textContent  = `Good luck! First to ${numberRounds} wins!`;
        let playerScore = 0;
        let computerScore = 0;
        playerScoreContainer.innerText = playerScore;
        computerScoreContainer.innerText = computerScore;
        return numberRounds  
    
    } else {        
        roundNotice.innerText  = "Enter a valid number of rounds";
    }
}

function checkRoundsInput() {
    if (noRounds.value === "") {        
        return false;
    } else {        
        return true;
    }
}

function logPlayerChoice(event) {
    let playerChoice = event.target.textContent.toLowerCase();
    playerChoiceContainer.innerText = `You selected ${playerChoice}...`;
    return playerChoice;
}

function decideAndlogComputerChoice() {
    let computerChoice = randomChoice();
    computerChoiceContainer.innerText = `Computer selected ${computerChoice}...`;
    return computerChoice;
}

function randomChoice () {
    const possibleChoices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleChoices[randomIndex];
}

function decideResult (playerChoice, computerChoice) {
    //draw case
    if (playerChoice === computerChoice) {
        resultContainer.innerText = "draw";
        return "draw"
    }
    
    switch (playerChoice) {
        case "rock":
            if (computerChoice === "paper") {
                return "defeat";
            } else if (computerChoice === "scissors") {
                return "win";
            }
            break;
        case "scissors":
            if (computerChoice === "rock") {
                return "defeat";
            } else if (computerChoice === "paper") {
                return "win";
            }
            break;
        case "paper":
            if (computerChoice === "rock") {
                return "win";
            } else if (computerChoice === "scissors") {
                return "defeat";
            }
            break;
    }
}

function logResult(result) {
    resultContainer.innerText = `It's a ${result}!`;

}
