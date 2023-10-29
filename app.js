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
        let playerChoice = logPlayerChoice(event);
        let computerChoice = decideAndlogComputerChoice();
        decideAndLogResult(playerChoice, computerChoice);
    }

    //start game
    if (event.target.classList.contains('play-game')) {
        startGame();
    }
});

function startGame() {
    if (checkRoundsInput()) {
        let numberRounds = noRounds.value;
        let playerScore = 0;
        let computerScore = 0;

        playerScoreContainer.innerText = playerScore;
        computerScoreContainer.innerText = computerScore;
    }
}

function checkRoundsInput() {
    if (noRounds.value === "") {
        roundNotice.innerText  = "Enter a valid number of rounds";
        return false;
    } else {
        roundNotice.textContent  = `Good luck! Best of ${noRounds.value} rounds.`;
        return true;
    }
}

function logPlayerChoice(event) {
    let playerChoice = event.target.textContent.toLowerCase();
    playerChoiceContainer.innerText = `You selected ${playerChoice}!`;
    return playerChoice;
}

function decideAndlogComputerChoice() {
    let computerChoice = randomChoice();
    computerChoiceContainer.innerText = `Computer selected ${computerChoice}!`;
    return computerChoice;
}

function randomChoice () {
    const possibleChoices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleChoices[randomIndex];
}

function decideAndLogResult (playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        resultContainer.innerText = "DRAW!";
    }

    
    switch (playerChoice) {
        case "rock":
            if (computerChoice === "Rock") {
                resultContainer.innerText = "DRAW!";
                return "resultDraw";
            } else if (computerChoice === "Paper") {
                resultContainer.innerText = "LOST!";
                return "resultComputer";
            } else if (computerChoice === "Scissors") {
                resultContainer.innerText = "WIN!";
                return "resultPlayer";
            }
            break;
        case "scissors":
            if (computerChoice === "Rock") {
                resultContainer.innerText = "LOST!";
                return "resultComputer";
            } else if (computerChoice === "Paper") {
                resultContainer.innerText = "WIN!";
                return "resultPlayer";
            } else if (computerChoice === "Scissors") {
                resultContainer.innerText = "DRAW!";
                return "resultDraw";
            }
            break;
        case "paper":
            if (computerChoice === "Rock") {
                resultContainer.innerText = "WIN!";
                return "resultPlayer";
            } else if (computerChoice === "Paper") {
                resultContainer.innerText = "DRAW!";
                return "resultDraw";
            } else if (computerChoice === "Scissors") {
                resultContainer.innerText = "LOST!";
                return "resultComputer";
            }
            break;
    }
}
    /*let i = 0;
        do {
            let playerChoice = prompt("Please enter your choice of rock, paper or" +
                " scissors");        
            playerChoice = playerChoice.toLowerCase();
            let computerChoice = randomChoice();
            let result = decideResult(playerChoice, computerChoice);
            
            //manage score
            if (result === "resultComputer") {
                computerScore += 1;
            }
            if (result === "resultPlayer") {
                playerScore += 1;
            }
            console.log("Player " + playerScore + " - " + computerScore + 
            " Computer");
            
            i++;
        } while (i < numberRounds);

        console.log("FINAL SCORE: Player " + playerScore + " - " + computerScore + 
            " Computer"); */