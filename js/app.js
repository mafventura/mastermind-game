// * GLOBAL VARIABLES
const width = 20
const height = 20
let cells = []
const cellCount = width * height
const colors = ['blue', 'red', 'orange', 'yellow', 'green']
let guess = []
let code = []
let colorChoice
let tries = 0
let win = false

// * CACHED ELEMENTS
const chooseBlue = document.getElementById('blue')
const chooseRed = document.getElementById('red')
const chooseYellow = document.getElementById('yellow')
const chooseOrange = document.getElementById('orange')
const chooseGreen = document.getElementById('green')

const guess1 = document.getElementById('guess1')
const guess2 = document.getElementById('guess2')
const guess3 = document.getElementById('guess3')
const guess4 = document.getElementById('guess4')

const code1 = document.getElementById('code1')
const code2 = document.getElementById('code2')
const code3 = document.getElementById('code3')
const code4 = document.getElementById('code4')
let codes = [code1, code2, code3, code4]


const submit = document.getElementById('submit')
const reset = document.getElementById('reset')
const playAgain = document.getElementById('playAgain')

const log = document.getElementById('log')

//* EVENT LISTENERS

chooseBlue.addEventListener('click', function () {
    colorChoiceBlue();
    handleButtonClick(chooseBlue);
});
chooseRed.addEventListener('click', function () {
    colorChoiceRed();
    handleButtonClick(chooseRed);
});
chooseYellow.addEventListener('click', function () {
    colorChoiceYellow();
    handleButtonClick(chooseYellow);
});
chooseOrange.addEventListener('click', function () {
    colorChoiceOrange();
    handleButtonClick(chooseOrange);
});
chooseGreen.addEventListener('click', function () {
    colorChoiceGreen();
    handleButtonClick(chooseGreen);
});

guess1.addEventListener('click', transferColor)
guess2.addEventListener('click', transferColor)
guess3.addEventListener('click', transferColor)
guess4.addEventListener('click', transferColor)

submit.addEventListener('click', submitGuess)
reset.addEventListener('click', resetGuess)
playAgain.addEventListener('click', resetGame)


//* FUNCTIONS

for (let i = 0; i < 4; i++) {
    code.push(colors[getRandomIdx()])
}

function getRandomIdx () {
    let randomIdx = Math.floor(Math.random() * colors.length)
    return randomIdx
}

function compareCodes(code, guess) {

    const isEqual = code.every((value, index) => value === guess[index]);

    if (isEqual) {
        const message = document.createElement('p')
        message.innerText = `You got it!! That's the correct code :)`
        log.appendChild(message)
        code1.classList.add(code[0])
        code2.classList.add(code[1])
        code3.classList.add(code[2])
        code4.classList.add(code[3])

    } else {

        for (let i = 0; i < 4; i++) {
            if (code[i] === guess[i]) {
                let position  = i + 1
                const message = document.createElement('p')
                message.innerText = `${guess[i]} in the position ${position} is the correct color in the correct spot`
                log.appendChild(message)
                let correctGuess = codes[i]
                correctGuess.classList.add(guess[i])
                
            } else if (code.includes(guess[i]))  {
                let position  = i + 1
                const message = document.createElement('p')
                message.innerText = `${guess[i]} in the position ${position} is the correct color in the wrong spot`
                log.appendChild(message)
            } else {
                const message = document.createElement('p')
                message.innerText = `${guess[i]} does not exist in the code`
                log.appendChild(message)
            }
        }
    }

}

function colorChoiceBlue() {
    colorChoice = 'blue'
}

function colorChoiceRed() {
    colorChoice = 'red'
}

function colorChoiceYellow() {
    colorChoice = 'yellow'
}

function colorChoiceOrange() {
    colorChoice = 'orange'
}

function colorChoiceGreen() {
    colorChoice = 'green'
}

function transferColor(event) {
    let targetedGuessButton = event.target

    if (colorChoice === 'blue') {
        targetedGuessButton.classList.remove(...colors)
        targetedGuessButton.classList.add('blue')
    } else if (colorChoice === 'red') {
        targetedGuessButton.classList.remove(...colors)
        targetedGuessButton.classList.add('red')
    } else if (colorChoice === 'yellow') {
        targetedGuessButton.classList.remove(...colors)
        targetedGuessButton.classList.add('yellow')
    } else if (colorChoice === 'orange') {
        targetedGuessButton.classList.remove(...colors)
        targetedGuessButton.classList.add('orange')
    } else if (colorChoice === 'green') {
        targetedGuessButton.classList.remove(...colors)
        targetedGuessButton.classList.add('green')
    } 

}

function submitGuess() {

    clearLog()

    guess = []

    colors.forEach((color)  => {
        if (guess1.classList.contains(color) === true) {
            guess[0] = color
        }
    })

    colors.forEach((color)  => {
        if (guess2.classList.contains(color) === true) {
            guess[1] = color
        }
    })

    colors.forEach((color)  => {
        if (guess3.classList.contains(color) === true) {
            guess[2] = color
        }
    })

    colors.forEach((color)  => {
        if (guess4.classList.contains(color) === true) {
            guess[3] = color
        }
    })

    if (guess.length < 4) {
        window.alert('Not enough colors')
        return
    }

    compareCodes(code, guess)

    }

function resetGuess() {
    guess1.classList.remove(...colors)
    guess2.classList.remove(...colors)
    guess3.classList.remove(...colors)
    guess4.classList.remove(...colors)
    guess = []
    
}

function resetGame() {
    clearLog()

    code1.classList.remove(...colors)
    code2.classList.remove(...colors)
    code3.classList.remove(...colors)
    code4.classList.remove(...colors)

    resetGuess()

    code = []

    for (let i = 0; i < 4; i++) {
        code.push(colors[getRandomIdx()])
    }
}

function clearLog() {
    while (log.lastElementChild) {
        log.removeChild(log.lastElementChild);
    }
}

function handleButtonClick(button) {
    document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}