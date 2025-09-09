import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import light from '../assets/SIMPO-Logo.jpeg';
// import dark from '../assets/dark.jpeg';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;



  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <img src={light} alt="Simpo Planet Logo" className="w-40 h-14 rounded-xl object-cover" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
          
            <a
              href='/'
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
              Home
            </a>
            <a
              href="/abouts"
              className={`transition-colors ${
                isActive('/abouts') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
              About us
            </a>
            <a
             href='/gallery'
              className={`transition-colors ${
                isActive('/gallery') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
              Gallery
            </a>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-white hover:text-red-500 transition-colors"
              >
                Talent
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  <a
                    href="/artists"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors"
                  >
                    Artists
                  </a>
                  <a
                    href="/filmmakers"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors"
                  >
                    Filmmakers
                  </a>
                  <a
                    href="/producers"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors"
                  >
                    Producers
                  </a>
                </div>
              )}
            </div>
            <a
            href='/musics'
              className={`transition-colors ${
                isActive('/musics') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
              Musics
            </a>
            <a
            href='/contacts'
              className={`transition-colors ${
                isActive('/contacts') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
              Contact Us
            </a>
            <a href='/login' className="bg-red-500 uppercase rounded-lg cursor-pointer text-white px-6 py-2 border border-red-500 hover:bg-transparent hover:text-red-500 transition-colors">
              Login
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-4">
                 <a
              href="/"
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
             Home
            </a>
                  <a
              href="/abouts"
              className={`transition-colors ${
                isActive('/abouts') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
              About us
            </a>
                   <a
              href="/musics"
              className={`transition-colors ${
                isActive('/musics') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
             Musics
            </a>
              <a
               href='/gallery'
                className={`transition-colors text-left ${
                  isActive('/gallery') 
                    ? 'text-red-500 font-bold' 
                    : 'text-white hover:text-red-500'
                }`}
              >
                Gallery
              </a>
              <a
               href='/artists'
                className={`transition-colors text-left ${
                  isActive('/artists') 
                    ? 'text-red-500 font-bold' 
                    : 'text-white hover:text-red-500'
                }`}
              >
                Artists
              </a>
                  <a
               href='/filmmakers'
                className={`transition-colors text-left ${
                  isActive('/filmmakers') 
                    ? 'text-red-500 font-bold' 
                    : 'text-white hover:text-red-500'
                }`}
              >
                Filmmakers
              </a>
              <a
               href='/producers'
                className={`transition-colors text-left ${
                  isActive('/producers') 
                    ? 'text-red-500 font-bold' 
                    : 'text-white hover:text-red-500'
                }`}
              >
                Producers
              </a>
              <a
              href="/contacts"
              className={`transition-colors ${
                isActive('/contacts') 
                  ? 'text-red-500 font-bold' 
                  : 'text-white hover:text-red-500'
              }`}
            >
              Contact us
            </a>
              <a
               href="/login"
               className="bg-red-500 uppercase rounded-md text-white px-6 py-2 border border-red-500 hover:bg-transparent hover:text-red-500 transition-colors w-fit">
                Login
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
