'use strict'

let version = 1
const request = indexedDB.open('messageStore', version)

request.addEventListener('upgradeneeded', event => {
  const upgradeDB = event.target.result
  upgradeDB.createObjectStore('messages', {
    keyPath: 'sid'
  })
})

request.addEventListener('error', event => console.log(event))
request.addEventListener('success', event => {
  const db = event.target.result
  saveData(db)
})

function saveData(db) {
  const transaction = db.transaction(['messages'], 'readwrite')
  const objectStore = transaction.objectStore('messages')
  const request = objectStore.put({ sid: 1, name: 'Lidy Segura' })
  // request.addEventListener('success', event => console.log(event))
  request.addEventListener('error', event => console.log(event))
}
