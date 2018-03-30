'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onSignUp = function onSignUp (event) {
  event.preventDefault()
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

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  console.log('signout request reached onSignOut function')
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const showSignUp = function showSignUp () {
  event.preventDefault()
  // hideAuth()
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
  // hideAuth()
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

const showChangePassword = function showChangePassword () {
  event.preventDefault()
  // hideAuth()
  const changePasswordForm = document.createElement('form')
  changePasswordForm.setAttribute('class', 'border')
  changePasswordForm.setAttribute('id', 'change-password')
  const oldPasswordField = document.createElement('input')
  oldPasswordField.setAttribute('type', 'password')
  oldPasswordField.setAttribute('name', 'passwords[old]')
  oldPasswordField.setAttribute('placeholder', 'old password')
  changePasswordForm.appendChild(oldPasswordField)
  const newPasswordField = document.createElement('input')
  newPasswordField.setAttribute('type', 'password')
  newPasswordField.setAttribute('name', 'passwords[new]')
  newPasswordField.setAttribute('placeholder', 'new password')
  changePasswordForm.appendChild(newPasswordField)
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('class', 'btn')
  submitButton.setAttribute('value', 'Change password!')
  changePasswordForm.appendChild(submitButton)
  changePasswordForm.addEventListener('submit', onChangePassword)
  document.getElementById('auth-town').appendChild(changePasswordForm)
}

const hideAuth = function hideAuth () {
  $('#auth-town').html('')
}

const showAuth = function showAuth () {
  // show some authy things!
  hideAuth()

  if (store.user) {
    // show change password and sign out
    const changePasswordShow = document.createElement('form')
    const changePasswordShowButton = document.createElement('input')
    changePasswordShowButton.setAttribute('type', 'submit')
    changePasswordShowButton.setAttribute('class', 'btn')
    changePasswordShowButton.setAttribute('value', 'Change password')
    changePasswordShow.appendChild(changePasswordShowButton)
    changePasswordShow.addEventListener('submit', showChangePassword)
    document.getElementById('auth-town').appendChild(changePasswordShow)

    // doesn't display a form, just instantly does the thing
    const signOut = document.createElement('form')
    const signOutButton = document.createElement('input')
    signOutButton.setAttribute('type', 'submit')
    signOutButton.setAttribute('class', 'btn')
    signOutButton.setAttribute('value', 'Sign out')
    signOut.appendChild(signOutButton)
    signOut.addEventListener('submit', onSignOut)
    document.getElementById('auth-town').appendChild(signOutButton)
    debugger
  } else {
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
