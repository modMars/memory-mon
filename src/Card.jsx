export default function Card({ name }) {
	return (
		<div className='flex flex-column flex-wrap justify-evenly gap-6 bg-green-400 min-h-[30rem] w-full max-w[1260px] p-4'>
			<h2 className='shadow-xl text-xl'>{name}</h2>
			<h2 className='shadow-xl text-xl'>{name}</h2>
		</div>
	)
}
