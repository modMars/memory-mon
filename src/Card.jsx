import './Card.css'
export default function Cards({ name, img, types }) {
	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:-translate-y-2 transition-transform'>
			<img className='rounded-t-lg' src={img} alt='' />
			<div className='p-5'>
				<h5 className='mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white capitalize'>{name}</h5>
				<div className='flex justify-evenly'>
					{types.map(type => {
						console.log(type)
						return (
							<span className={`text-xl rounded-xl px-5 py-1 my-2 capitalize font-bold ${type.type.name}`}>
								{type.type.name}
							</span>
						)
					})}
				</div>
			</div>
		</div>
	)
}
