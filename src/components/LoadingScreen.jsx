export default function LoadingScreen() {
	return (
		<>
			<div className='flex items-center justify-center flex-col w-screen h-screen absolute bg-fg'>
				<div className='w-28 h-28'>
					<img src='../src/assets/pika.gif' alt='' className='w-full h-auto' />
				</div>
				<h2 className='text-xl text-bg font-bold'>Catching pokemon.. please wait</h2>
			</div>
		</>
	)
}
