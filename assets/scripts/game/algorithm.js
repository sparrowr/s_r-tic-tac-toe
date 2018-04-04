'use strict'

let status = false
const state = require('./state')
const logic = require('./logic')
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const isActive = function isActive () {
  return status
}

const turnOn = function turnOn () {
  status = true
}

const turnOff = function turnOff () {
  status = false
}

const winNow = function winNow (player, possWins) {
  // if player can end tic tac toe game by moving somewhere, move there and return true
  // else return false
  for (let i = 0; i < possWins.length; i++) {
    let m = 0
    for (let j = 0; j < possWins[i].length; j++) {
      if (state.game.game.cells[possWins[i][j]] === player) {
        m++
      }
    }
    if (m === 2) {
      for (let j = 0; j < possWins[i].length; j++) {
        if (state.game.game.cells[possWins[i][j]] === '') {
          logic.tokenSetter('#square' + possWins[i][j])
          return true
        }
      }
    }
  }
  return false
}

const bestNonWinMove = function bestNonWinMove (possWins) {
  // find the empty square that appears most often in player's list of possible wins, move there
  const possWinsFreq = []
  let dup = false
  for (let i = 0; i < possWins.length; i++) {
    for (let j = 0; j < possWins[i].length; j++) {
      if (state.game.game.cells[possWins[i][j]] === '') {
        dup = false
        for (let k = 0; k < possWinsFreq.length; k++) {
          if (possWinsFreq[k][0] === possWins[i][j]) {
            dup = true
            possWinsFreq[k][1]++
          }
        }
        if (!dup) {
          possWinsFreq.push([possWins[i][j], 1])
        }
      }
    }
  }
  let best = 0
  for (let i = 1; i < possWinsFreq.length; i++) {
    if (possWinsFreq[i][1] > possWinsFreq[best][1]) {
      best = i
    }
  }
  logic.tokenSetter('#square' + possWinsFreq[best][0])
}

const getWins = function getWins (player) {
  // return array of possible wins for player - expects player to be X or O
  let opponent = 'X'
  if (player === 'X') {
    opponent = 'O'
  }
  const wins = []
  for (let i = 0; i < winConditions.length; i++) {
    let possible = true
    for (let j = 0; j < winConditions[i].length; j++) {
      if (state.game.game.cells[winConditions[i][j]] === opponent) {
        possible = false
      }
    }
    if (possible) {
      wins.push(winConditions[i])
    }
  }
  return wins
}

const move = function () {
  // new algorithm! summary:
  // a. exit without trying to move if game is over
  if (state.game.game.over) {
    return
  }
  // b. identify current possible wins for O
  const oWins = getWins('O')
  // c. identify current possible wins for X
  const xWins = getWins('X')
  // d. if any of the current possible wins for O can be used to win now, choose that move and exit
  if (winNow('O', oWins)) {
    return
  }
  // e. if any of the current possible wins for X can be used to win now, choose that move and exit
  if (winNow('X', xWins)) {
    return
  }
  // f. find the empty square that appears most often in O's list of possible wins, move there and exit
  if (oWins.length !== 0) {
    bestNonWinMove(oWins)
    return
  }
  // g. find the empty square that appears most often in X's list of possible wins, move there and exit
  if (xWins.length !== 0) {
    bestNonWinMove(xWins)
    return
  }
  // h. if it's not possible for X or O to win, move to lowest-index open square and exit
  for (let i = 0; i < state.game.game.cells.length; i++) {
    if (state.game.game.cells[i] === '') {
      logic.tokenSetter('#square' + i)
      return
    }
  }
}

module.exports = {
  isActive,
  turnOn,
  turnOff,
  move
}
