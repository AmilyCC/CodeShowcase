const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
}
const Symbols = [
  './images/spade.png', // 黑桃
  './images/heart.png', // 愛心
  './images/diamond.png', // 方塊
  './images/club.png' // 梅花
]
const view = {
    getCardContent(index){
        const number = this.transformNumber((index % 13) + 1)
        const symbol = Symbols[Math.floor(index / 13)]
        return `<p>${number}</p>
            <img src="${symbol}" />
            <p>${number}</p>`
    },
    getCardElement (index) {
        return `<div data-index="${index}" class="Pcard back"></div>`
    },
    transformNumber (number) {
        switch (number) {
        case 1:
            return 'A'
        case 11:
            return 'J'
        case 12:
            return 'Q'
        case 13:
            return 'K'
        default:
            return number
        }
    },
    displayCards(indexes) {
        const rootElement = document.querySelector("#cards");
        rootElement.innerHTML = indexes.map(index => this.getCardElement(index)).join("");
    },
    flipCards(...cards){
        cards.map(card=>{
            if (card.classList.contains('back')){
                card.classList.remove('back');
                card.innerHTML = this.getCardContent(Number(card.dataset.index))
                return
            }
            card.classList.add('back');
            card.innerHTML = null
        })
    },
    pairCards (...cards) {
        cards.map(card=> {
            card.classList.add('paired')
        })
    },

    renderScore(score){
        document.querySelector('.score').textContent = `Score: ${score}`
    },

    renderTriedTimes(times){
        document.querySelector('.tried').textContent = `You've tried: ${times} times`
    },
    appendWrongAnimations(...cards){
        cards.map(card=>{
            card.classList.add('wrong')
            card.addEventListener('animationend', e=>{
                e.target.classList.remove('wrong') 
            },
            {
                once:true
            })
        })
        
    },
    showGameFinished () {
        const div = document.createElement('div')
        div.classList.add('completed')
        div.innerHTML = `
        <p>Complete!</p>
        <p>Score: ${model.score}</p>
        <p>You've tried: ${model.triedTimes} times</p>
        `
        const header = document.querySelector('#header')
        header.before(div)
    }
}
const utility = {
    getRandomNumberArray (count) {
        const number = Array.from(Array(count).keys())
        for (let index = number.length - 1; index > 0; index--) {
        let randomIndex = Math.floor(Math.random() * (index + 1))
            ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
        }
        return number
    }
}


const model = {
    revealedCards:[],
    isRevealedCardsMatched(){
        return Number(this.revealedCards[0].dataset.index ) % 13 === Number(this.revealedCards[1].dataset.index ) % 13 
    },

    score:0,
    triedTimes:0
}

const controller = {
    currentState: GAME_STATE.FirstCardAwaits,
    generateCards(){
        view.displayCards(utility.getRandomNumberArray(52))
    },
    dispatchCardAction(card){
        if(!card.classList.contains('back')){
            return;
        }
        switch (this.currentState) {
            case GAME_STATE.FirstCardAwaits:
                view.renderTriedTimes((++model.triedTimes))
                view.flipCards(card)
                model.revealedCards.push(card)
                this.currentState = GAME_STATE.SecondCardAwaits
                break
            case GAME_STATE.SecondCardAwaits:
                view.flipCards(card)
                model.revealedCards.push(card)
                if(model.isRevealedCardsMatched()){
                    view.renderScore((model.score += 10))
                    this.currentState = GAME_STATE.CardsMatched
                    view.pairCards(...model.revealedCards)
                    model.revealedCards = []
                    if (model.score === 260) {
                        // console.log('showGameFinished')
                        this.currentState = GAME_STATE.GameFinished
                        view.showGameFinished()  // 加在這裡
                        return
                    }
                    this.currentState = GAME_STATE.FirstCardAwaits
                }else{
                    this.currentState = GAME_STATE.CardsMatchFailed
                    view.appendWrongAnimations(...model.revealedCards)
                    setTimeout(this.resetCards,1000)
                    
                }
                break
        }
        // console.log('this.currentState', this.currentState)
        // console.log('revealedCards', model.revealedCards.map(card => card.dataset.index))
        
    },

    resetCards(){
        view.flipCards(...model.revealedCards)
        model.revealedCards = []
        controller.currentState = GAME_STATE.FirstCardAwaits
    }
}


controller.generateCards()

document.querySelectorAll(".Pcard").forEach(card =>{
    card.addEventListener('click' , event =>{
        controller.dispatchCardAction(card)
    })
})