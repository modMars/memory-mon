import 'atropos/css'
import Atropos from 'atropos/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import Cards from './Card'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import Score from './Score'
import { Game } from './game'
import { pickRandomPokemon, pokemonID } from './pokemon'

const newGame = Game

function App() {
	const [pokemon, setPokemon] = useState([])
	const [isFetched, setIsFetched] = useState(false)
	const [randomPokes, setRandomPokes] = useState([])
	const [lostGame, setLostGame] = useState(false)
	const [wonGame, setWonGame] = useState(false)

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
	}, [])

	useEffect(() => {
		if (isFetched === true) {
			setRandomPokes(pickRandomPokemon(pokemon))
		}
	}, [isFetched])

	const handleClick = e => {
		console.log(e.target)
		console.log(newGame.chosenCards)
		const currentCard = e.target.parentElement.attributes.name.nodeValue

		if (newGame.chosenCards[currentCard] != true) {
			newGame.checkAndUpdate(currentCard)
			newGame.addScore()
			if (newGame.getScore() === 5) {
				setWonGame(true)
				return
			}
			setRandomPokes(pickRandomPokemon(pokemon))
		} else setLostGame(true)
	}

	const handleRestart = e => {
		newGame.resetScore()
		newGame.resetCards()
		setLostGame(false)
		setWonGame(false)
		setRandomPokes(pickRandomPokemon(pokemon))
	}

	return (
		<>
			{!isFetched ? (
				<>
					<LoadingScreen></LoadingScreen>
				</>
			) : (
				<>
					<Navbar></Navbar>
					<Score currentScore={newGame.getScore()}></Score>
					<main className='flex flex-wrap justify-evenly min-h-[30rem] w-full max-w[30rem] h-full p-4 py-24 gap-8'>
						{randomPokes &&
							randomPokes.map(pkmnObject => {
								return (
									<Atropos
										activeOffset={80}
										className='cursor-pointer'
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
			{lostGame && (
				<>
					<div className='lost flex flex-col justify-evenly absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[calc(50%+2rem)] h-[40rem] bg-slate-700 rounded-lg'>
						<h1 className='font-bold text-8xl text-white'>YOU LOST!</h1>
						<button className='w-[10rem] self-center' onClick={handleRestart}>
							Restart
						</button>
						<div className='lostBg'></div>
					</div>
				</>
			)}
			{wonGame && (
				<>
					<div className='flex flex-col justify-evenly absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[calc(50%+2rem)] h-[40rem] bg-slate-700 rounded-lg'>
						<h1 className='font-bold text-8xl text-white'>YOU WON!</h1>
						<button className='w-[10rem] self-center' onClick={handleRestart}>
							Restart
						</button>
						<div className='wonBg'></div>
					</div>
				</>
			)}
		</>
	)
}

export default App
