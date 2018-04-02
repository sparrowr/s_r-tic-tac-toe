'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const state = require('./state')

const moveCounter = function moveCounter () {
  // return number of squares filled on board
  let moves = 0
  for (let i = 0; i < state.game.game.cells.length; i++) {
    if (state.game.game.cells[i] !== '') {
      moves++
    }
  }
  return moves
}

const winHandler = function winHandler (winner) {
  showGameOptions()
  const winString = 'Player ' + winner + ' has won the game!'
  $('#game-board').prepend('<h1>' + winString + '</h1>')
}

const victoryCheck = function victoryCheck () {
  // prepend winner announcement to game board
  // return T or F
  if (state.game.game.cells[4] !== '') {
    // check for victory conditions involving the center square
    if (state.game.game.cells[4] === state.game.game.cells[0] && state.game.game.cells[4] === state.game.game.cells[8]) {
      winHandler(state.game.game.cells[4])
      return true
    } else if (state.game.game.cells[4] === state.game.game.cells[2] && state.game.game.cells[4] === state.game.game.cells[6]) {
      winHandler(state.game.game.cells[4])
      return true
    } else if (state.game.game.cells[4] === state.game.game.cells[1] && state.game.game.cells[4] === state.game.game.cells[7]) {
      winHandler(state.game.game.cells[4])
      return true
    } else if (state.game.game.cells[4] === state.game.game.cells[3] && state.game.game.cells[4] === state.game.game.cells[5]) {
      winHandler(state.game.game.cells[4])
      return true
    }
  }
  if (state.game.game.cells[0] !== '') {
    // check for victory conditions involving the upper-left corner
    if (state.game.game.cells[0] === state.game.game.cells[1] && state.game.game.cells[0] === state.game.game.cells[2]) {
      winHandler(state.game.game.cells[0])
      return true
    } else if (state.game.game.cells[0] === state.game.game.cells[3] && state.game.game.cells[0] === state.game.game.cells[6]) {
      winHandler(state.game.game.cells[0])
      return true
    }
  }
  if (state.game.game.cells[8] !== '') {
    // check for victory conditions involving the lower-right corner
    if (state.game.game.cells[8] === state.game.game.cells[2] && state.game.game.cells[8] === state.game.game.cells[5]) {
      winHandler(state.game.game.cells[8])
      return true
    } else if (state.game.game.cells[8] === state.game.game.cells[7] && state.game.game.cells[8] === state.game.game.cells[6]) {
      winHandler(state.game.game.cells[8])
      return true
    }
  }
  if (moveCounter() === 9) {
    // board fileld with no winner
    showGameOptions()
    const endDeclaration = document.createElement('h2')
    const endString = 'The game ended in a draw!'
    endDeclaration.setAttribute('value', endString)
    document.getElementById('game-area').appendChild(endDeclaration)
    return true
  }
  return false
}

const onUpdateGame = function updateGame (index, value) {
  const data = {
    game: {
      cell: {
        index,
        value
      }
    }
  }
  // update game locally
  state.game.game.cells[index] = value
  // then check for victory
  state.game.game.over = victoryCheck()
  if (state.game.game.over) {
    data.game.over = state.game.game.over
  }
  // then update game on backend if it was created on the backend
  console.log('state.game.game', state.game.game)
  if (state.game.game.id) {
    api.updateGame(data)
      .then(ui.updateGameSucccess)
      .catch(ui.updateGameFailure)
  }
}

const tokenSetter = function tokenSetter (id) {
  const n = id.split('').pop()
  if (state.game.game.cells[n] === '' && !state.game.game.over) {
    if (moveCounter() % 2 === 0) {
      $(id).html('<h1>X</h1>')
      onUpdateGame(n, 'X')
    } else {
      $(id).html('<h1>O</h1>')
      onUpdateGame(n, 'O')
    }
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
  hideGameOptions()
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
  state.game = {}
  state.game.game = {}
  state.game.game.over = false
  state.game.game.cells = ['', '', '', '', '', '', '', '', '']
  console.log('state.game', state.game)
  newBoard()
}

const showIndex = function showIndex () {
  event.preventDefault()
  api.showIndex()
    .then(ui.showIndexSuccess)
    .catch(ui.showIndexFailure)
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

    // show all past games
    const showAllGames = document.createElement('form')
    const showIndexButton = document.createElement('input')
    showIndexButton.setAttribute('type', 'submit')
    showIndexButton.setAttribute('class', 'btn')
    showIndexButton.setAttribute('value', 'Show all past games')
    showAllGames.appendChild(showIndexButton)
    showAllGames.addEventListener('submit', showIndex)
    document.getElementById('game-area').appendChild(showAllGames)

    // soon: show one past game.
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
