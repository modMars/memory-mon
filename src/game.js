const Game = (() => {
	let score = 0
	let chosenCards = {}
	const setScore = newScore => {
		score = newScore
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

	const updatePickedCards = card => {
		console.log(card)
		chosenCards[card] = true
	}

	return { score, addScore, setScore, getScore, getPickedCards, updatePickedCards, chosenCards }
})()

export { Game }
