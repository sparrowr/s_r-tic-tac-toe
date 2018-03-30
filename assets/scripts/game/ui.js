'use strict'

let moveCount = 0
let gameState = []

const onClickSquare = function onClickSquare () {
  console.log('a click happen!')
  tokenSetter('#' + this.id)
}

const newBoard = function newBoard () {
  moveCount = 0
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  $('#game-board').html('')
  for (let i = 0; i < 3; i++) {
    const thisRow = document.createElement('div')
    thisRow.setAttribute('class', 'row')
    thisRow.setAttribute('id', 'row' + i)
    for (let j = 0; j < 3; j++) {
      const thisSquare = document.createElement('div')
      thisSquare.setAttribute('id', 'square' + (i * 3 + j))
      thisSquare.setAttribute('class', 'col-xs-4 square')
      thisSquare.addEventListener('click', onClickSquare)
      thisRow.appendChild(thisSquare)
    }
    document.getElementById('game-board').appendChild(thisRow)
  }
}

const winHandler = function winHandler (winner) {
  console.log('player ' + winner + ' won')
  newBoard()
}

const victoryCheck = function victoryCheck () {
  // check for end conditions and handle appropriately
  if (gameState[4] !== 0) {
    // check for victory conditions involving the center square
    if (gameState[4] === gameState[0] && gameState[4] === gameState[8]) {
      winHandler(gameState[4])
    } else if (gameState[4] === gameState[2] && gameState[4] === gameState[6]) {
      winHandler(gameState[4])
    } else if (gameState[4] === gameState[1] && gameState[4] === gameState[7]) {
      winHandler(gameState[4])
    } else if (gameState[4] === gameState[3] && gameState[4] === gameState[5]) {
      winHandler(gameState[4])
    }
  }
  if (gameState[0] !== 0) {
    // check for victory conditions involving the upper-left corner
    if (gameState[0] === gameState[1] && gameState[0] === gameState[2]) {
      winHandler(gameState[0])
    } else if (gameState[0] === gameState[3] && gameState[0] === gameState[6]) {
      winHandler(gameState[0])
    }
  }
  if (gameState[8] !== 0) {
    // check for victory conditions involving the lower-right corner
    if (gameState[8] === gameState[2] && gameState[8] === gameState[5]) {
      winHandler(gameState[8])
    } else if (gameState[8] === gameState[7] && gameState[8] === gameState[6]) {
      winHandler(gameState[8])
    }
  }
  if (moveCount === 9) {
    console.log('board filled with no winner!')
    newBoard()
  }
}

const tokenSetter = function tokenSetter (id) {
  console.log('id is ', id, ' and moveCount is ', moveCount)
  const n = id.split('').pop()
  console.log('we\'re now going live now to square number ' + n)

  if (gameState[n] === 0) {
    if (moveCount % 2 === 0) {
      $(id).html('<h1>O</h1>')
      gameState[n] = 'O'
    } else {
      $(id).html('<h1>X</h1>')
      gameState[n] = 'X'
    }
    victoryCheck()
    moveCount += 1
  } else {
    console.log('cannot move there!')
  }
}

export {
  newBoard,
  tokenSetter
}
