const Game = (() => {
	let score = 0
	let chosenCards = {}
	const resetScore = () => {
		score = 0
	}
	const addScore = () => {
		score++
	}

	const getScore = () => {
		return score
	}

	const getPickedCards = () => {
		return chosenCards
	}

	const checkAndUpdate = card => {
		chosenCards[card] = true
	}

	const resetCards = () => {
		Object.keys(chosenCards).forEach(key => {
			delete chosenCards[key]
		})
	}

	return { score, addScore, resetScore, getScore, getPickedCards, checkAndUpdate, chosenCards, resetCards }
})()

export { Game }
