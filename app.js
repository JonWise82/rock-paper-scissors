//View
const domObject = {
    notice: document.querySelector('.notice'),
    inputRounds: document.querySelector('.rounds-input'),
    playerScoreContainer: document.querySelector('.player-score'),
    computerScoreContainer: document.querySelector('.computer-score'),
    resultContainer: document.querySelector('.result'),
    playerChoiceContainer: document.querySelector('.player-choice'),
    computerChoiceContainer: document.querySelector('.computer-choice'),
    roundsRemaining: document.querySelector('.rounds-remaining') 

    //Render onto dom
    updateDOM(roundData) {  
        if (roundData.playerScore !== undefined) {
            this.playerScoreContainer.textContent = roundData.playerScore;
        } 
        if (roundData.computerScore !== undefined) {
            this.computerScoreContainer.textContent = roundData.computerScore;
        }
        if (roundData.playerChoice !== undefined) {
            this.playerChoiceContainer.textContent = roundData.playerChoice;
        }
        if (roundData.computerChoice !== undefined) {
            this.computerChoiceContainer.textContent = roundData.computerChoice;
        }
        if (roundData.result!== undefined) {
            this.resultContainer.textContent = roundData.result;
        }
        if (roundData.numberRounds !== undefined) {
            this.roundsRemaining.textContent = +roundData.numberRounds - +roundData.roundsClicked;
        } else if (roundData.roundsClicked !== undefined) {
            this.roundsRemaining.textContent = +roundData.numberRounds - +roundData.roundsClicked;
        }
        if (roundData.notice!== undefined) {
            this.notice.textContent = roundData.notice;
        }
    }
}

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
                    dom.resultContainer.innerText = this.RESULTS.WIN;
                    return this.RESULTS.WIN;
                }
                break;
            case "scissors":
                if (computerChoice === "rock") {                
                    dom.resultContainer.innerText = this.RESULTS.DEFEAT;
                    returnthis.RESULTS.DEFEAT;
                } else if (computerChoice === "paper") {                
                    dom.resultContainer.innerText = RESULTS.WIN;
                    return this.RESULTS.WIN;
                }
                break;
            case "paper":
                if (computerChoice === "rock") {
                    dom.resultContainer.innerText = this.RESULTS.WIN;
                    return this.RESULTS.WIN;                
                } else if (computerChoice === "scissors") {
                    dom.resultContainer.innerText = this.RESULTS.DEFEAT;
                    return this.RESULTS.DEFEAT;                
                }
                break;
        }
    },
    endGame() {
        this.result = this.playerScore > this.computerScore
          ? "YOU WIN! WELL DONE"
          : this.computerScore > this.playerScore
          ? "YOU LOSE! TRY AGAIN"
          : "IT'S A DRAW! TRY AGAIN";
        return {
            result: this.result
        }
    }
}

//Controller
document.body.addEventListener('click', function (event) {
    const dom = domObject;
    if (event.target.matches('.play-game')) {
        const numberRounds = +dom.inputRounds.value;
        const roundData = game.resetGame(numberRounds);
        updateDOM(roundData); // Render the reset state
    } else if (event.target.matches('.selection-button')) {
        game.roundsClicked++;
        if (game.roundsClicked <= game.numberRounds) {
            const playerChoice = event.target.textContent.toLowerCase(); 
            const roundData = game.playRound(playerChoice);
            updateDOM(roundData);
        }
        if (game.roundsClicked === game.numberRounds) {
            const finalMessage = game.endGame();
            updateDOM(finalMessage);
        }
        if (game.roundsClicked > game.numberRounds) {
            const restartMessage = {
                notice: "Game complete, please start another set."
            }
            updateDOM(restartMessage);
        }
    }   
})    