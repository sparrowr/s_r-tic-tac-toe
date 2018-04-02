'use strict'

const createGameFailure = function () {
  $('#message').text('Failure creating game in API!')
  $('#message').css('background-color', '#f99')
}

const updateGameSuccess = function () {
  $('#message').text('Successfully updated game')
  $('#message').css('background-color', '#cfc')
}

const updateGameFailure = function () {
  $('#message').text('Failure updating game')
  $('#message').css('background-color', '#f99')
}

const showIndexSuccess = function (data) {
  $('#message').text('Retrieved games!')
  $('#message').css('background-color', '#cfc')
  $('#game-board').text('Your game history: ')
  for (let i = 0; i < data.length; i++) {
    $('#game-board').append(data[i])
  }
}

const showIndexFailure = function () {
  $('#message').text('Failure updating game')
  $('#message').css('background-color', '#f99')
}

module.exports = {
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  showIndexSuccess,
  showIndexFailure
}
