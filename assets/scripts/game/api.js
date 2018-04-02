'use strict'

const config = require('../config')
const store = require('../store')
const state = require('./state')

const createGame = function (data) {
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
  console.log('delta in api.js ', delta)
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

/* /*

~/wdi/projects/s_r-tic-tac-toe (board)
$ TOKEN=BAhJIiVjYTVkMGFiNDkyYjY0NzAwZTU5ZmE4OWZkYWJjMzYzYwY6BkVG--2a346e773c2351429696d081a8fa3aca3b3800fa
~/wdi/projects/s_r-tic-tac-toe (board)
$
~/wdi/projects/s_r-tic-tac-toe (board)
$ curl "http://tic-tac-toe.wdibos.com/games/32052" --include --request PATCH --header "Content-Type: application/json" --header "Authorization: Token token=${TOKEN}" --data '{"game": { "cell": { "index": 0, "value":"x"},"over":true}}'; echo
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Date: Mon, 02 Apr 2018 18:38:35 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Cache-Control: no-cache
X-Request-Id: 1009c6e1-9d3a-4b50-883e-74d5d21b6454
X-Runtime: 0.013028
Vary: Origin

{"game":{"id":32052,"cells":["x","","","","","","","",""],"over":true,"player_x":{"id":2638,"email":"coffee@srubin.org"},"player_o":null}}
*/
