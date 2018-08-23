'use strict'

var pokeData = [
  {
    id: '004',
    name: 'Charmander',
    type: 'Fire'
  },
  {
    id: '005',
    name: 'Charmeleon',
    type: 'Fire'
  },
  {
    id: '006',
    name: 'Charizard',
    type: 'Fire/Flying'
  }
]

var version = 2
var request = indexedDB.open('pokemonStore', version)
var db

request.addEventListener('upgradeneeded', function(event) {
  var db = event.target.result
  var pokemonObjectStore = db.createObjectStore('pokemons', { keyPath: 'id' })
  pokemonObjectStore.createIndex('name', 'name', { unique: false })
  pokemonObjectStore.createIndex('type', 'type', { unique: false })
})

request.addEventListener('error', function(event) {
  console.log(event)
})

request.addEventListener('success', function(event) {
  db = event.target.result
  saveData()
  loadData()
})

function saveData() {
  var transaction = db.transaction(['pokemons'], 'readwrite')
  var pokemonObjectStore = transaction.objectStore('pokemons')
  var putInStore = function(pokemon) {
    pokemonObjectStore.put(pokemon)
  }
  pokeData.forEach(putInStore)
}

function loadData() {
  var pokemonObjectStore = db
    .transaction(['pokemons'], 'readonly')
    .objectStore('pokemons')

  var listData = function(event) {
    var cursor = event.target.result
    if (cursor) {
      console.log(cursor.value)
      cursor.continue()
    }
  }

  pokemonObjectStore.openCursor().addEventListener('success', listData)
}
