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

const moveToDraw = function moveToDraw () {
  // winning isn't possible, try to stop X from winning
  const possWins = []
  for (let i = 0; i < winConditions.length; i++) {
    let possible = true
    for (let j = 0; j < winConditions[i].length; j++) {
      if (state.game.game.cells[winConditions[i][j]] === 'O') {
        possible = false
      }
    }
    if (possible) {
      possWins.push(winConditions[i])
    }
  }

  if (possWins.length === 0) {
    // it's not possible for either player to win, move in lowest-index open space
    for (let i = 0; i < state.game.game.cells.length; i++) {
      if (state.game.game.cells[i] === '') {
        logic.tokenSetter('#square' + i)
        return
      }
    }
  }
  // find spot that gives X best chance of winning
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

const move = function move () {
  // make sure game isn't over
  if (!state.game.game.over) {
    // if (state.game.game.cells[n] === '' && !state.game.game.over)
    /* attempt to move in lowest open space
    for (let i = 0; i < state.game.game.cells.length; i++) {
      if (state.game.game.cells[i] === '') {
        logic.tokenSetter('#square' + i)
        return
    } */
    const possWins = []
    // see if it's possible to win at all
    for (let i = 0; i < winConditions.length; i++) {
      let possible = true
      for (let j = 0; j < winConditions[i].length; j++) {
        if (state.game.game.cells[winConditions[i][j]] === 'X') {
          possible = false
        }
      }
      if (possible) {
        possWins.push(winConditions[i])
      }
    }
    // if winning isn't possible, try to stop your opponent from winning
    if (possWins.length === 0) {
      moveToDraw()
      return
    }
    // if it's possible to win right now, do so
    for (let i = 0; i < possWins.length; i++) {
      let m = 0
      for (let j = 0; j < possWins[i].length; j++) {
        if (state.game.game.cells[possWins[i][j]] === 'O') {
          m++
        }
      }
      if (m === 2) {
        for (let j = 0; j < possWins[i].length; j++) {
          if (state.game.game.cells[possWins[i][j]] === '') {
            logic.tokenSetter('#square' + possWins[i][j])
            return
          }
        }
      }
    }
    // find thing that appears in possWins most often and is empty
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
}

module.exports = {
  isActive,
  turnOn,
  turnOff,
  move
}
