import React from 'react'
function StyleStudyCard(props){
	return(
		<section  className="grid gap-4 grid-cols-1 sm:bg-blue-50 lg:bg-white md:grid-cols-2 lg:grid-cols-2 p-8 md:items-center">
	<div>
		<img src="/game.jpg" alt="test image" className="w-full rounded-lg" />
	</div>
  <div>
<h1 className="text-[60px] font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mb-2 text-center text-transparent bg-clip-text " >Enjoy Game!</h1>
  <p>&lt;I'm a dedicated developer skilled in building responsive and user-friendly web applications using React, Tailwind CSS, and Node.js. I take pride in writing clean, efficient code and solving problems that make a real impact. I’m always eager to learn new skills and improve my craft, and I thrive in collaborative environments where I can contribute and grow. If you're looking for a developer who is passionate about creating high-quality software, I would love the opportunity to connect and discuss how I can contribute to your team. /&gt;</p>

  </div>
</section>
	)
 }
 export default StyleStudyCard