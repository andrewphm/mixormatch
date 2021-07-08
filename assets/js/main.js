// Audio class to handle all sounds. Utilize JS Audio() class

class AudioController {
    constructor() {
        this.bgMusic = new Audio('/assets/Audio/creepy.mp3')
        this.flipSound = new Audio('/assets/Audio/flip.wav')
        this.matchSound = new Audio('/assets/Audio/match.wav')
        this.victorySound = new Audio('/assets/Audio/victory.wav')
        this.gameOverSound = new Audio('/assets/Audio/gameover.wav')
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

// Game class to handle all game logic. 
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    // Reset timer/flips and hide all cards. 
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(() => {
            this.audioController.startMusic()
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    // Reset cards to backfacing. 
    hideCards(){
        this.cardArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        })
    }

    // event handler function for when a card is clicked
    // Make card visible and assign it as the card to check
    flipCard(card) {
        if(this.canFlipCard(card)){
            this.audioController.flip();
            this.totalClicks++
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible')

            if(this.cardToCheck){
                // If there is already a card to check, see if new card matches
                this.checkForCardMatch(card)
            } else {
                this.cardToCheck = card;
            }
        }
    }

    // Check if src attribute of the cards match by calling getCardType
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMisMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    // Takes the two matched cards and pushes them into a matched cards array
    // Checks win condition
    cardMatch(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardArray.length){
            this.victory()
        }
    }

    // Takes the mismatched cards and resets them to backfacing
    cardMisMatch(card1, card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000)
    }

    // return the value of the src attribute
    getCardType(card){
        return card.getElementsByClassName('card-value')[0].src;
    }

    // Creates an interval that runs every second and updates this.timer
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0){
                this.gameOver();
            }
        }, 1000)
    }

    // Makes game over overlay visible
    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible')
    }

    // Makes victory overlay visible
    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible')
    }

    // Shuffle the deck of cards by using the order property in CSS
    shuffleCards() {
        for(let i = this.cardArray.length - 1; i >= 0; i--){
            let randIndex = Math.floor(Math.random() * (i+1))
            this.cardArray[randIndex].style.order = i;
            this.cardArray[i].style.order = randIndex;
        }
    }

    // validates that the user can flip a card
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck
    }
}

// Validating document has loaded and calling ready() function
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

// Create a new MixOrMatch instance, and startGame on overlay click
function ready() {
    // Grab all overlays
    let overlays = document.querySelectorAll('.overlay-text');
    let cards = document.querySelectorAll('.card')
    let game = new MixOrMatch(80, cards)
    console.log(game);

    //Adding event listeners to each overlay so on click they are removed.
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        })
    })

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    })
}



