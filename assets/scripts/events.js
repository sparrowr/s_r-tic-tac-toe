'use strict'

// const getFormFields = require('../../lib/get-form-fields')
const gameLogic = require('./game/logic')
const authLogic = require('./auth/logic')

const onGameOptions = function onGameOptions () {
  event.preventDefault()
  gameLogic.showGameOptions()
}

const onShowAuth = function onShowAuth () {
  event.preventDefault()
  authLogic.showAuth()
}

const addHandlers = () => {
  $('#game-options').on('submit', onGameOptions)
  $('#show-auth').on('submit', onShowAuth)
}

module.exports = {
  addHandlers
}

/* miscellaneous copypasta from other projects, for reference

headers to events.js:
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

events.js instance:
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

api.js instance:

const changePassword = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

ui.js instance:
const changePasswordSuccess = function (data) {
  $('#message').text('Successfully changed password')
  $('#message').css('background-color', '#cfc')
}

const changePasswordFailure = function () {
  $('#message').text('Failure changing password')
  $('#message').css('background-color', '#f99')
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
}

from wdi-fundamentals-memorygame:
var createBoard = function(){
for (var i = 0; i < cards.length; i++){
var cardElement = document.createElement('img');
cardElement.setAttribute('src','images/back.png');
cardElement.setAttribute('data-id',i);
cardElement.addEventListener('click',flipCard);
document.getElementById('game-board').appendChild(cardElement);
}
}

*/
