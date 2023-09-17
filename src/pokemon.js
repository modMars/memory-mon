const pokemonID = [25, 6, 94, 143, 133, 38, 445, 448, 150, 131, 149, 7, 61, 39, 129, 330, 4, 152, 768, 334]
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

export { pickRandomPokemon, pokemonID }
