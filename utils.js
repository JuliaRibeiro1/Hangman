
let get = element => document.querySelector(element)

function head() {
    return get(".hangman").innerHTML += `<div class="head-container"><svg class="head">
    <circle cx=50% cy=32 r=30  />
  </svg></div>`
}
function leftArm() {
    return get(".hangman").innerHTML += `<div class="left-arm-container"><svg class="left-arm">
    <line  x1="38%" y1="0" x2="38%" y2="50"></line>
  </svg></div>`
}

function rightArm() {
    return get(".hangman").innerHTML += `<div class="right-arm-container"><svg class="right-arm">
    <line  x1="62%" y1="0" x2="62%" y2="50"></line>
  </svg></div>`
}
function leftLeg() {
    return get(".hangman").innerHTML += `<div class="left-leg-container"><svg class="left-leg">
    <line  x1="43%" y1="0" x2="43%" y2="50" ></line>
  </svg></div>`
}
function rightLeg() {
    return get(".hangman").innerHTML += `<div class="right-leg-container"><svg class="right-leg">
    <line  x1="57%" y1="0" x2="57%" y2="50" ></line>
  </svg></div>`
}

function body() {
    return get(".hangman").innerHTML += `<div class="body-container"><svg class="body">
    <line  x1="50%" y1="0" x2="50%" y2="80" ></line>
  </svg></div>`
}

async function getWordClue(url,word) {
  try{
      const res = await fetch(`${url}${word}`) 
      
      if(!res.ok) {
        throw Error("Cor indisponível")
      }
      const data = await res.json()

    return getShortDefinition(data[0].meanings[0].definitions[0].definition)


}catch(err){alert(err)};
}
function getShortDefinition(definition) {
  let short = ";" || "." || ":"
 
 if(definition.includes(short)) {
      return definition.split(short)[0] + "." // serve para "cortar" a definição para deixar o texto mais curto e resumido.

 }
 else {
  return definition
 }

}
function popupLoseInnerText() {
  return `
  <div class="popup">
  <h2 style="color:red">YOU LOSE</h2>
  <button class="menu-btn">MENU</button>
  <button class="start-again-btn">START AGAIN</button>
  </div>`
}
function menuInnerText() {
  get(".top-container").style.display = "none"
  return `<div class=menu>
  <h1>hangman</h1>
  <div class=menu-options-container>
      <button class="menu-option-btn" id="easy-mode-btn" >Easy</button>
      <button class="menu-option-btn" id="medium-mode-btn" >Medium</button>
      <button class="menu-option-btn" id="hard-mode-btn" >Hard</button>
  </div>
  </div>`
}
function popupWinInnerText() {
  return `
  <div class="popup">
  <h2>YOU WIN!</h2>
  <button class="menu-btn">MENU</button>
  </div>`
}
function popupNextPhaseInnerText() {
  return `  <div class="popup">
  <h2>NEXT PHASE</h2>
  </div>`
}

export {head,body,leftArm,rightArm,leftLeg,rightLeg,getWordClue,menuInnerText,popupLoseInnerText,popupWinInnerText, popupNextPhaseInnerText}