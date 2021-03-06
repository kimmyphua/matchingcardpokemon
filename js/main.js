
const pokemon = [
    {
        name: 'Bulbasaur',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png"
    },
    {
        name: 'Bulbasaur',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png"
    },
    {
        name: 'Squirtle',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png"
    },
    {
        name: 'Squirtle',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png"
    },
    {
        name: 'Charmander',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png'
    },
    {
        name: 'Charmander',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png'
    },
    {
        name: 'Pikachu',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png'
    },
    {
        name: 'Pikachu',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png'
    },
    {
        name: 'Mewtwo',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png'
    },
    {
        name: 'Mewtwo',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png'
    },
    {
        name: 'Eevee',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980186/memory/Pokemon/Eevee.png'
    },
    {
        name: 'Eevee',
        img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980186/memory/Pokemon/Eevee.png'
    },
    {
        name: 'Articuno',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png"
    },
    {
        name: 'Articuno',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png"
    },
    {
        name: 'Zapdos',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png"
    },
    {
        name: 'Zapdos',
        img: "https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png"
    }]

// const pokemon = [
//     { name: 'Bulbasaur',
//         img: "https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png"
//     },
//
//     { name: 'Squirtle',
//         img: "https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png"
//     },
//
//     { name: 'Charmander',
//         img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png'
//     },
//
//     { name: 'Pikachu',
//         img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png'
//     },
//
//     { name: 'Mewtwo',
//         img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png'
//     },
//
//     { name: 'Eevee',
//         img: 'https://res.cloudinary.com/beumsk/image/upload/v1547980186/memory/Pokemon/Eevee.png'
//     },
//
//     { name: 'Articuno',
//         img: "https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png"
//     },
//
//     { name: 'Zapdos',
//         img:  "https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png"
//     }
// ]


let body = document.querySelector("#body")
let divContainer = document.createElement('div')
let num = 2


class AudioController {
    constructor() {
        this.flipSound = new Audio('Assets/Audio/flip.wav')
        this.matchSound = new Audio('Assets/Audio/match.wav')
        this.victorySound = new Audio('Assets/Audio/LevelUp.mp3')
        this.winnerSound = new Audio('Assets/Audio/winner.mp3')
        this.gameOverSound = new Audio('Assets/Audio/gameover.wav')
        this.backGroundSound = new Audio('Assets/Audio/battle.mp3')
        this.helpSound = new Audio('Assets/Audio/help.mp3')
        this.backGroundSound.volume = 0.2
        this.helpSound.volume = 0.2
        this.backGroundSound.loop = true
        this.helpSound.loop = true
    }
    stopMusic() {
        this.backGroundSound.pause();
        this.backGroundSound.currentTime = 0
    }
    battle(){
        this.backGroundSound.play();
        this.winnerSound.pause()
        this.helpSound.pause()

    }

    flip() {
        this.flipSound.play()
    }

    match() {
        this.matchSound.play()
    }

    victory() {
        this.victorySound.play()
        this.stopMusic()
        this.helpSound.pause()

    }

    gameOver() {
        this.gameOverSound.play()
        this.stopMusic()
        this.helpSound.pause()
    }

    help(){
        this.helpSound.play()
        this.stopMusic()
    }

    winner(){
        this.winnerSound.play()
        this.stopMusic()
        this.helpSound.pause()
    }
}




class MatchThemAll {
    constructor(totalTime) {
        // this.cardsArray = cards
        this.cardsArray = []
        this.totalTime = totalTime //total time is 100 at the start
        this.timeRemaining = totalTime
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips')
        this.audioController = new AudioController()

    }

    startGame() {

        this.generateLevel(num)
        this.cardToCheck = null //no cards to check
        this.totalClicks = 0
        this.busy = true //basically if this is true, you cannot flip any cards
        this.timeRemaining = this.totalTime
        this.matchedCards = [] //put the matched cards into new arr
        this.audioController.battle()

        setTimeout(() => {
            this.shuffleCards()
            this.countDown = this.startCountDown()
            this.busy = false
        }, 500) //delay start for 0.5 seconds
        this.hideCards()
        this.timer.innerText = this.timeRemaining //show countdown
        this.ticker.innerText = this.totalClicks // show no of flips

    }

    generateLevel(num) {
                divContainer.innerHTML = ""
                let cards = []

                for (let i = 0; i < 16 - (pokemon.length - num) ; i++) {
                //console.log(pokemon[i])
                let div1 = document.createElement('div')
                let div2 = document.createElement('div')
                let imgTag1 = document.createElement('img')
                let div3 = document.createElement('div')
                let imgTag2 = document.createElement('img')


                divContainer.classList.add("game-container")
                div1.classList.add("card")
                div2.classList.add("card-back", "card-face")
                imgTag1.setAttribute("src", "https://pngimg.com/uploads/pokeball/pokeball_PNG21.png")
                imgTag1.classList.add("ball")
                div3.classList.add("card-front", "card-face")

                imgTag2.setAttribute("src", pokemon[i].img)
                console.log(pokemon[i].img)
                imgTag2.classList.add("poke")

                div1.appendChild(div2)
                div1.appendChild(div3)
                div2.appendChild(imgTag1)
                div3.appendChild(imgTag2)
                divContainer.appendChild(div1)
                body.appendChild(divContainer)

            }


        cards = Array.from(document.getElementsByClassName('card'))
        // let cards1 = cards.concat(cards)
        this.cardsArray = cards
        console.log(cards.length)
        cards.forEach(card => {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            // card.style.backgroundColor = "#" + randomColor;
            // let cln = card.cloneNode(true);
            // divContainer.appendChild(cln)
            card.addEventListener('click', () => {
                game.flipCard(card)
            })
        })
    }


//remove visible to hide, add visible when flipped/matched
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible')
            card.classList.remove('matched')
        })
    }

    flipCard(card) {
       // console.log("hi")
        if (this.canFlipCard(card)) {
            //console.log("hi")
            this.audioController.flip()
            this.totalClicks++
            this.ticker.innerText = this.totalClicks
            card.classList.add('visible')

            if (this.totalClicks === this.cardsArray.length+3){
                this.shuffleCards()
                this.audioController.help()
                document.getElementById("reshuffle").classList.add("visible")
            }


            if (this.cardToCheck){
                this.checkForCardMatch(card)}
            else
                this.cardToCheck = card
        }
    }


    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)){
            this.cardMatch(card, this.cardToCheck);
        }
        else{
            this.cardMisMatch(card, this.cardToCheck)}

        this.cardToCheck = null
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1)
        this.matchedCards.push(card2)
        card1.classList.add('matched')
        card2.classList.add('matched')
        this.audioController.match()
        if (this.matchedCards.length === this.cardsArray.length && this.matchedCards.length === 16) {
            this.champion() //win when all cards are matched
        }
        if (this.matchedCards.length === this.cardsArray.length && this.matchedCards.length < 16) {
            this.victory() //win when all cards are matched
        }


    }

    cardMisMatch(card1, card2) {
        setTimeout(() => {
            card1.classList.remove('visible')
            card2.classList.remove('visible')
        }, 1000)
    }//wait 1 second before flipping back the cards

    getCardType(card) {
       // return card.getElementsByClassName('poke').src
       return card.getElementsByClassName('poke')[0].src

    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--
            this.timer.innerText = this.timeRemaining
            if (this.timeRemaining === 0)
                this.gameOver()
            // if (this.timeRemaining === 15){
            //     this.shuffleCards()
            //     this.audioController.flip()
            // }

        }, 1000)
    }


    gameOver() {
        clearInterval(this.countDown)
        //game.startGame()
        this.audioController.gameOver()
        document.getElementById('game-over-text').classList.add('visible')
        num = 2
        document.getElementById("reshuffle").classList.remove("visible")
    }

    victory() {
        clearInterval(this.countDown)
        this.audioController.victory()
        document.getElementById('victory-text').classList.add('visible')
        // this.generateLevel(+2 )
        num +=2
        document.getElementById("reshuffle").classList.remove("visible")
    }

    champion(){
        clearInterval(this.countDown)
        this.audioController.winner()
        document.getElementById('champion').classList.add('visible')
        num = 2
        document.getElementById("reshuffle").classList.remove("visible")
    }

    shuffleCards() {

        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1))
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
// let cards = Array.from(document.getElementsByClassName('card'))
let game = new MatchThemAll(60)

//remove overlays when clicked (remove visible)
//start game
overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible')
        game.startGame()
    })
})





