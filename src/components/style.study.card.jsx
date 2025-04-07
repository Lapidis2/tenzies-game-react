import React from 'react'
function StyleStudyCard(props){
	return(
		<section  className="grid gap-4 grid-cols-1 sm:bg-blue-50 lg:bg-white md:grid-cols-2 lg:grid-cols-2 p-8 md:items-center">
	<div>
		<img src="/game.jpg" alt="test image" className="w-full rounded-lg" />
	</div>
  <div>
<h1 className="text-[60px] font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mb-2 text-center text-transparent bg-clip-text " >Enjoy Game!</h1>
<p className="text-center inline">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</section>
	)
 }
 export default StyleStudyCard