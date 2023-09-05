function playGame () {
    let playerScore = 0;
    let computerScore = 0;

    let numberRounds = parseInt(prompt("Please enter number of rounds"));
    
    let i = 0;
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
        " Computer");
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