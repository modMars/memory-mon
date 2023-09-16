import { useEffect, useState } from 'react'
import './App.css'
import Cards from './Card'
import Navbar from './Navbar'

const pokemonID = [25, 6, 94, 143, 133, 38, 445, 448, 150, 131, 149, 7, 61, 39, 129]

function App() {
	const [pokemon, setPokemon] = useState([])
	const [isFetched, setIsFetched] = useState(false)
	const [randomPokes, setRandomPokes] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const fetchPromises = pokemonID.map(async id => {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				const data = await res.json()
				console.log(data)
				return { name: data.name, sprite: data.sprites.other['official-artwork'].front_default, types: data.types }
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
			let newArr = []
			let contains = {}
			while (newArr.length < 5) {
				let rnd = Math.floor(Math.random() * 15)
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
			setRandomPokes(randomPokemon)
		}
	}, [isFetched])
	return (
		<>
			{' '}
			<Navbar></Navbar>
			<div className='flex flex-wrap justify-evenly gap-6 bg-green-400 min-h-[30rem] w-full max-w[1260px] h-full p-4'>
				{randomPokes &&
					randomPokes.map(pkmnObject => {
						console.log(pkmnObject)
						return <Cards name={pkmnObject.name} img={pkmnObject.sprite} types={pkmnObject.types}></Cards>
					})}
			</div>
		</>
	)
}

export default App
