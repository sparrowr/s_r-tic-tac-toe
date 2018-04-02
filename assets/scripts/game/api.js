'use strict'

const config = require('../config')
const store = require('../store')

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

module.exports = {
  createGame
}
