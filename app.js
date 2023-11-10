// Function to get DOM elements
function getDomElements() {
    return {
        notice: document.querySelector('.notice'),
        inputRounds: document.querySelector('.rounds-input'),
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

//Game logic
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
        this.roundsClicked++;
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

// DOM renderer
function updateDOM(roundData) {  
    //check if object property is provided for dom update
    if (roundData.playerScore !== undefined) {
        dom.playerScoreContainer.textContent = roundData.playerScore;
    } 
    if (roundData.computerScore !== undefined) {
        dom.computerScoreContainer.textContent = roundData.computerScore;
    }
    if (roundData.playerChoice !== undefined) {
        dom.playerChoiceContainer.textContent = roundData.playerChoice;
    }
    if (roundData.computerChoice !== undefined) {
        dom.computerChoiceContainer.textContent = roundData.computerChoice;
    }
    if (roundData.result!== undefined) {
        dom.resultContainer.textContent = roundData.result;
    }
    if (roundData.numberRounds !== undefined) {
        dom.roundsRemaining.textContent = +roundData.numberRounds - +roundData.roundsClicked;
    } else if (roundData.roundsClicked !== undefined) {
        dom.roundsRemaining.textContent = +roundData.numberRounds - +roundData.roundsClicked;
    }
    if (roundData.notice!== undefined) {
        dom.notice.textContent = roundData.notice;
    }
}

// Event listeners
document.body.addEventListener('click', function (event) {
    if (event.target.matches('.play-game')) {
        const numberRounds = +dom.inputRounds.value;
        const roundData = game.resetGame(numberRounds);
        updateDOM(roundData); // Render the reset state
    } else if (event.target.matches('.selection-button')) {
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