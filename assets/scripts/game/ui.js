'use strict'

const failureColor = '#933'
const successColor = '#393'

const createGameFailure = function () {
  $('#message').text('Failure creating game in API!')
  $('#message').css('background-color', failureColor)
}

const updateGameSuccess = function () {
  $('#message').text('Successfully updated game')
  $('#message').css('background-color', successColor)
}

const updateGameFailure = function () {
  $('#message').text('Failure updating game')
  $('#message').css('background-color', failureColor)
}

const showIndexSuccess = function (data) {
  $('#message').text('Retrieved games!')
  $('#message').css('background-color', successColor)
  console.log(data)
  console.log(data.games[0])
  $('#game-board').text('Your game history: ')
  for (let i = 0; i < data.games.length; i++) {
    console.log(i)
    console.log(data.games[i])
    console.log(data.games[i].id, data.games[i].cells, data.games[i].over)
    $('#game-board').append('<br>')
    const gameTitle = 'Game ID: ' + data.games[i].id
    $('#game-board').append('<h2>' + gameTitle + '</h2>')
    $('#game-board').append('<p>Board: </p>')
    for (let j = 0; j < 3; j++) {
      let row = '|'
      for (let k = 0; k < 3; k++) {
        if (data.games[i].cells[j * 3 + k] !== '') {
          row = row + data.games[i].cells[j * 3 + k] + '|'
        } else {
          row = row + '_|'
        }
      }
      $('#game-board').append('<p>', row, '</p>')
    }
    if (data.games[i].over) {
      $('#game-board').append('<p>', 'game is complete', '</p>')
    } else {
      $('#game-board').append('<p>', 'game is not complete', '</p>')
    }
  }
}

const showIndexFailure = function () {
  $('#message').text('Failure finding games')
  $('#message').css('background-color', failureColor)
}

module.exports = {
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  showIndexSuccess,
  showIndexFailure
}
