export default function Score({ currentScore }) {
	console.log(currentScore)
	return (
		<article className='w-[12rem] max-w-10 bg-slate-700 px-8 py-4 rounded-md my-0 mx-auto'>
			<h2 className='text-xl'>Current Score</h2>
			<span>{currentScore}</span>
			<span>/5</span>
		</article>
	)
}
