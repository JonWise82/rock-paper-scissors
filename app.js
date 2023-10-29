const centreContainer = document.querySelector('.centre-container');
const header = document.querySelector('.header');
const roundNotice = document.querySelector('.rounds');
let noRounds = document.querySelector('.rounds-input');

function checkRoundsInput() {
    if (noRounds.value === "") {
        roundNotice.innerText  = "Enter a valid number of rounds";
        return false;
    } else {
        roundNotice.textContent  = "Good luck! Best of " + 
        noRounds.value + " rounds.";
        return true;
    }
}

document.addEventListener('click', function(event) {

    if (event.target.classList.contains('selection-button')) {       
        const buttonText = event.target.textContent.toLowerCase();
        centreContainer.innerText = 'You selected ' + buttonText + '!';
    }

    //play game
    if (event.target.classList.contains('play-game')) {
        playGame();
    }
});

function playGame() {
    if (checkRoundsInput()) {

    }
}

function randomChoice () {
    let possibleChoices = ["Rock", "Paper", "Scissors"];
    let randomInteger = Math.floor(Math.random() * 3);
    return possibleChoices[randomInteger];
}

function decideResult (playerChoice, computerChoice) {
    switch (playerChoice) {
        case "rock":
            if (computerChoice === "Rock") {
                console.log("Computer chose rock, so it's a draw");
                return "resultDraw";
            } else if (computerChoice === "Paper") {
                console.log("Computer chose paper, so you lose");
                return "resultComputer";
            } else if (computerChoice === "Scissors") {
                console.log("Computer chose scissors, so you win!");
                return "resultPlayer";
            }
            break;
        case "scissors":
            if (computerChoice === "Rock") {
                console.log("Computer chose rock, so you lose");
                return "resultComputer";
            } else if (computerChoice === "Paper") {
                console.log("Computer chose paper, so you win!");
                return "resultPlayer";
            } else if (computerChoice === "Scissors") {
                console.log("Computer chose scissors, so it's a draw");
                return "resultDraw";
            }
            break;
        case "paper":
            if (computerChoice === "Rock") {
                console.log("Computer chose rock, so you win!");
                return "resultPlayer";
            } else if (computerChoice === "Paper") {
                console.log("Computer chose paper, so it's a draw");
                return "resultDraw";
            } else if (computerChoice === "Scissors") {
                console.log("Computer chose scissors, so you lose");
                return "resultComputer";
            }
            break;
    }
}

