function playGame () {
    let i = 0;
    do {
        let playerChoice = prompt("Please enter your choice of rock, paper or scissors");
        let computerChoice = randomChoice();
        decideResult(playerChoice, computerChoice);
        i++;
    } while (i < 5);
}

function randomChoice () {
    let possibleChoices = ["Rock", "Paper", "Scissors"];
    let randomInteger = Math.floor(Math.random() * 3);
    return possibleChoices[randomInteger];
}

function decideResult (playerChoice, computerChoice) {
    switch (playerChoice) {
        case "Rock":
            if (computerChoice === "Rock") {
                console.log("Computer chose rock, so it's a draw");
            } else if (computerChoice === "Paper") {
                console.log("Computer chose paper, so you lose");
            } else if (computerChoice === "Scissors") {
                console.log("Computer chose scissors, so you win!");
            }
            break;
        case "Scissors":
            if (computerChoice === "Rock") {
                console.log("Computer chose rock, so you lose");
            } else if (computerChoice === "Paper") {
                console.log("Computer chose paper, so you win!");
            } else if (computerChoice === "Scissors") {
                console.log("Computer chose scissors, so it's a draw");
            }
            break;
        case "Paper":
            if (computerChoice === "Rock") {
                console.log("Computer chose rock, so you win!");
            } else if (computerChoice === "Paper") {
                console.log("Computer chose paper, so it's a draw");
            } else if (computerChoice === "Scissors") {
                console.log("Computer chose scissors, so you lose");
            }
            break;
    }
}

