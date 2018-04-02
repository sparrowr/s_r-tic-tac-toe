'use strict'

const createGameFailure = function () {
  $('#message').text('Failure creating game in API!')
  $('#message').css('background-color', '#f99')
}

module.exports = {
  createGameFailure
}
