'use strict'

const pokeData = [
  {
    "id": "004",
    "name": "Charmander",
    "type": "Fire"
  },
  {
    "id": "005",
    "name": "Charmeleon",
    "type": "Fire"
  },
  {
    "id": "006",
    "name": "Charizard",
    "type": "Fire/Flying"
  }
]

const version = 2
const request = indexedDB.open('pokemonStore', version)
let db

request.addEventListener('upgradeneeded', event => {
  const db = event.target.result
  const pokemonObjectStore = db.createObjectStore('pokemons', { keyPath: 'id' })
  pokemonObjectStore.createIndex('name', 'name', { unique: false })
  pokemonObjectStore.createIndex('type', 'type', { unique: false })
})

request.addEventListener('error', event => console.log(event))
request.addEventListener('success', event => {
  db = event.target.result
  saveData()
  loadData()
})

function saveData() {
  const transaction = db.transaction(['pokemons'], 'readwrite')
  const pokemonObjectStore = transaction.objectStore('pokemons')
  pokeData.forEach(pokemon => pokemonObjectStore.put(pokemon))
}

function loadData() {
  const pokemonObjectStore = db
    .transaction(['pokemons'], 'readonly')
    .objectStore('pokemons')

  const listData = event => {
    const cursor = event.target.result
    if(cursor) {
      console.log(cursor.value)
      cursor.continue()
    }
  }

  pokemonObjectStore
    .openCursor()
    .addEventListener('success', listData)
}
