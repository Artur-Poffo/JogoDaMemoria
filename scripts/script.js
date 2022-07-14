let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

let firstcard = null
let secondcard = null
let lockmode = false

let cards = null

Start()

function Start() {
    cards = NewCardArray(techs)
    embaralhar(cards, InsertCards)
    
}

function embaralhar(cards, InsertCards) {
    let ultimoindex = cards.length
    let randomindex = 0

    while (ultimoindex !== 0) {
        randomindex = Math.floor(Math.random() * ultimoindex)
        ultimoindex--

        [cards[randomindex], cards[ultimoindex]] = [cards[ultimoindex], cards[randomindex]]
    }

    InsertCards()
    
}

function InsertCards() {
    const list = document.getElementById('cards')
    list.innerHTML = ""
    cards.map(item => {
        const element = document.createElement('div')
        element.id = item.id
        element.setAttribute('class', 'card')
        element.setAttribute('data-icon', item.icon)

        const cardFront = document.createElement('div')
        cardFront.setAttribute('class', 'front')
        cardFront.innerHTML = `<img class="icon" src="./assets/${item.icon}.png">`

        const cardBack = document.createElement('div')
        cardBack.setAttribute('class', 'back')
        cardBack.innerHTML = `&lt/&gt`

        element.appendChild(cardFront)
        element.appendChild(cardBack)

        list.appendChild(element)

        function Flipped() {
            
            if (item.flipped || lockmode) {
                return false
            }

            if (!firstcard) {
                firstcard = item
                firstcard.flipped = true
                return true
            } else {
                secondcard = item
                secondcard.flipped = true
                lockmode = true
                return true
            }
        }

        element.addEventListener('click',() => {
            if(Flipped()) {
                element.classList.add('flip')
                if (secondcard) {
                if(cardmatch()) {
                    clearCards()
                    if (verificarGameOver()) {
                        const viewGameOver = document.getElementById('gameOver')
                        viewGameOver.style.display = "flex"
                    }
                } else {
                    setTimeout(() => {
                        let cardoneview = document.getElementById(firstcard.id)
                        let cardtwoview = document.getElementById(secondcard.id)

                        cardoneview.classList.remove('flip')
                        cardtwoview.classList.remove('flip')
                        unflip()
                    }, 1000)
                }
                }
            }
        })
    })

    function verificarGameOver() {
        let flips = cards.filter(card => !card.flipped)

        if (flips.length == 0) {
            return true
        } else {
            return false
        }
    }

    function unflip() {
        firstcard.flipped = false
        secondcard.flipped = false
        clearCards()
    }
}

function cardmatch() {
    if (!firstcard || !secondcard) {
        return false
    }

    return firstcard.icon == secondcard.icon
}

function clearCards() {
    firstcard = null
    secondcard = null
    lockmode = false
}

function NewCardArray() {
    let cards = []

    techs.map((item, index) => {
        cards.push(ObjectCards(techs[index]))
    })

    return cards.flatMap(card => card)
}

function ObjectCards(tech) {
    return [{id: createID(tech), icon: tech, flipped: false},
            {id: createID(tech), icon: tech, flipped: false}]

            
}

function createID(tech) {
    return tech + parseInt(Math.random() * 1000)

}

function restart() {
    clearCards()
    Start()
    const viewGameOver = document.getElementById('gameOver')
    viewGameOver.style.display = "none"
}