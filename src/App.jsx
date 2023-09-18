import 'atropos/css'
import Atropos from 'atropos/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import Cards from './Card'
import EndScreens from './EndScreens'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import Score from './Score'
import { Game } from './game'
import { pickRandomPokemon, pokemonID } from './pokemon'

const newGame = Game
const handleAnimation = cards => {
	cards.forEach(card => {
		card.classList.toggle('card-clicked')
		card.classList.toggle('disabled')
	})
}

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
		const currentCard = e.target.parentElement.attributes.name.nodeValue

		if (newGame.chosenCards[currentCard] != true) {
			newGame.checkAndUpdate(currentCard)
			newGame.addScore()
			if (newGame.getScore() === 5) {
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

	const handleRestart = e => {
		const cards = document.querySelectorAll('.atropos')
		newGame.resetScore()
		newGame.resetCards()
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
			{!isFetched ? (
				<>
					<LoadingScreen></LoadingScreen>
				</>
			) : (
				<>
					<div className='bg-wrapper w-full min-h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] blur brightness-50 -z-10'>
						{/* <img className='w-full h-full object-cover' src='./src/assets/mainBg.jpg' alt='' /> */}
					</div>
					<Navbar></Navbar>
					<Score currentScore={newGame.getScore()}></Score>
					<main className='flex flex-wrap justify-evenly min-h-[30rem] w-full max-w[30rem] h-full px-4 py-24 gap-8'>
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
