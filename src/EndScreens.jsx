import React from 'react'

export default function EndScreens({ text, status, statusBg, handleRestart }) {
	const animationClass = 'appear'

	return (
		<div
			className={`flex flex-col justify-evenly fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[calc(50%+2rem)] h-[40rem] bg-slate-700 rounded-3xl shadow shadow-[#0c8dcb] ${status} ${animationClass}`}
		>
			<h1 className={`font-bold text-8xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${animationClass}`}>
				{text}
			</h1>
			<button className={`w-[10rem] self-center ${animationClass}`} onClick={handleRestart}>
				Restart
			</button>
			<div className={` ${statusBg} ${animationClass}`}></div>
		</div>
	)
}
