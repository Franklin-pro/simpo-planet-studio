import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sun, Moon, Globe } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import light from '../assets/SIMPO-Logo.jpeg';
// import dark from '../assets/dark.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const isActive = (path: string) => location.pathname === path;

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 dark:bg-black/95 bg-white backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold dark:text-white">
            <img src={light} alt="Simpo Planet Logo" className="w-40 h-14 rounded-xl object-cover" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
          
            <a
              href='/'
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
              {t('nav.home')}
            </a>
            <a
              href="/abouts"
              className={`transition-colors ${
                isActive('/abouts') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
              {t('nav.about')}
            </a>
            <a
             href='/gallery'
              className={`transition-colors ${
                isActive('/gallery') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
              {t('nav.gallery')}
            </a>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 dark:text-white hover:text-red-500 transition-colors"
              >
                {t('nav.talent')}
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  <a
                    href="/artists"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors"
                  >
                    {t('nav.artists')}
                  </a>
                  <a
                    href="/filmmakers"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors"
                  >
                    {t('nav.filmmakers')}
                  </a>
                  <a
                    href="/producers"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors"
                  >
                    {t('nav.producers')}
                  </a>
                </div>
              )}
            </div>
            <a
            href='/musics'
              className={`transition-colors ${
                isActive('/musics') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
              {t('nav.musics')}
            </a>
            <a
            href='/contacts'
              className={`transition-colors ${
                isActive('/contacts') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
              {t('nav.contact')}
            </a>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Change language"
              >
                <Globe size={16} className="dark:text-white" />
                <span className="text-sm dark:text-white">{currentLanguage.flag}</span>
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                        i18n.language === lang.code ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
            
            <a href='/login' className="bg-red-500 uppercase rounded-lg cursor-pointer text-white px-6 py-2 border border-red-500 hover:bg-transparent hover:text-red-500 transition-colors">
              {t('nav.login')}
            </a>
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-1 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Change language"
              >
                <Globe size={16} className="dark:text-white" />
                <span className="text-sm dark:text-white">{currentLanguage.flag}</span>
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                        i18n.language === lang.code ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
            
            <button 
              className="dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col space-y-4">
                 <a
              href="/"
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
             {t('nav.home')}
            </a>
                  <a
              href="/abouts"
              className={`transition-colors ${
                isActive('/abouts') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
              {t('nav.about')}
            </a>
                   <a
              href="/musics"
              className={`transition-colors ${
                isActive('/musics') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
             {t('nav.musics')}
            </a>
              <a
               href='/gallery'
                className={`transition-colors text-left ${
                  isActive('/gallery') 
                    ? 'text-red-500 font-bold' 
                    : 'dark:text-white hover:text-red-500'
                }`}
              >
                {t('nav.gallery')}
              </a>
              <a
               href='/artists'
                className={`transition-colors text-left ${
                  isActive('/artists') 
                    ? 'text-red-500 font-bold' 
                    : 'dark:text-white hover:text-red-500'
                }`}
              >
                {t('nav.artists')}
              </a>
                  <a
               href='/filmmakers'
                className={`transition-colors text-left ${
                  isActive('/filmmakers') 
                    ? 'text-red-500 font-bold' 
                    : 'dark:text-white hover:text-red-500'
                }`}
              >
                {t('nav.filmmakers')}
              </a>
              <a
               href='/producers'
                className={`transition-colors text-left ${
                  isActive('/producers') 
                    ? 'text-red-500 font-bold' 
                    : 'dark:text-white hover:text-red-500'
                }`}
              >
                {t('nav.producers')}
              </a>
              <a
              href="/contacts"
              className={`transition-colors ${
                isActive('/contacts') 
                  ? 'text-red-500 font-bold' 
                  : 'dark:text-white hover:text-red-500'
              }`}
            >
              {t('nav.contact')}
            </a>
              <a
               href="/login"
               className="bg-red-500 uppercase rounded-md dark:text-white px-6 py-2 border border-red-500 hover:bg-transparent hover:text-red-500 transition-colors w-fit">
                {t('nav.login')}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;