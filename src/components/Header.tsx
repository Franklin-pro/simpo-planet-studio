import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import light from '../assets/SIMPO-Logo.jpeg';
// import dark from '../assets/dark.jpeg';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/15 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <img src={light} alt="Simpo Planet Logo" className="w-40 h-14 rounded-xl object-cover" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href='/'
              className="text-white hover:text-red-500 transition-colors"
            >
              Home
            </a>
            <a
              href="/abouts"
              className="text-white hover:text-red-500 transition-colors"
            >
              About us
            </a>
            <a
             href='/gallery'
              className="text-white hover:text-red-500 transition-colors"
            >
              Gallery
            </a>
            <a
            href='/musics'
              className="text-white hover:text-red-500 transition-colors"
            >
              Musics
            </a>
            <a
            href='/contacts'
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-red-500 transition-colors"
            >
              Contact Us
            </a>
            <button className="bg-red-500 uppercase rounded-lg cursor-pointer text-white px-6 py-2 border border-red-500 hover:bg-transparent hover:text-red-500 transition-colors">
              Join Now
            </button>
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
              className="text-white hover:text-red-500 transition-colors"
            >
             Home
            </a>
                  <a
              href="/abouts"
              className="text-white hover:text-red-500 transition-colors"
            >
              About us
            </a>
                   <a
              href="/musics"
              className="text-white hover:text-red-500 transition-colors"
            >
             Musics
            </a>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-white hover:text-red-500 transition-colors text-left"
              >
                Gallery
              </button>
              <a
              href="/contacts"
              className="text-white hover:text-red-500 transition-colors"
            >
              Contact us
            </a>
              <button className="bg-red-500 uppercase rounded-md text-white px-6 py-2 border border-red-500 hover:bg-transparent hover:text-red-500 transition-colors w-fit">
                Join Now
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
