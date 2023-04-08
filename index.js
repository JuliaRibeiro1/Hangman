import {words} from "./wordsData.js"
import {head,body,leftArm,rightArm,leftLeg,rightLeg} from "./utils.js"

const get = element => document.querySelector(element)
const getAll = element => document.querySelectorAll(element)
const hangmanBody = [head,body,leftArm,rightArm,leftLeg,rightLeg]

const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let easyMode = words.easy
let mediumMode = words.medium
let hardMode = words.hard
let randomWord = ""

function renderKeyboard() {
    let keys = ""
alphabetArr.map((letter) => {
    keys += renderKeys(letter)

})
return keys
}
let wordPlaceholderArr;
function fillArrPlaceholder(mode) {

//let randomWord = foods[randomWordIndex]*/

wordPlaceholderArr= new Array(randomWord.length)
wordPlaceholderArr.fill(`_`)
    return wordPlaceholderArr
}
let randomWordIndex = ""
function getRandomWord(mode) {
    randomWordIndex = Math.floor(Math.random() * mode.length)
    randomWord = mode[randomWordIndex]
    randomWord = randomWord.replaceAll(' ', '');

    return randomWord
}
function updateArr(mode) {
    return mode.splice(randomWordIndex,1)
}

//console.log(foods[randomWordIndex])
function updateWord() {
let loopPlaceholder = ""

wordPlaceholderArr.map((letter) => {
   loopPlaceholder += `<div class="word-placeholder">${letter}</div>`
   //wordPlaceholderArr.fill()

})
//wordPlaceholderArr.fill(loopPlaceholder)
return loopPlaceholder
}
let gameHtml = document.createElement("div")
let points = 0
let winRounds = 0
let totalRounds = 0
cleanScore()
function renderGame() {
   // console.log(a)
   get(".container").removeChild(menuHtml)
   
   gameHtml.className = "game-container"
     gameHtml.innerHTML = `
    
    <div class="hangman">
        <div class="string-container">
            <svg class="string">
                <rect x="50%" y="0" width="5" height="50"
                style="fill:rgb(255, 255, 255);" />
            </svg>
        </div>
    </div>
    <div class=bottom-container flex>
    <div class="word">${updateWord()}</div>
    <div class="keyboard-container">${renderKeyboard()}</div>
    </div>`
  
   get(".container").append(gameHtml)
}

function renderKeys(letter) {

    return `<button class=key-btn>${letter}</button>`
}
let clickedKeysArr = []

function wordIncludesLetterCheck(e) {
    if(randomWord.includes(e.target.textContent)) {
        let check = getLetterIndex(e.target.textContent)
        return fillWord(check,e.target.textContent)
  
}}
function fillWord(check,letter) {
    check.map(item => {
        wordPlaceholderArr[item] = letter
    })
    get(".word").innerHTML = updateWord()
    return wordPlaceholderArr
}
function getLetterIndex(letter) {
    let rightLetterIndexArr = []
    let wordArr = Array.from(randomWord)
    
    for(let i = 0; i < wordArr.length;i++) {
        if(wordArr[i] == letter) {
            rightLetterIndexArr.push(i)
        }
    }
    return rightLetterIndexArr
}
let currentMode;
document.body.addEventListener("click", (e) => {
    if(e.target.id == "easy-mode-btn") {
        currentMode = easyMode
        startGame(currentMode)
        renderGame()

    }
    else if(e.target.id == "medium-mode-btn") {
        currentMode = mediumMode
        startGame(currentMode)
        renderGame()

    }
    else if(e.target.id == "hard-mode-btn") {
        currentMode = hardMode
        startGame(currentMode)
        renderGame()
    }
    else if(e.target.className == "key-btn") {
        if(!clickedKeysArr.includes(e.target.textContent)) {
        wordIncludesLetterCheck(e)
        clickedKeysArr.push(e.target.textContent)
        e.target.disabled = true
        checkWin()
        } 
    }  
    else if(e.target.className == "menu-btn") {
        if(gameHtml !== "") {
            
            console.log(get(".container").children)
            get(".container").removeChild(popupLose)
            get(".container").removeChild(gameHtml)
            }
            cleanScore()
        renderMenu()

    }
    else if(e.target.className == "start-again-btn") {
       
        child2 = get(".container").children[1]
        console.log(child2)
       
        resetGame(currentMode)
        cleanScore()
        get(".container").removeChild(popupLose)
        console.log( get(".container").children)
      // 
    }
})
function cleanScore() {
    points = 0
    winRounds = 0
    totalRounds = 0
    get(".win-rounds").textContent = winRounds
    get(".points span").textContent = points
    get(".total-rounds").textContent = totalRounds
}
function startGame(mode) {
    
    updateArr(mode)
    getRandomWord(mode)
    fillArrPlaceholder(mode)
    
    console.log(randomWord)
}
function resetGame(mode) {
    clickedKeysArr.length = 0
    startGame(mode)
    get(".word").innerHTML = updateWord()
    resetKeyboard()
}

function checkWin() {

    if(!wordPlaceholderArr.includes("_")) {
        disableKeyboard()
        setTimeout(() => {  
           
            updatePoints()
            console.log("Oaaaaaaaaaa")
            resetGame(currentMode)
            updateRounds()
          
        },1000)
    }
    else {
        if(CheckWrongLetterCounter() > 5 ) {
            updateRounds()
            disableKeyboard()
            revealWord()
            
        }
    } 
}

function updatePoints() {
    points+=10
    get(".points").classList.add("addPointsAnimation")
    setTimeout(() => {
        get(".points").classList.remove("addPointsAnimation")
    },400)
    return get(".points span").textContent = points

}

function updateRounds() {
   // console.log(CheckWrongLetterCounter())
   // checkNextPhase()//CheckWrongLetterCounter() < 5
   
    if(CheckWrongLetterCounter() < 5) {
        winRounds+=1
        get(".win-rounds").textContent = winRounds
    }
   totalRounds+=1
   
   get(".total-rounds").textContent = totalRounds
   renderNextPhase()

}
function checkNextPhase() {
    if(totalRounds == winRounds  + 3) {
        renderLoseMenu()
        return true
    }
    else {
        return false
    }
}

function renderNextPhase() {
    
  
    let NextMode = currentMode == easyMode? mediumMode : currentMode == mediumMode ? hardMode : winnerAllModes()
    let round = totalRounds == 5 || totalRounds == 10 || totalRounds == 15
    if(checkNextPhase() == false && round) {
      currentMode = NextMode
        resetGame(NextMode)
      
    popupLose.innerHTML = `
    <div class="lose-popup-container">
        <div class="popup-container">
        <h2>NEXT PHASE</h2>
        
        </div>
    </div>`
    return get(".container").append(popupLose)
   
    }
}

function winnerAllModes() {
    popupLose.innerHTML = `
    <div class="lose-popup-container">
        <div class="popup-container">
        <h2>WINNER</h2>
        
        </div>
    </div>`
    return get(".container").append(popupLose)

}
function nextPhaseMessage() {

}

let popupLose = ""
popupLose = document.createElement("div")
function renderLoseMenu() {
    
popupLose.className = "lose-popup-container"
    popupLose.innerHTML = `
    <div class="lose-popup-container">
        <div class="popup-container">
        <h2>YOU LOSE</h2>
        <button class="menu-btn">MENU</button>
        <button class="start-again-btn">START AGAIN</button>
        </div>
    </div>`
    return get(".container").append(popupLose)
}
function resetKeyboard() {
    getAll(".key-btn").forEach(key => key.disabled = false)
}
function disableKeyboard() {
    getAll(".key-btn").forEach(key => key.disabled = true)
}

function CheckWrongLetterCounter() {
    let count = 0
    clickedKeysArr.map(letter => {
        if(!randomWord.includes(letter)) {
            hangmanBody[count]()
            count++
        }
    })
    return count
}
let c = 0
function revealWord() {
   
   // if(CheckWrongLetterCounter() > 5 ) {
        Array.from(randomWord).map((letter,index) => {
            let check = getLetterIndex(letter)
            fillWord(check,letter)
        })

        get(".word").innerHTML = updateWord()
        console.log(checkNextPhase())
        
        c++
        console.log(get(".hangman"))
        if(checkNextPhase() == false) {
            console.log(checkNextPhase())
        setTimeout(() => {
            console.log("reveal")
            resetGame(currentMode)
        },1000)
    //}
    }
}
document.body.addEventListener("mouseover",async (e) => {
    if(e.target.className == "info-icon") {
        let clue = await getWordClue(`https://api.dictionaryapi.dev/api/v2/entries/en/`,randomWord)
        renderClue(clue)
    }
   else if(e.target.className !== "info-icon" && get(".info-icon")){ 
    get(".clue-container").classList.remove("open")
    get(".clue-container").setAttribute("clue","")
   }
}) 

getAll(".menu-option-btn").forEach(btn => btn.addEventListener("click",() => {
    console.log("Oiiii")
}))
let menuHtml = document.createElement("div")
function renderMenu() {
    console.log(get(".container").children)
     menuHtml.innerHTML = `<div class=menu-container>
        <h1>hangman</h1>
        <div class=menu-options-container>
            <button class="menu-option-btn" id=easy-mode-btn>Easy</button>
            <button class="menu-option-btn" id=medium-mode-btn>Medium</button>
            <button class="menu-option-btn" id=hard-mode-btn>Hard</button>
        </div>
    </div>`
    get(".container").append(menuHtml)
   
}
renderMenu()
function renderClue(clue) {
    get(".clue-container").classList.add("open")
    get(".clue-container").setAttribute("clue",clue)
}

async function getWordClue(url,word) {
    try{
        const res = await fetch(`${url}${word}`) 
        
        if(!res.ok) {
          throw Error("Cor indisponível")
        }
        const data = await res.json()
  return data[0].meanings[0].definitions[0].definition

}catch(err){alert(err)};
}

//https://api.dictionaryapi.dev/api/v2/entries/en/