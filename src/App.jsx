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
		newGame.updatePickedCards(e.target.parentElement.attributes.name.nodeValue)
		console.log(newGame.getPickedCards())
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
					<Score currentScore='0'></Score>
					<main className='flex flex-wrap justify-evenly min-h-[30rem] w-full max-w[30rem] h-full p-4 gap-8'>
						{randomPokes &&
							randomPokes.map(pkmnObject => {
								return (
									<Atropos activeOffset={80} className='cursor-pointer' onClick={handleClick} name={pkmnObject.name}>
										<Cards name={pkmnObject.name} img={pkmnObject.sprite} types={pkmnObject.types}></Cards>
									</Atropos>
								)
							})}
					</main>
				</>
			)}
		</>
	)
}

export default App
