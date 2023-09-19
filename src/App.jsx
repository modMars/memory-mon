import 'atropos/css'
import Atropos from 'atropos/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Cards from './components/Card'
import EndScreens from './components/EndScreens'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Score from './components/Score'
import { Game } from './modules/game'
import { fillPokemonID, pickRandomPokemon, pokemonID } from './modules/pokemon'
import './style/App.css'

//Toggle card visibility
const handleAnimation = cards => {
	cards.forEach(card => {
		card.classList.toggle('card-clicked')
		card.classList.toggle('disabled')
	})
}

//Add 8 random pokemon to the ID's array
fillPokemonID(8)

function App() {
	const [pokemon, setPokemon] = useState([])
	const [isFetched, setIsFetched] = useState(false)
	const [randomPokes, setRandomPokes] = useState([])
	const [lostGame, setLostGame] = useState(false)
	const [wonGame, setWonGame] = useState(false)

	//When pokemonID changes we make a request to the pokeAPI
	useEffect(() => {
		const fetchData = async () => {
			const fetchPromises = pokemonID.map(async id => {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				const data = await res.json()
				return {
					name: data.name,
					sprite: data.sprites.other['official-artwork'].front_default,
					types: data.types,
					id: uuidv4(),
				}
			})

			try {
				const fetchedPokemon = await Promise.all(fetchPromises)
				setPokemon(fetchedPokemon)
				setIsFetched(true)
			} catch (error) {
				console.error('Error fetching Pokemon data:', error)
			}
		}
		fetchData()
	}, [pokemonID])

	//Update random pokemon state once the fetch effect ends it's process
	useEffect(() => {
		if (isFetched === true) {
			setRandomPokes(pickRandomPokemon(pokemon))
		}
	}, [isFetched])

	//On click update score, check if the score is a winner, and scramble the cards on screen
	const handleClick = e => {
		const currentCard = e.target.parentElement.attributes.name.nodeValue
		if (Game.chosenCards[currentCard] != true) {
			Game.checkAndUpdate(currentCard)
			Game.addScore()
			if (Game.getScore() === 5) {
				setWonGame(true)
				return
			}
			const cards = document.querySelectorAll('.atropos')
			handleAnimation(cards)
			setTimeout(() => {
				setRandomPokes(pickRandomPokemon(pokemon))
			}, 250)
			setTimeout(() => handleAnimation(cards), 1000)
		} else setLostGame(true)
	}

	//Reset game score, reset the cards the user picked, reset lost/won status and scramble cards on screen
	const handleRestart = e => {
		const cards = document.querySelectorAll('.atropos')
		Game.resetScore()
		Game.resetCards()
		setLostGame(false)
		setWonGame(false)
		handleAnimation(cards)
		setTimeout(() => {
			setRandomPokes(pickRandomPokemon(pokemon))
		}, 250)
		setTimeout(() => handleAnimation(cards), 1000)
	}

	return (
		<>
			{/* If the fetching status isn't done yet render a loading screen, else render the game */}
			{!isFetched ? (
				<>
					<LoadingScreen></LoadingScreen>
				</>
			) : (
				<>
					<div className='bg-wrapper w-full min-h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] blur brightness-50 -z-10'></div>
					<Navbar handleRestart={handleRestart}></Navbar>
					<Score currentScore={Game.getScore()}></Score>
					<main className='flex flex-wrap justify-evenly my-0 mx-auto w-full max-w-[1500px] h-full py-24 gap-8'>
						{randomPokes &&
							randomPokes.map(pkmnObject => {
								return (
									<Atropos
										activeOffset={80}
										className='cursor-pointer z-0'
										onClick={lostGame || wonGame ? null : handleClick}
										name={pkmnObject.name}
									>
										<Cards name={pkmnObject.name} img={pkmnObject.sprite} types={pkmnObject.types}></Cards>
									</Atropos>
								)
							})}
					</main>
				</>
			)}
			{/* Depending on the game status we render the victory or defeat screen */}
			{lostGame && (
				<>
					<EndScreens text='YOU LOST!' status='lost' statusBg='lostBg' handleRestart={handleRestart}></EndScreens>
				</>
			)}
			{wonGame && (
				<>
					<EndScreens text='YOU WON!' status='won' statusBg='wonBg' handleRestart={handleRestart}></EndScreens>
				</>
			)}
		</>
	)
}

export default App
