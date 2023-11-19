//Model (game logic)
const game = {
    playerScore: 0,
    computerScore: 0,
    roundsClicked: 0,
    numberRounds: 0,
    notice: "",
    CHOICES: ["rock", "paper", "scissors"],
    RESULTS: {
        WIN: "WIN!",
        DEFEAT: "DEFEAT!",
        DRAW: "DRAW!",
    },
    resetGame(numberRounds) {
        this.playerScore = 0;
        this.computerScore = 0;
        this.roundsClicked = 0;
        this.numberRounds = numberRounds;
        this.notice = `Good luck, best of ${this.numberRounds} rounds`;
        return { 
            result: "",
            playerChoice: "",
            computerChoice: "",
            playerScore: this.playerScore,
            computerScore: this.computerScore,
            numberRounds: this.numberRounds,
            roundsClicked: this.roundsClicked,
            notice: this.notice
        };
    },
    playRound(playerChoice) {
        const computerChoice = this.CHOICES[Math.floor(Math.random() * 3)];       
        const result = this.decideResult(playerChoice, computerChoice);
        if (result === this.RESULTS.WIN) {
            this.playerScore++;
            this.notice = "Well done!  You won the round!";
        } else if (result === this.RESULTS.DEFEAT) {
            this.computerScore++;
            this.notice = "Unlucky. You lost the round.";
        } else if (result === this.RESULTS.DRAW) {
            this.notice = "Draw. No points awarded."
        }
        return { 
            result: result, 
            playerChoice: playerChoice, 
            computerChoice: computerChoice, 
            playerScore: this.playerScore, 
            computerScore: this.computerScore,
            numberRounds: this.numberRounds,
            roundsClicked: this.roundsClicked,
            notice: this.notice
        };
    },    
    decideResult (playerChoice, computerChoice) {
        //draw case
        if (playerChoice === computerChoice) {        
            return this.RESULTS.DRAW
        }    
        switch (playerChoice) {
            case "rock":
                if (computerChoice === "paper") {                
                    return this.RESULTS.DEFEAT;
                } else if (computerChoice === "scissors") {                
                    return this.RESULTS.WIN;
                }
                break;
            case "scissors":
                if (computerChoice === "rock") {                
                    return this.RESULTS.DEFEAT;
                } else if (computerChoice === "paper") {                
                    return this.RESULTS.WIN;
                }
                break;
            case "paper":
                if (computerChoice === "rock") {
                    return this.RESULTS.WIN;                
                } else if (computerChoice === "scissors") {
                    return this.RESULTS.DEFEAT;                
                }
                break;
        }
    },
    endGame() {
        if (this.playerScore > this.computerScore) {
            this.notice = "Congratulations! YOU WIN THE GAME!";
        } else if (this.computerScore > this.playerScore) {
            this.notice = "Game Over! YOU LOSE. Try again!";
        } else {
            this.notice = "It's a DRAW! Well played!";
        }
        return {
            notice: this.notice,
            endOfGame: true // Flag to indicate the game has ended
        }
    }
}

//View
const domObject = {
    notice: document.querySelector('.notice'),
    inputRounds: document.querySelector('.rounds-input'),
    playerScoreContainer: document.querySelector('.player-score'),
    computerScoreContainer: document.querySelector('.computer-score'),
    resultContainer: document.querySelector('.result'),
    playerChoiceContainer: document.querySelector('.player-choice'),
    computerChoiceContainer: document.querySelector('.computer-choice'),
    roundsRemaining: document.querySelector('.rounds-remaining'),

    //Render onto dom
    updateDOM(roundData) {  
        if (roundData.playerScore !== undefined) {
            this.playerScoreContainer.textContent = roundData.playerScore;
        } 
        if (roundData.computerScore !== undefined) {
            this.computerScoreContainer.textContent = roundData.computerScore;
        }
        if (roundData.playerChoice !== undefined) {
            if (roundData.roundsClicked !== 0) {
                this.playerChoiceContainer.textContent = 
                `You chose ${roundData.playerChoice}...`;
            } else {
                this.playerChoiceContainer.textContent = 
                `Make your choice...`;
            }
        }
        if (roundData.computerChoice !== undefined) {
            if (roundData.roundsClicked !== 0) {
                this.computerChoiceContainer.textContent = 
                `Computer chose ${roundData.computerChoice}...`;
            } else {
                this.computerChoiceContainer.textContent = 
                `Computer waiting for you to play...`;
            }
        }
        if (roundData.numberRounds !== undefined) {
            this.roundsRemaining.textContent = 
            `There are ${+roundData.numberRounds - +roundData.roundsClicked} rounds remaining`;
        } else if (roundData.roundsClicked !== undefined) {
            this.roundsRemaining.textContent = 
            `There are ${+roundData.numberRounds - +roundData.roundsClicked} rounds remaining`;
        }
        if (roundData.notice!== undefined) {
            this.notice.textContent = roundData.notice;
        }
        if (roundData.endOfGame) {
            this.notice.textContent = roundData.notice;
        }
    }
}

//Controller
document.body.addEventListener('click', function (event) {
    const dom = domObject;
    if (event.target.matches('.play-game')) {
        if (Number.isInteger(+dom.inputRounds.value) 
        && +dom.inputRounds.value > 0) {
            const numberRounds = +dom.inputRounds.value;
            const roundData = game.resetGame(numberRounds);
            dom.updateDOM(roundData); // Render the reset state
        } else {
            dom.updateDOM({notice: "Please enter valid number of rounds"}) 
        }
    } else if (event.target.matches('.selection-button')) {
        game.roundsClicked++;
        if (game.roundsClicked <= game.numberRounds) {
            const playerChoice = event.target.textContent.toLowerCase(); 
            const roundData = game.playRound(playerChoice);
            dom.updateDOM(roundData);
        }
        if (game.roundsClicked === game.numberRounds) {
            const finalMessage = game.endGame();
            dom.updateDOM(finalMessage);
        }
        if (game.roundsClicked > game.numberRounds) {
            const restartMessage = {
                notice: "Game complete, please start another set."
            }
            dom.updateDOM(restartMessage);
        }
    }   
})    