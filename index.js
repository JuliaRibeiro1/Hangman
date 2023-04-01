import {foods,words} from "./wordsData.js"


const get = element => document.querySelector(element)
const getAll = element => document.querySelectorAll(element)

const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let easyMode = words.easy
let mediumMode = words.medium
let hardMode = words.hard
let randomWord;

function renderKeyboard() {
    let keys = ""
alphabetArr.map((letter) => {
    keys += renderKeys(letter)

})
return keys
}
let wordPlaceholderArr;
function fillArrPlaceholder(mode) {
    let randomWordIndex = Math.floor(Math.random() * mode.length)
//let randomWord = foods[randomWordIndex]*/

wordPlaceholderArr= new Array(randomWord.length)
wordPlaceholderArr.fill(`_`)
    return wordPlaceholderArr
}

function getRandomWord(mode) {
    let randomWordIndex = Math.floor(Math.random() * mode.length)
    randomWord = mode[randomWordIndex]
    console.log(randomWord.trim())
    randomWord = randomWord.replaceAll(' ', '');
    return randomWord
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

function renderGame() {
   // console.log(a)
   get(".game-container").removeChild(menuHtml)
     gameHtml.innerHTML = `<div class="clue-container">
    <img class="info-icon" src="images/info-icon.svg"/>
    </div>
    <div class="hangman">
        <div class="string-container">
            <svg class="string">
                <rect x="50%" y="0" width="5" height="50"
                style="fill:rgb(255, 255, 255);" />
            </svg>
        </div>
    </div>
    <div class="word">${updateWord()}</div>
    <div class="keyboard-container">${renderKeyboard()}</div>`
    //get(".game-container").innerHTML = gameHtml.innerHTML
     get(".game-container").append(gameHtml)
}

function renderKeys(letter) {

    return `<button class=key-btn>${letter}</button>`
}
let clickedKeysArr = []
getAll(".key-btn").forEach(key => key.addEventListener("click",(e) => {
    console.log("OI")
    if(!clickedKeysArr.includes(e.target)) {
        console.log()
    wordIncludesLetterCheck(e)
    clickedKeysArr.push(e.target)

    }
    console.log(clickedKeysArr)

}))

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
        resetGame(currentMode)
        renderGame()

    }
    else if(e.target.id == "medium-mode-btn") {
        currentMode = mediumMode
        resetGame(currentMode)
        renderGame()

    }
    else if(e.target.id == "hard-mode-btn") {
        currentMode = hardMode
        resetGame(currentMode)
        renderGame()
    }
    else if(e.target.className == "key-btn") {
        if(!clickedKeysArr.includes(e.target.textContent)) {
            console.log()
        wordIncludesLetterCheck(e)
        clickedKeysArr.push(e.target.textContent)
        e.target.disabled = true
       checkWin()
        } 
    }  
})
function resetGame(mode) {
    getRandomWord(mode)
    fillArrPlaceholder(mode)
}
function checkWin() {
    if(!wordPlaceholderArr.includes("_")) {
        setTimeout(() => {
            resetKeyboard()
            clickedKeysArr.length = 0
            resetGame(currentMode)
            get(".word").innerHTML = updateWord()
        },1000)
    }
}
function resetKeyboard() {
    getAll(".key-btn").forEach(key => key.disabled = false)
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
     menuHtml.innerHTML = `<div class=menu-container>
        <h1>hangman</h1>
        <div class=menu-options-container>
            <button class="menu-option-btn" id=easy-mode-btn>Easy</button>
            <button class="menu-option-btn" id=medium-mode-btn>Medium</button>
            <button class="menu-option-btn" id=hard-mode-btn>Hard</button>
        </div>
    </div>`
    console.log(menuHtml)
    get(".game-container").append(menuHtml)
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