//Array with random pokemon ID's (Used to fetch pokemon from the pokeAPI)
const pokemonID = []

const fillPokemonID = amount => {
	for (let i = 0; i < amount; i++) {
		//Get random pokemon id's from 1 all the way to 493 (Sinnoh region)
		pokemonID.push(Math.floor(Math.random() * 493))
	}
}

const clearPokemonID = () => {
	pokemonID.length = 0
}

//Returns a 5 pokemon array with no duplicates
const pickRandomPokemon = pokemon => {
	let newArr = []
	let contains = {}
	while (newArr.length < 5) {
		let rnd = Math.floor(Math.random() * pokemon.length)
		if (contains[rnd] === undefined) {
			newArr.push(rnd)
			contains[rnd] = true
		}
	}
	const randomPokemon = [
		pokemon[newArr[0]],
		pokemon[newArr[1]],
		pokemon[newArr[2]],
		pokemon[newArr[3]],
		pokemon[newArr[4]],
	]
	return randomPokemon
}

export { clearPokemonID, fillPokemonID, pickRandomPokemon, pokemonID }
