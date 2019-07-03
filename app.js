// Game values
let min = 1
let max = 10
let winningNum = getRandomNum(min, max)
let guessesLeft = 3

// UI Elements
const game = document.querySelector('#game')
const minNum = document.querySelector('.min-num')
const maxNum = document.querySelector('.max-num')
const guessBtn = document.querySelector('#guess-btn')
const guessInput = document.querySelector('#guess-input')
const message = document.querySelector('.message')

// Assign UI min and max
minNum.textContent = min
maxNum.textContent = max

// Play again event listener

game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value)

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct!, YOU WIN!`)

  } else {
    // Wrong number
    guessesLeft -= 1

    if (guessesLeft === 0) {
      // Game over lost
      gameOver(false, `Game over, you lost! The correct number was ${winningNum}`)

    } else {
      // Game continues
      guessInput.style.borderColor = 'red'
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
      // clear input
      guessInput.value = ''
    }
  }
})

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'
  // Disable input
  guessInput.disabled = true
  // Change border color
  guessInput.style.borderColor = color
  // Change color
  message.style.color = color
  // Set Message
  setMessage(msg)
  // Play again ?
  guessBtn.value = 'Play Again'
  guessBtn.className += 'play-again'
}
// Get winning Number

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// Set message

function setMessage(msg, color) {
  message.style.color = color
  message.textContent = msg
}