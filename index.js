import {foods} from "./wordsData.js"


const get = element => document.querySelector(element)
const getAll = element => document.querySelectorAll(element)
let randomWordIndex = Math.floor(Math.random() * foods.length)
let randomWord = foods[randomWordIndex]
console.log(randomWord)
let wordPlaceholderArr = new Array(foods[randomWordIndex].length)
wordPlaceholderArr.fill(`_`)
const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

updateWord()

alphabetArr.map((letter) => {
    get(".keyboard-container").innerHTML += renderKeys(letter)

})

console.log(foods[randomWordIndex])
function updateWord() {
let loopPlaceholder = ""
console.log(wordPlaceholderArr)
wordPlaceholderArr.map((letter) => {
   loopPlaceholder += `<div class="word-placeholder">${letter}</div>`
 //  wordPlaceholderArr.fill(`<div class="word-placeholder">${letter}</div>`)
   console.log(letter)
    get(".word").innerHTML = loopPlaceholder
})
}

function renderKeys(letter) {
    return `<button class=key-btn>${letter}</button>`
}

getAll(".key-btn").forEach(key => key.addEventListener("click",(e) => {
    wordIncludesLetterCheck(e)

}))
function wordIncludesLetterCheck(e) {
    if(randomWord.includes(e.target.textContent)) {
        let check = getLetterIndex(e.target.textContent)
        console.log(fillWord(check,e.target.textContent))
  
}}
function fillWord(check,letter) {
    check.map(item => {
        wordPlaceholderArr[item] = letter
    })
    updateWord()
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
get(".info-icon").addEventListener("mouseover",async () => {
    let clue = await getWordClue(`https://api.dictionaryapi.dev/api/v2/entries/en/`,randomWord)
    renderClue(clue)
    
})
function renderMenu() {
    let menu = `<div class=menu-container>
        <h1>hangman</h1>
        <div class=menu-options-container>
        <button class=menu-option-btn>Easy</button>
        <button class=menu-option-btn>Medium</button>
        <button class=menu-option-btn>Hard</button>
        </div>

    </div>`
    return get(".game-container").innerHTML = menu
}
renderMenu()
function renderClue(clue) {
    get(".clue-container").classList.add("open")
    get(".clue-container").setAttribute("clue",clue)
}
get(".info-icon").addEventListener("mouseleave", () => {
    get(".clue-container").classList.remove("open")
     get(".clue-container").setAttribute("clue","")/*.innerHTML = 
        `<div>
            <p>${clue}</p>
        </div>`*/
})
console.log(randomWord)

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