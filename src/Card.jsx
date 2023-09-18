import './assets/bg.png'
import './Card.css'
export default function Cards({ name, img, types, id }) {
	return (
		<figure
			className='card max-w-xs border border-[#0c8dcb] rounded-lg pointer-events-none max-md:max-w-[250px] max-sm:max-w-[200px]'
			data-atropos-offset='1'
		>
			<div className='card-inner'>
				<div className='front-face'>
					<img
						className='rounded-t-lg pointer-events-none'
						src={img}
						alt=''
						data-atropos-offset='1.5'
						width='318'
						height='318'
					/>
					<div className='p-5 pointer-events-none'>
						<h5
							className='mb-2 text-3xl font-bold tracking-wide text-fg dark:text-white capitalize drop-shadow-md'
							data-atropos-offset='2'
						>
							{name}
						</h5>
						<div className='flex justify-evenly gap-4'>
							{types.map(type => {
								return (
									<span
										key={id}
										className={`text-b rounded-xl px-5 py-1 my-2 mt-10 uppercase font-bold text-white border border-slate-50 outline outline-1 outline-slate-900 ${type.type.name} max-sm:px-2 max-sm:text-xs`}
										data-atropos-offset='8'
									>
										{type.type.name}
									</span>
								)
							})}
						</div>
					</div>
				</div>
				{/* <div class='back-face'>
					<img src='../src/assets/cardback.jpg' alt='Back Image' />
				</div> */}
			</div>
		</figure>
	)
}
