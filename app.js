//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI elements
const gameElement = document.querySelector('#game'),
      minNumElement = document.querySelector('#min-num'),
      maxNumElement = document.querySelector('#max-num'),
      guessBtnElement = document.querySelector('#guess-btn'),
      guessInputElement = document.querySelector('#guess-input'),
      messageElement = document.querySelector('#message');

// Assign UI min and max
minNumElement.textContent = min;
maxNumElement.textContent = max;

// Event listeners

// Play again
gameElement.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Guess
guessBtnElement.addEventListener('click',() => {
  let guess = parseInt(guessInputElement.value);
  //Validate
  if(isNaN(guess)  || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  // Check if won
  if(guess === winningNum){
    gameOver(true);
  } else {
    guessesLeft -= 1;
    if(guessesLeft === 0){
      gameOver(false);
    } else {
      // Game continues - answer wrong
      guessInputElement.style.borderColor = 'red';
      setMessage(`${guess} is not correct! ${guessesLeft} guesses left`, 'red');
      guessInputElement.value = '';
    }
  }

});

function setMessage(msg, color){
  messageElement.style.color = color;
  messageElement.textContent = msg;
}

function gameOver(won){
  let color = won ? 'green' : 'red';
  let message = won ? `Congratulations! ${winningNum} is correct!` : `No more guesses. You lose! The correct answer was ${winningNum}`;
  guessInputElement.disabled = true;
  guessInputElement.style.borderColor = color;
  setMessage(message, color);
  guessBtnElement.value = 'Play Again';
  guessBtnElement.className += 'play-again';
  // setMessage(`Congratulations! ${winningNum} is correct!`, 'green');
}

function getRandomNum(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
    
