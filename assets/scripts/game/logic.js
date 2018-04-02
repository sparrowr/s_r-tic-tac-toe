'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const state = require('./state')

const winHandler = function winHandler (winner) {
  console.log('please update me to play nicely with the api!')
  console.log('player ' + winner + ' won')
  newBoard()
}

const moveCounter = function moveCounter () {
  // return number of moves made on board
  return 9
}

const victoryCheck = function victoryCheck () {
  console.log('please update me to play nicely with the api!')
  const gameState = state.cells
  // check for end conditions and handle appropriately
  if (gameState[4] !== '') {
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
  if (gameState[0] !== '') {
    // check for victory conditions involving the upper-left corner
    if (gameState[0] === gameState[1] && gameState[0] === gameState[2]) {
      winHandler(gameState[0])
    } else if (gameState[0] === gameState[3] && gameState[0] === gameState[6]) {
      winHandler(gameState[0])
    }
  }
  if (gameState[8] !== '') {
    // check for victory conditions involving the lower-right corner
    if (gameState[8] === gameState[2] && gameState[8] === gameState[5]) {
      winHandler(gameState[8])
    } else if (gameState[8] === gameState[7] && gameState[8] === gameState[6]) {
      winHandler(gameState[8])
    }
  }
  if (moveCounter() === 9) {
    console.log('board filled with no winner!')
    newBoard()
  }
}

const tokenSetter = function tokenSetter (id) {
  console.log('partially updated for API compatibility.')
  console.log('id is ', id)
  const n = id.split('').pop()
  const gameState = state.local.cells
  if (gameState[n] === 0) {
    if (moveCounter() % 2 === 0) {
      $(id).html('<h1>O</h1>')
      gameState[n] = 'O'
    } else {
      $(id).html('<h1>X</h1>')
      gameState[n] = 'X'
    }
    victoryCheck()
  } else {
    console.log('cannot move there!')
  }
}

const onClickSquare = function onClickSquare () {
  console.log('a click happen!')
  tokenSetter('#' + this.id)
}

const newBoard = function newBoard () {
  console.log('partway through updating newBoard to work with the api.')
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

const startNewGame = function startNewGame (data) {
  state.game = data
  console.log('data in startNewGame is ' + state.game)
  console.log('partway through updating this to work with the api!')
  newBoard()
}

const playWithLogin = function playWithLogin (event) {
  event.preventDefault()
  const tmp = {}
  api.createGame(tmp)
    .then(startNewGame)
    .catch(ui.createGameFailure)
}

const playWithoutLogin = function playWithoutLogin () {
  event.preventDefault()
  console.log('I\'m a stub')
}

const hideGameOptions = function hideGameOptions () {
  $('#game-area').html('')
}

const showGameOptions = function showGameOptions () {
  // show some game optiony things!
  hideGameOptions()

  if (store.user) {
    // start game while signed in
    const playLogin = document.createElement('form')
    const playLoginButton = document.createElement('input')
    playLoginButton.setAttribute('type', 'submit')
    playLoginButton.setAttribute('class', 'btn')
    playLoginButton.setAttribute('value', 'Play while signed in')
    playLogin.appendChild(playLoginButton)
    playLogin.addEventListener('submit', playWithLogin)
    document.getElementById('game-area').appendChild(playLogin)

    // soon: show index all past games, show one past game.
    /*
    const hideOptions = document.createElement('form')
    const hideOptionsButton = document.createElement('input')
    hideOptionsButton.setAttribute('type', 'submit')
    hideOptionsButton.setAttribute('class', 'btn')
    hideOptionsButton.setAttribute('value', 'Sign in')
    hideOptions.appendChild(hideOptionsButton)
    hideOptions.addEventListener('submit', hideGameOptions)
    document.getElementById('game-area').appendChild(hideOptions)
    */
  } else {
    // play game without logging in, eventually
    const playNoLogin = document.createElement('form')
    const playNoLoginButton = document.createElement('input')
    playNoLoginButton.setAttribute('type', 'submit')
    playNoLoginButton.setAttribute('class', 'btn')
    playNoLoginButton.setAttribute('value', 'Play without siging in!')
    playNoLogin.appendChild(playNoLoginButton)
    playNoLogin.addEventListener('submit', playWithoutLogin)
    document.getElementById('game-area').appendChild(playNoLogin)
  }

  // hide game options
  const hideOptions = document.createElement('form')
  const hideOptionsButton = document.createElement('input')
  hideOptionsButton.setAttribute('type', 'submit')
  hideOptionsButton.setAttribute('class', 'btn')
  hideOptionsButton.setAttribute('value', 'Hide game options')
  hideOptions.appendChild(hideOptionsButton)
  hideOptions.addEventListener('submit', hideGameOptions)
  document.getElementById('game-area').appendChild(hideOptions)
}

export {
  showGameOptions
}
