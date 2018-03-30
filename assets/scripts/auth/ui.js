'use strict'

const store = require('../store')

const signUpSuccess = function () {
  $('#message').text('Successfully signed up')
  $('#message').css('background-color', '#cfc')
}

const signUpFailure = function () {
  $('#message').text('Failure signing up')
  $('#message').css('background-color', '#f99')
}

const signInSuccess = function (data) {
  $('#message').text('Successfully signed in')
  $('#message').css('background-color', '#cfc')
  console.log('data in signInSuccess is ', data)
  store.user = data.user
}

const signInFailure = function () {
  $('#message').text('Failure signing in')
  $('#message').css('background-color', '#f99')
}

const changePasswordSuccess = function (data) {
  $('#message').text('Successfully changed password')
  $('#message').css('background-color', '#cfc')
}

const changePasswordFailure = function () {
  $('#message').text('Failure changing password')
  $('#message').css('background-color', '#f99')
}

const signOutSuccess = function () {
  $('#message').text('Successfully signed out!')
  $('#message').css('background-color', '#cfc')
  store.user = null
}

const signOutFailure = function () {
  $('#message').text('Failure signing out!')
  $('#message').css('background-color', '#f99')
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
