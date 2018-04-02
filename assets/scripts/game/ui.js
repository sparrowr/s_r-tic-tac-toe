'use strict'

const createGameFailure = function () {
  $('#message').text('Failure creating game in API!')
  $('#message').css('background-color', '#f99')
}

const updateGameSuccess = function () {
  $('#message').text('Successfully updated game')
  $('#message').css('background-color', '#cfc')
}

const updateGameFailure = function (data) {
  $('#message').text('Failure updating game')
  $('#message').css('background-color', '#f99')
  console.log('server returned ', data)
}

module.exports = {
  createGameFailure,
  updateGameSuccess,
  updateGameFailure
}
