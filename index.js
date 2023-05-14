import {words} from "./wordsData.js"
import {head,body,leftArm,rightArm,leftLeg,rightLeg,getWordClue,menuInnerText,popupLoseInnerText,popupWinInnerText,popupNextPhaseInnerText} from "./utils.js"

const get = element => document.querySelector(element)
const getAll = element => document.querySelectorAll(element)
const hangmanBodyFunctions = [head,body,leftArm,rightArm,leftLeg,rightLeg]
console.log("Oi")
const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let easyMode = words.easy
let mediumMode = words.medium
let hardMode = words.hard
let randomWord = ""


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
function renderKeyboard() {
    let keys = ""
    alphabetArr.map((letter) => {
    keys += renderKeys(letter)
  
  })
  return keys
  }

function updateWord() {
let loopPlaceholder = ""
console.log(wordPlaceholderArr)
wordPlaceholderArr.map((letter) => {
   loopPlaceholder += `<div class="word-placeholder">${letter}</div>`

})

return loopPlaceholder
}
let gameHtml = document.createElement("div")
let points,winRounds,totalRounds
cleanScore()
function renderGame() {
   // console.log(a)
   get(".container").removeChild(menuHtml)
   get(".top-container").style.display = "flex"
   gameHtml.className = "game-container"
     gameHtml.innerHTML = `
    <div class=bottom-container flex>
    <div class="word">${updateWord()}</div>
    <div class="keyboard-container">${renderKeyboard()}</div>
    </div>`
  
   get(".container").append(gameHtml)
}

function renderKeys(letter) {

    return `<button class=key-btn>${letter}</button>`
}
let arr = ["head","body","left-arm","right-arm","left-leg","right-leg"]
let animations = ["headAnimation1","bodyAnimation","leftArmAnimation","rightArmAnimation","leftLegAnimation","rightLegAnimation"]
let clickedKeysArr = []
let wrongClickedKeysArr = []
function wordIncludesLetterCheck(e) {
    if(randomWord.includes(e.target.textContent)) {
        let check = getLetterIndex(e.target.textContent)
         fillWord(check,e.target.textContent)
         checkWin()
         e.target.classList.add("correctLetter")
        
}
else {
    let len = wrongClickedKeysArr.length 

    e.target.classList.add("wrongLetter")
    wrongClickedKeysArr.push(e.target.textContent)
    checkLose()
    hangmanBodyFunctions[len]()
 
  //  if(len !== 0) {
     console.log(le)
    //setTimeout(() => {
        get(`.${arr[len]}`).classList.add(`${animations[len]}`)
        setTimeout(() => {
            get(`.${arr[len]}`).classList.remove(`${animations[len]}`)
        },1000)
   // },100)
//}
  
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
       
       // checkWin()
        } 
    }  
    else if(e.target.className == "menu-btn") {
        //if(gameHtml !== "") {
            console.log(get(".container").children)
            get(".container").removeChild(popupHtml)
            get(".container").removeChild(gameHtml)
          // }
            cleanScore()
        renderMenu()
        get(".hangman").innerHTML = `<img src="images/icons8-hang-100.png"/>`
        startGame(currentMode)

    }
    else if(e.target.className == "start-again-btn") {

        resetGame(currentMode)
        cleanScore()
        get(".container").removeChild(popupHtml)
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
    wrongClickedKeysArr.length = 0
    console.log(randomWord)
}
function resetGame(mode) {
    clickedKeysArr.length = 0
    startGame(mode)
    get(".word").innerHTML = updateWord()
    get(".hangman").innerHTML = `<img src="images/icons8-hang-100.png"/>`
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
}
function checkLose() {
    if(wrongClickedKeysArr.length > 5) {
        revealWord()
        updateRounds()
        disableKeyboard()
      
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
    renderNextPhase()
    if(CheckWrongLetterCounter() < 5) {
        winRounds+=1
        get(".win-rounds").textContent = winRounds
    }
   totalRounds+=1
   
   get(".total-rounds").textContent = totalRounds
   

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
    let NextMode = currentMode == easyMode? mediumMode : currentMode == mediumMode ? hardMode : hardMode
    let round = totalRounds == 5 || totalRounds == 10 || totalRounds == 15
    console.log(totalRounds)
    if(checkNextPhase() == false && round) {
      
        if(currentMode == hardMode) {
            winnerAllModes()
        }
        else {
      currentMode = NextMode
        resetGame(NextMode)
      
    popupHtml.innerHTML = popupNextPhaseInnerText()
  

    get(".container").append(popupHtml)
    setTimeout(() => {
        get(".container").removeChild(popupHtml)
    },1500)
   
    }
}
}

function winnerAllModes() {
    popupHtml.innerHTML = popupWinInnerText()
    disableKeyboard()
    return get(".container").append(popupHtml)

}


let popupHtml = ""
popupHtml = document.createElement("div")
popupHtml.className = "popup-container"
function renderLoseMenu() {

    popupHtml.innerHTML = popupLoseInnerText()
    return get(".container").append(popupHtml)
}
function resetKeyboard() {
    getAll(".key-btn").forEach(key => {
        key.disabled = false
        key.classList.remove("wrongLetter")
        key.classList.remove("correctLetter")
    })
    
}
function disableKeyboard() {
    getAll(".key-btn").forEach(key => key.disabled = true)
}

function CheckWrongLetterCounter() {
    return wrongClickedKeysArr.length
}

function revealWord() {
        Array.from(randomWord).map((letter) => {
            let check = getLetterIndex(letter)
            fillWord(check,letter)
        })

        get(".word").innerHTML = updateWord()
        
        console.log(get(".hangman"))
        if(checkNextPhase() == false) {
            console.log(checkNextPhase())
        setTimeout(() => {

            console.log("reveal")
            resetGame(currentMode)
        },3000)
    //}
    }
}
let isClueDisplayed = false
async function getClue(e) {
    if(isClueDisplayed === false) {
    if(e.target.className === "clue-button" || e.target.className === "info-icon" ) {
        let clue = await getWordClue(`https://api.dictionaryapi.dev/api/v2/entries/en/`,randomWord)
        renderClue(clue)
        isClueDisplayed = true
        
    }}
   else if(isClueDisplayed === true){ 
    get(".clue-container").classList.remove("open")
    get(".clue-container").setAttribute("clue","")
    isClueDisplayed = false
   }
}
/*get(".info-icon").addEventListener("click", (e) => {
   console.log("simm")

})*/
document.body.addEventListener("mouseover",(e) => {
    getClue(e)

})
document.body.addEventListener("touchstart",(e) => {
    console.log("OI")
    getClue(e)
})


getAll(".menu-option-btn").forEach(btn => btn.addEventListener("click",() => {
    console.log("Oiiii")
}))
let menuHtml = document.createElement("div")
menuHtml.className = "menu-container"
function renderMenu() {
     menuHtml.innerHTML = menuInnerText()
      
    get(".container").append(menuHtml)
    
}
renderMenu()
function renderClue(clue) {
    get(".clue-container").classList.add("open")
    get(".clue-container").setAttribute("clue",clue)
}
