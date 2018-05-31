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

localStorage.setItem('pokeData', JSON.stringify(pokeData))

const pokemons = JSON.parse(localStorage.getItem('pokeData'))
console.log('pokemons: ', pokemons)
