export default function Score({ currentScore }) {
	return (
		<article className='w-[16rem] max-w-10 bg-slate-700 px-8 py-4 rounded-md my-0 mx-auto shadow shadow-[#0c8dcb] max-md:max-w-[12rem]'>
			<h2 className='text-2xl max-md:text-xl'>Current Score</h2>
			<span className='text-2xl max-md:text-xl'>{currentScore}</span>
			<span className='text-2xl max-md:text-xl'>/5</span>
		</article>
	)
}
