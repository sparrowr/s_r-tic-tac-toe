'use strict'

const config = require('../config')
const store = require('../store')
const state = require('./state')

const createGame = function (data) {
  console.log('creation request in api.js')
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateGame = function (delta) {
  return $.ajax({
    url: config.apiUrl + '/games/' + state.game.game.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    delta
  })
}

module.exports = {
  createGame,
  updateGame
}
