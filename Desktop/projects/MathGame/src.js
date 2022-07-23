const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNedded = document.querySelector(".points-needed")
const mistakes =  document.querySelector(".mistakes")
const progressBar =  document.querySelector(".progress-inner")
const endMsg =  document.querySelector(".msg-overlay")
const overlayBtn = document.querySelector(".overlay-btn")

let state = {
    score: 0,
    wrongAnswer: 0
}

function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourField.value = ''
    ourField.focus()
}

updateProblem()

function generateNum(num){
    return Math.floor(Math.random() * num + 1)
}

function generateProblem(){
    return {
        numberOne: generateNum(10),
        numberTwo: generateNum(10),
        operator: ['-', '+', 'x'][generateNum(2)]
    }
}

ourForm.addEventListener('submit', e => {
    e.preventDefault()

    let correctAnswer
    const p = state.currentProblem

    if(p.operator == '+') correctAnswer = p.numberOne + p.numberTwo
    if(p.operator == '-') correctAnswer = p.numberOne - p.numberTwo
    if(p.operator == 'x') correctAnswer = p.numberOne * p.numberTwo

    if(parseInt(ourField.value, 10) == correctAnswer){
        state.score++
        pointsNedded.textContent = 10 - state.score
        updateProblem()
        renderProgressBar()
    }
    else{
        problemElement.classList.add("animate-text-wrong")
        setTimeout(() => problemElement.classList.add("animate-text-wrong") ,331)
        state.wrongAnswer++
        mistakes.textContent = 2 - state.wrongAnswer
    }
    checkLogic()
})

function checkLogic(){
    if(state.score === 10){
        endMsg.textContent = "you win"
        document.body.classList.add("is-overlay-open")
        setTimeout(() => overlayBtn.focus(), 301)
    }

    if(state.wrongAnswer ==3){
        endMsg.textContent = "You lost"
        document.body.classList.add("is-overlay-open")
        setTimeout(() => overlayBtn.focus(), 301)
    }
}

function renderProgressBar(){
    progressBar.style.transform = `scaleX(${state.score/10})`
}

overlayBtn.addEventListener('click', resetGame)

function resetGame(){
    document.body.classList.remove("is-overlay-open")
    updateProblem()
    state.score = 0
    state.wrongAnswer = 0
    renderProgressBar()
    pointsNedded.textContent = 10
    mistakes.textContent = 2
}