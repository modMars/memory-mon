const Game = ((score = 0) => {
	const setScore = newScore => {
		score = newScore
	}
	const addScore = () => {
		score++
	}
	return { score, addScore, setScore }
})()

const Player = name => {
	let hiscore = 0
	setHighScore = newScore => {
		if (newScore > hiscore) hiscore = newScore
	}
	return { name, hiscore }
}

const newGame = Game
newGame.setScore(5)
newGame.addScore
console.log(newGame)
