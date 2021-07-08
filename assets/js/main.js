
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
        this.victory.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
    }
    flipCard(card) {
        if(this.canFlipCard(card)){
            this.audioController.flip();
            this.totalClicks++
            this.ticßker.innerText = this.totalClicks;
            card.classList.add('visible')

            //if statement
        }
    }
    canFlipCard(card) {
        return true;
        // return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck
    }
}

// Validate the document has loaded, if not add an event listener to the document checking if it's loaded with a callback ready() function. 
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {
    // Grab all overlays
    let overlays = document.querySelectorAll('.overlay-text');
    console.log(overlays)
    let cards = document.querySelectorAll('.card')
    let game = new MixOrMatch(100, cards)



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

