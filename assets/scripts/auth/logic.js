'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

// this variable is 0 before sign in, 1 if signed in, 2 if signed out
let authState = 0

const onSignUp = function onSignUp (event) {
  event.preventDefault()
  console.log('you tried to sign up! yay')
  authState = 6
  console.log('authState' + authState)
  const data = getFormFields(event.target)
  console.log(data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const showSignUp = function showSignUp () {
  event.preventDefault()
  const signUpForm = document.createElement('form')
  signUpForm.setAttribute('class', 'border')
  signUpForm.setAttribute('id', 'sign-up')
  const emailField = document.createElement('input')
  emailField.setAttribute('type', 'email')
  emailField.setAttribute('name', 'credentials[email]')
  emailField.setAttribute('placeholder', 'email address')
  signUpForm.appendChild(emailField)
  const passwordField = document.createElement('input')
  passwordField.setAttribute('type', 'password')
  passwordField.setAttribute('name', 'credentials[password]')
  passwordField.setAttribute('placeholder', 'password')
  signUpForm.appendChild(passwordField)
  const passwordConfirmField = document.createElement('input')
  passwordConfirmField.setAttribute('type', 'password')
  passwordConfirmField.setAttribute('name', 'credentials[confirm_password]')
  passwordConfirmField.setAttribute('placeholder', 'confirm password')
  signUpForm.appendChild(passwordConfirmField)
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('class', 'btn')
  submitButton.setAttribute('value', 'Sign up!')
  signUpForm.appendChild(submitButton)
  signUpForm.addEventListener('submit', onSignUp)
  document.getElementById('auth-town').appendChild(signUpForm)
}

const showSignIn = function showSignIn () {
  event.preventDefault()
  const signInForm = document.createElement('form')
  signInForm.setAttribute('class', 'border')
  signInForm.setAttribute('id', 'sign-up')
  const emailField = document.createElement('input')
  emailField.setAttribute('type', 'email')
  emailField.setAttribute('name', 'credentials[email]')
  emailField.setAttribute('placeholder', 'email address')
  signInForm.appendChild(emailField)
  const passwordField = document.createElement('input')
  passwordField.setAttribute('type', 'password')
  passwordField.setAttribute('name', 'credentials[password]')
  passwordField.setAttribute('placeholder', 'password')
  signInForm.appendChild(passwordField)
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('class', 'btn')
  submitButton.setAttribute('value', 'Sign in!')
  signInForm.appendChild(submitButton)
  signInForm.addEventListener('submit', onSignIn)
  document.getElementById('auth-town').appendChild(signInForm)
}

const showAuth = function showAuth () {
  // show some authy things!
  $('#auth-town').html('')

  if (authState % 2 === 0) {
    const signUpShow = document.createElement('form')
    const signUpShowButton = document.createElement('input')
    signUpShowButton.setAttribute('type', 'submit')
    signUpShowButton.setAttribute('class', 'btn')
    signUpShowButton.setAttribute('value', 'Sign up')
    signUpShow.appendChild(signUpShowButton)
    signUpShow.addEventListener('submit', showSignUp)
    document.getElementById('auth-town').appendChild(signUpShow)

    const signInShow = document.createElement('form')
    const signInShowButton = document.createElement('input')
    signInShowButton.setAttribute('type', 'submit')
    signInShowButton.setAttribute('class', 'btn')
    signInShowButton.setAttribute('value', 'Sign in')
    signInShow.appendChild(signInShowButton)
    signInShow.addEventListener('submit', showSignIn)
    document.getElementById('auth-town').appendChild(signInShow)
  }
}

export {
  showAuth
}
