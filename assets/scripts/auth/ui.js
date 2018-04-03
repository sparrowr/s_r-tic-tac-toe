'use strict'

const store = require('../store')
const failureColor = '#933'
const successColor = '#393'

const signUpSuccess = function () {
  $('#message').text('Successfully signed up')
  $('#message').css('background-color', successColor)
  $('#auth-area').html('')
  $('#game-area').html('')
}

const signUpFailure = function () {
  $('#message').text('Failure signing up')
  $('#message').css('background-color', failureColor)
}

const signInSuccess = function (data) {
  $('#message').text('Successfully signed in')
  $('#message').css('background-color', successColor)
  store.user = data.user
  $('#auth-area').html('')
  $('#game-area').html('')
}

const signInFailure = function () {
  $('#message').text('Failure signing in')
  $('#message').css('background-color', failureColor)
}

const changePasswordSuccess = function (data) {
  $('#message').text('Successfully changed password')
  $('#message').css('background-color', successColor)
  $('#auth-area').html('')
}

const changePasswordFailure = function () {
  $('#message').text('Failure changing password')
  $('#message').css('background-color', failureColor)
}

const signOutSuccess = function () {
  $('#message').text('Successfully signed out!')
  $('#message').css('background-color', successColor)
  store.user = null
  $('#auth-area').html('')
}

const signOutFailure = function () {
  $('#message').text('Failure signing out!')
  $('#message').css('background-color', failureColor)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
