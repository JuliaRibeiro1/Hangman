import {foods} from "./wordsData.js"


const get = element => document.querySelector(element)
const getAll = element => document.querySelectorAll(element)
let randomWord = Math.floor(Math.random() * foods.length)
let wordPlaceholderArr = new Array(foods[randomWord].length)
wordPlaceholderArr.fill(`_`)
const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

updateWord()

alphabetArr.map((letter) => {
    get(".keyboard-container").innerHTML += renderKeys(letter)

})
function style() {

}
console.log(foods[randomWord])
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
    if(foods[randomWord].includes(e.target.textContent)) {
        let check = repetedLettersCheck(e.target.textContent)
        console.log(fillWord(check,e.target.textContent))
  
}}
function fillWord(check,letter) {
    check.map(item => {
        wordPlaceholderArr[item] = letter
    })
    updateWord()
    return wordPlaceholderArr
}
function repetedLettersCheck(letter) {
    let rightLetterIndexArr = []
    let wordArr = Array.from(foods[randomWord])
    
    for(let i = 0; i < wordArr.length;i++) {
        if(wordArr[i] == letter) {
            rightLetterIndexArr.push(i)
        }
    }
    return rightLetterIndexArr
}

fetch('https://api.dictionaryapi.dev/api/v2/entries/en/cheese')
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
