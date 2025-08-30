import { useTheme } from '../pages/hooks/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          isDark ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      {/* Visual indicators */}
      <span className="absolute left-1 text-xs text-gray-600">☀️</span>
      <span className="absolute right-1 text-xs text-gray-300">🌙</span>
    </button>
  );
};

export default ThemeToggle;