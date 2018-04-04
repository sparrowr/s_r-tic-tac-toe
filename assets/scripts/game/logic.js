'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const state = require('./state')
const algorithm = require('./algorithm')

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
    const endString = 'The game ended in a draw!'
    $('#game-board').prepend('<h1>' + endString + '</h1>')
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
  if (state.game.game.id) {
    api.updateGame(data)
      .then(ui.updateGameSucccess)
      .catch(ui.updateGameFailure)
  }
}

const tokenSetter = function tokenSetter (id) {
  $('#game-area').html('')
  const n = id.split('').pop()
  if (state.game.game.cells[n] === '' && !state.game.game.over) {
    if (moveCounter() % 2 === 0) {
      $(id).html('<h1>X</h1>')
      onUpdateGame(n, 'X')
      if (algorithm.isActive() && !state.game.game.over) {
        // algorithm plays as player O
        algorithm.move()
      } else {
        $('#game-area').html('<p> It is now player O\'s turn! <p>')
      }
    } else {
      $(id).html('<h1>O</h1>')
      onUpdateGame(n, 'O')
      $('#game-area').html('<p> It is now player X\'s turn! <p>')
    }
  } else if (!state.game.game.over) {
    if (moveCounter() % 2 === 0) {
      $('#game-area').html('<p> It is now player X\'s turn! </p><p> You cannot move there! </p>')
    } else {
      $('#game-area').html('<p> It is now player O\'s turn! </p><p> You cannot move there! </p>')
    }
  } else {
    $('#game-area').html('<p> This game has ended! </p><p> Please begin a new game to keep playing. </p>')
  }
}

const onClickSquare = function onClickSquare () {
  tokenSetter('#' + this.id)
}

const newBoard = function newBoard () {
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
  const tmp = {}
  api.createGame(tmp)
    .then(startNewGame)
    .catch(ui.createGameFailure)
}

const playWithoutLogin = function playWithoutLogin () {
  $('#game-area').html('')
  state.game = {}
  state.game.game = {}
  state.game.game.over = false
  state.game.game.cells = ['', '', '', '', '', '', '', '', '']
  newBoard()
}

const showIndex = function showIndex () {
  event.preventDefault()
  api.showIndex()
    .then(ui.showIndexSuccess)
    .catch(ui.showIndexFailure)
}

const onAlgNo = function onAlgNo () {
  // play new game, not against computer
  event.preventDefault()
  algorithm.turnOff()
  if (store.user) {
    playWithLogin()
  } else {
    playWithoutLogin()
  }
}

const onAlgYes = function onAlgYes () {
  event.preventDefault()
  algorithm.turnOn()
  if (store.user) {
    playWithLogin()
  } else {
    playWithoutLogin()
  }
}

const showAlgorithmOptions = function showAlgorithmOptions () {
  hideGameOptions()
  const algYesForm = document.createElement('form')
  const algYesFormButton = document.createElement('input')
  algYesFormButton.setAttribute('type', 'submit')
  algYesFormButton.setAttribute('class', 'btn')
  algYesFormButton.setAttribute('value', 'Play against computer')
  algYesForm.appendChild(algYesFormButton)
  algYesForm.addEventListener('submit', onAlgYes)
  document.getElementById('game-area').appendChild(algYesForm)

  // show all past games
  const algNoForm = document.createElement('form')
  const algNoFormButton = document.createElement('input')
  algNoFormButton.setAttribute('type', 'submit')
  algNoFormButton.setAttribute('class', 'btn')
  algNoFormButton.setAttribute('value', 'Play against person')
  algNoForm.appendChild(algNoFormButton)
  algNoForm.addEventListener('submit', onAlgNo)
  document.getElementById('game-area').appendChild(algNoForm)
}

const hideGameOptions = function hideGameOptions () {
  $('#auth-area').html('')
  $('#game-area').html('')
}

const showGameOptions = function showGameOptions () {
  // show some game optiony things!
  hideGameOptions()

  const playGame = document.createElement('form')
  const playButton = document.createElement('input')
  playButton.setAttribute('type', 'submit')
  playButton.setAttribute('class', 'btn')

  if (store.user) {
    playButton.setAttribute('value', 'Play game while signed in!')
    // show all past games
    const showAllGames = document.createElement('form')
    const showIndexButton = document.createElement('input')
    showIndexButton.setAttribute('type', 'submit')
    showIndexButton.setAttribute('class', 'btn')
    showIndexButton.setAttribute('value', 'Show all past games')
    showAllGames.appendChild(showIndexButton)
    showAllGames.addEventListener('submit', showIndex)
    document.getElementById('game-area').appendChild(showAllGames)
  } else {
    playButton.setAttribute('value', 'Play game')
  }

  playGame.appendChild(playButton)
  playGame.addEventListener('submit', showAlgorithmOptions)
  document.getElementById('game-area').appendChild(playGame)

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
  showGameOptions,
  tokenSetter
}
