function head() {
    return get(".hangman").innerHTML += `<div class="head-container"><svg class="head">
    <circle cx=80% cy=80 r=30 stroke=white fill=transparent />
  </svg></div>`
}
function leftArm() {
    return get(".hangman").innerHTML += `<div class="left-arm-container"><svg class="left-arm">
    <line  x1="38%" y1="0" x2="38%" y2="70" stroke=white></line>
  </svg></div>`
}
//<rect x=38% y=0 width=5 height=80 fill=white></rect>
function rightArm() {
    return get(".hangman").innerHTML += `<div class="right-arm-container"><svg class="right-arm">
    <line  x1="64%" y1="0" x2="64%" y2="70" stroke=white></line>
  </svg></div>`
}
function leftLeg() {
    return get(".hangman").innerHTML += `<div class="left-leg-container"><svg class="left-leg">
    <line  x1="38%" y1="0" x2="38%" y2="70" stroke=white></line>
  </svg></div>`
}
function rightLeg() {
    return get(".hangman").innerHTML += `<div class="right-leg-container"><svg class="right-leg">
    <line  x1="64%" y1="0" x2="64%" y2="70" stroke=white></line>
  </svg></div>`
}
//<rect x=62% y=0 width=5 height=80 fill=white />
function body() {
    return get(".hangman").innerHTML += `<div class="body-container"><svg class="body">
    <line  x1="51%" y1="0" x2="51%" y2="90" stroke=white></line>
  </svg></div>`
}
//x1=50% x2=0 width=5 height=110
head()
body()
leftArm()
rightArm()
leftLeg()
rightLeg()
export {header,body,leftArmm,rightArm,leftLeg,rightLeg}