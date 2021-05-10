// const instruction = document.querySelector("#instruction_modal")
// const close = document.querySelector(".close")
// // const level2 = document.querySelector(".card_modal_1")
//
// close.addEventListener("click", e => {
//     instruction.style.display = "none"
//     game.startGame()
// })

// level2.addEventListener()



class AudioController {
    constructor() {
        this.flipSound = new Audio('Assets/Audio/flip.wav')
        this.matchSound = new Audio('Assets/Audio/match.wav');
        this.victorySound = new Audio('Assets/Audio/victory.wav');
        this.gameOverSound = new Audio('Assets/Audio/gameover.wav');
    }
    flip(){
        this.flipSound.play()
    }

    match(){
        this.matchSound.play()
    }
    victory(){
        this.victorySound.play()
    }
    gameOver(){
        this.gameOverSound.play()
    }
}
//1-2
//2,4
//3,6
//shuffle(6)
//[1,5,1,2,3,5,3]
//temp []
class MatchThemAll {
    constructor(totalTime, cards) {
        this.cardsArray = cards
        this.totalTime = totalTime //total time is 100 at the start
        this.timeRemaining = totalTime
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips')
        this.audioController = new AudioController()
        //this.level=1
    }


    startGame(){
        // if(this.win){
        //     this.level+=1
        //      this.win=false
        // }
        this.cardToCheck = null //no cards to check
        this.totalClicks = 0
        this.busy = true //basically if this is true, you cannot flip any cards
        this.timeRemaining = this.totalTime
        this.matchedCards = [] //put the matched cards into new arr

        setTimeout( () => {
            this.shuffleCards()
            this.countDown = this.startCountDown()
            this.busy = false
        }, 500) //delay start for 0.5 seconds
        this.hideCards()
        this.timer.innerText = this.timeRemaining //show countdown
        this.ticker.innerText = this.totalClicks // show no of flips

    }

//remove visible to hide, add visible when flipped/matched
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible')
            card.classList.remove('matched')
        })
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }


    checkForCardMatch(card){
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
            else
                this.cardMisMatch(card, this.cardToCheck)

            this.cardToCheck = null
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1)
        this.matchedCards.push(card2)
        card1.classList.add('matched')
        card2.classList.add('matched')
        this.audioController.match()
        if(this.matchedCards.length === this.cardsArray.length) {
            //this.win = true
            this.victory() //win when all cards are matched
        }

    }

    cardMisMatch(card1 ,card2) {
    setTimeout( () => {
     card1.classList.remove('visible')
     card2.classList.remove('visible')
    }, 1000)
    }//wait 1 second before flipping back the cards

    getCardType(card){
        return card.getElementsByClassName('poke')[0].src

    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--
            this.timer.innerText = this.timeRemaining
            if(this.timeRemaining === 0)
                this.gameOver()
        }, 1000)
    }


    gameOver() {
    clearInterval(this.countDown)
    //game.startGame()
    this.audioController.gameOver()
    document.getElementById('game-over-text').classList.add('visible')
     }

    victory() {
    clearInterval(this.countDown)
    //game.startGame()
    this.audioController.victory()
    document.getElementById('victory-text').classList.add('visible')
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--){
             let randomIndex = Math.floor(Math.random()*(i+1))
             this.cardsArray[randomIndex].style.order = i
             this.cardsArray[i].style.order = randomIndex
    }
    }

    canFlipCard(card) { //card that can be flipped cannot be cards you chose/matched
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
  }

let overlays = Array.from(document.getElementsByClassName('overlay-text'))
let cards = Array.from(document.getElementsByClassName('card'))
let game = new MatchThemAll(30, cards)

//remove overlays when clicked (remove visible)
//start game
overlays.forEach(overlay => {
    overlay.addEventListener('click', ()=> {
        overlay.classList.remove('visible')
        game.startGame()
    })
})

cards.forEach(card => {
    card.addEventListener('click', () => {
        game.flipCard(card)
    })
})


