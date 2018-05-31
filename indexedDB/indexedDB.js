'use strict'

let db
let version = 1
const request = indexedDB.open('messageStore', version)

request.addEventListener('error', event => console.log(event))

request.addEventListener('upgradeneeded', event => {
  const upgradeDB = event.target.result
  upgradeDB.createObjectStore('messages', {
    keyPath: 'sid'
  })
})

request.addEventListener('success', event => {
  db = event.target.result
})

