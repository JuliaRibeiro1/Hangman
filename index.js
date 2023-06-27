
import {head,body,leftArm,rightArm,leftLeg,rightLeg,getWordClue,menuInnerText,popupLoseInnerText,popupWinInnerText,popupNextPhaseInnerText} from "./utils.js"

const get = element => document.querySelector(element)
const getAll = element => document.querySelectorAll(element)
const hangmanBodyFunctions = [head,body,leftArm,rightArm,leftLeg,rightLeg]
const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const modeMap = {
    easy: { text: "EASY MODE", color: "green", words: ["APPLE","NOSE","CAT","SHOULDERS","LEMON","MOTHER","HAT","CABBAGE","HOME","PASTA","BOOK",
    "EGG","DOG","COAT","LASAGNA","GARDEN","HORSE","PAPER","BIRD","MILK","SMOKE","COW","EYE","BREAD","CHICKEN","SNOW","SHOES","WATER","LETTER","FLOWER","CHAIR","BABY","HAPPY","FRIEND","ACTOR","JUICE","LADY","RAIN"] },
    medium: { text: "MEDIUM MODE", color: "orange",words:["AQUATIC","EVIDENT","DIVERSITY","KANGAROO","ALCOHOL","BUSINESS","FREEDOM","NEIGHBOR","PLANET",
    "STOMACH","MARKET","INTERVIEW","PHENOMENON","CELEBRATION","GRAVE","SHRIMP","TRIVIA","COUNTRY","SMILE","USEFUL","TELEPHONE","PANCAKE","LEGACY","RESTAURANT","SINGLE","DANGEROUS","LEOPARD","POLAR BEAR","MACHINE","SILENCE"] },
    hard: { text: "HARD MODE", color: "red", words:["VIRTUAL","EMPATHY","MARGARINE","IRONY","HAM","SYNTAX","OTTER","CLANDESTINE","OGRE","PRESAGE","HOLISTIC","PARADOX","SATIRE","REFLECTION","SCIENCE","AMBIVALENT","PARADIGM",
    "CALUMNY","UBIQUITOUS","APATHETIC","NEGLIGENT","VOCIFEROUS","STATE","RHYTHM"]},
};

let randomWord = ""
let wordPlaceholderArr;
let currentMode;

function fillArrPlaceholder() {
    wordPlaceholderArr= new Array(randomWord.length)
    return wordPlaceholderArr.fill(`_`)
}

let randomWordIndex = ""
function getRandomWord(mode) {

    let words = mode.words
    randomWordIndex = Math.floor(Math.random() * words.length)
    randomWord = words[randomWordIndex]
    updateArr(words)
    return randomWord
}

function updateArr(mode) { // irá remover a palavra que já foi "sorteada" para o usuário do array words
    return mode.splice(randomWordIndex,1)
}

function renderKeyboard() {
    let keys = ""
    alphabetArr.map((letter) => {
    keys +=  `<button class=key-btn>${letter}</button>`
  })
  return keys
}

function updateWord(word) {
    let loopPlaceholder = ""
    word.map((letter) => {
    loopPlaceholder += `<div class="word-placeholder">${letter}</div>`
    })
    return loopPlaceholder
}

let gameHtml = document.createElement("div")
let points,winRounds,totalRounds
cleanScore()

function renderGame() {
   get(".container").removeChild(menuHtml)
   get(".top-container").style.display = "flex"
   gameHtml.className = "game-container"
     gameHtml.innerHTML = `
    <div class=bottom-container flex>
    <div class="word">${updateWord(wordPlaceholderArr)}</div>
    <div class="keyboard-container">${renderKeyboard()}</div>
    </div>`
  
   get(".container").append(gameHtml)
}

let arr = ["head","body","left-arm","right-arm","left-leg","right-leg"]
let animations = ["headAnimation1","bodyAnimation","leftArmAnimation","rightArmAnimation","leftLegAnimation","rightLegAnimation"]
let clickedKeysArr = []
let wrongClickedKeysArr = []

function wordIncludesLetterCheck(e) {
if(!isRenderingNextPhase) {
    if(randomWord.includes(e.target.textContent)) {
        let checkIndex = getLetterIndex(e.target.textContent) // SE aquela palavra possui a letra que o usuário clicou ele será 
         fillWord(checkIndex,e.target.textContent)
         checkWin()
         e.target.classList.add("correctLetter")
}
    else {
        let i = wrongClickedKeysArr.length 
        e.target.classList.add("wrongLetter")
        wrongClickedKeysArr.push(e.target.textContent)
        checkLose()
        hangmanBodyFunctions[i]()
        get(`.${arr[i]}`).classList.add(`${animations[i]}`)
        setTimeout(() => {
            get(`.${arr[i]}`).classList.remove(`${animations[i]}`) // Irá evitar com que ocorra todas as animações do "corpo" se repita quando um novo membro é adicinado.
        },500)
    }
}}

function fillWord(check,letter) {
    check.map(item => {
        wordPlaceholderArr[item] = letter // Irá substituir os traços pelas letras que se encontram no indice correspondente.
    })
    get(".word").innerHTML = updateWord(wordPlaceholderArr)
    return wordPlaceholderArr
}
function getLetterIndex(letter) {
    let rightLetterIndexArr = []
    let wordArr = Array.from(randomWord)
    
    for(let i = 0; i < wordArr.length;i++) {
        if(wordArr[i] == letter) {
            rightLetterIndexArr.push(i) // irá retornar qual são os index que aquela letra se encontra na palavra para que o espaço possa ser preenchido.
        }
    }
    return rightLetterIndexArr
}

document.body.addEventListener("click", (e) => {
     if(e.target.id == "easy-mode-btn" || e.target.id == "medium-mode-btn" || e.target.id == "hard-mode-btn") {
        currentMode = e.target.id == "easy-mode-btn"  ? modeMap.easy : e.target.id == "medium-mode-btn" ? modeMap.medium : modeMap.hard
        isRenderingNextPhase = false
        startGame(currentMode)
        renderGame()
    }
    else if(e.target.className == "key-btn") {
        if(!clickedKeysArr.includes(e.target.textContent)) {
        wordIncludesLetterCheck(e)
        clickedKeysArr.push(e.target.textContent)
        e.target.disabled = true
        } 
    }  
    else if(e.target.className == "menu-btn") {
        get(".container").removeChild(popupHtml)
        get(".container").removeChild(gameHtml)
        cleanScore()
        renderMenu()
        get(".hangman").innerHTML = `<img src="images/icons8-hang-100.png"/>`
        
    }
    else if(e.target.className == "start-again-btn") {
        resetGame(currentMode)
        cleanScore()
        get(".container").removeChild(popupHtml)
    }
})
function cleanScore() {
    points = winRounds = totalRounds = 0
    get(".win-rounds").textContent = winRounds
    get(".points span").textContent = points
    get(".total-rounds").textContent = totalRounds
}

  function setModeTextAndColor(mode) {
    const modeInfo = mode;
    get(".mode").textContent = modeInfo.text;
    get(".mode").style.color = modeInfo.color;
  }

function startGame(mode) {
    getRandomWord(mode)
    fillArrPlaceholder(mode)
    resetKeyboard()
    clickedKeysArr.length = 0
    wrongClickedKeysArr.length = 0
    setModeTextAndColor(mode)
    }

function resetGame(mode) {
    startGame(mode)
    get(".word").innerHTML = updateWord(wordPlaceholderArr)
    get(".hangman").innerHTML = `<img src="images/icons8-hang-100.png"/>`
}

function checkWin() {
    if(!wordPlaceholderArr.includes("_")) {
        setTimeout(() => {
            disableKeyboard()
            updatePoints()
            updateRounds()
            resetGame(currentMode)
        },1000)
    }}

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
    if(wrongClickedKeysArr.length < 6) {
        winRounds+=1
        get(".win-rounds").textContent = winRounds
    }
   totalRounds+=1
   get(".total-rounds").textContent = totalRounds
}

function checkNextPhase() {
    if(totalRounds === winRounds  + 2) { // o usuário perde jogo caso o usuáiro perca 3 vezes
        renderLoseMenu()
        return true
    }else {
      
        return false
    }
}

let isRenderingNextPhase = false
function renderNextPhase() {
    let NextMode = currentMode == modeMap.easy? modeMap.medium : currentMode == modeMap.medium ? modeMap.hard : modeMap.hard
    let round = totalRounds == 2 || totalRounds == 10 || totalRounds == 15
   
    if(checkNextPhase() == false && round) {
       isRenderingNextPhase = true
       disableKeyboard()
        if(currentMode == modeMap.hard) {
            setTimeout(() => {
                winnerAllModes()
               
            },1500)
           
        }
        else {
        currentMode = NextMode
        popupHtml.innerHTML = popupNextPhaseInnerText()
        get(".container").append(popupHtml)
        setTimeout(() => {
            isRenderingNextPhase = false
            get(".container").removeChild(popupHtml)
        },1500)
    }}
}

function winnerAllModes() {
    popupHtml.innerHTML = popupWinInnerText()
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

function revealWord() {
       get(".word").innerHTML = updateWord(Array.from(randomWord)) // Revela a palavra correta ao usuário.

      if(checkNextPhase() == false) {
        setTimeout(() => {
            resetGame(currentMode)
        },3000)
    }
}

async function getClue(e) {
    if(e.target.className === "clue-button"  || e.target.className === "info-icon" ) {
        let clue = await getWordClue(`https://api.dictionaryapi.dev/api/v2/entries/en/`,randomWord)
        renderClue(clue)      
    } 
   else { 
    get(".clue-container").classList.remove("open")
    get(".clue-container").setAttribute("clue","")
   }
}
document.body.addEventListener("mouseover",(e) => {
    getClue(e)

})
document.body.addEventListener("touchstart",(e) => {
    getClue(e)
})

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
