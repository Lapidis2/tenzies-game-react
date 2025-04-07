import React,{useState} from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <video
            className="h-12 md:h-16 px-8 rounded-full object-cover" 
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/logovdeo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items for Desktop and Mobile */}
        <ul className={`lg:flex lg:space-x-8 space-y-4 lg:space-y-0 absolute lg:static bg-blue-500 lg:bg-transparent top-16 left-0 right-0 lg:flex-row p-4 lg:p-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
          <li><a href="#about" className="text-white hover:text-gray-300">About</a></li>
          <li><a href="#services" className="text-white hover:text-gray-300">Services</a></li>
          <li><a href="#contact" className="text-white hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
