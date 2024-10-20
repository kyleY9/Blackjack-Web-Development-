// Build a BlackJack Game

// Variable Declarations
let firstCard = 0
let secondCard = 0
let total = 0
let cardArray = []
let scoreArray = [] // for collecting the final scores
let hasBlackJack
let isAlive
let name = ""
let message = ""

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let attemptsEl = document.getElementById("attempts-el")
let meanEl = document.getElementById("mean-el")

window.onload = loadStoredData()

function startGame() {
    if (scoreArray.length === 0) {
        name = prompt("What is your name?")
        playerEl.innerHTML = "Player: " + name
        saveName()
    }
    messageEl.innerHTML = "Want to play a round?"
    sumEl.innerHTML = "Sum: "
    cardsEl.innerHTML = "Cards: "
    isAlive = true
    hasBlackJack = false
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    total = firstCard + secondCard
    cardArray = [firstCard, secondCard]
    renderGame()
}


function renderGame() {
    if (isAlive) {
        cardsEl.innerHTML = "Cards: "
        for (i = 0; i < cardArray.length; i++) {
            cardsEl.innerHTML += cardArray[i] + " "
        }

        if (total < 21) {
            message = "Do you want to draw a new card? 🙂"
        } else if (total === 21) {
            hasBlackJack = true
            message = "Wohoo! You've got Blackjack! 🥳"
            addScore()
        } else {
            isAlive = false
            message = "You're out of the game! 😭"
            addScore()
        }
        messageEl.innerHTML = message
        sumEl.innerHTML = "Sum: " + total
    }
}

function newCard() {
    let card = getRandomCard()
    total += card
    cardArray.push(card)
    renderGame()
}


function getRandomCard() {
    let randNum = Math.floor(Math.random() * 12 + 1)
    if (randNum === 1) {
        randNum = 11
    } else if (randNum > 9) {
        randNum = 10
    }
    return randNum
}

function fold() {
    if (!hasBlackJack && isAlive) {
        isAlive = false
        messageEl.innerHTML = "You fold! Final score is " + total + "."
        addScore()
    }
}

function addScore() {
    attemptsEl.innerHTML += total + " "
    scoreArray.push(total)
    saveScores()
    calculateMean()
}

function calculateMean() {
    let count = 0
    if (scoreArray.length >= 4) {
        for (i = scoreArray.length - 4; i < scoreArray.length; i++) {
            count += scoreArray[i]
        }
        count /= 4
        meanEl.innerHTML = count
    }
}

// local storage functions
function loadStoredData() {
    let storageAttempts = JSON.parse(localStorage.getItem("scoreArray"))
    let storageName = localStorage.getItem("player-name")
    if (storageAttempts) {
     scoreArray = storageAttempts
        renderAttempts()
    } 
    if (storageName) {
        name = storageName
        renderName()
    }
}

function saveScores() {
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray))
}

function saveName() {
    localStorage.setItem("player-name", name)
}

function renderAttempts() {
    attemptsEl.innerHTML = ""
    for (i = 0; i < scoreArray.length; i++) {
        attemptsEl.innerHTML += scoreArray[i] + " "
    }
    calculateMean()
}

function renderName() {
    playerEl.innerHTML += " " + name
}

function clearAllData() {
    localStorage.removeItem("scoreArray")
    localStorage.removeItem("player-name")
    scoreArray = []
    attemptsEl.innerHTML = ""
    meanEl.innerHTML = ""
    playerEl.innerHTML = "Player: "
}