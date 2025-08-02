import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/abt.png';
import { ArrowBigLeft, ArrowLeft } from 'lucide-react';

function LoginAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      const response = await fetch('http://localhost:3000/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      setEmail('');
      setPassword('');
      setRememberMe(false);
      setIsLoading(false);
      navigate('/admin/artists/create');
    } catch (err) {
          console.error('Login error:', err); 
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Left Side: Login Form */}
        <div className="p-10 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <a href="/" className='flex items-center gap-2 mb-2 text-red-500'><ArrowLeft/> <span>back to home</span></a>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Holla, Welcome Back</h2>
            <p className="text-gray-500">Hey, welcome back to your special place only admin can logged in</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md animate-fade-in">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="stanley@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-red-600 rounded focus:ring-red-500 cursor-pointer"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-red-600 hover:text-red-800 hover:underline transition">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="text-red-600 hover:text-red-800 hover:underline transition">
              Contact admin
            </a>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-red-600 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0"></div>
          <img
            src={logo}
            alt="Login Illustration"
            className="w-4/5 max-w-md z-10 transform hover:scale-105 transition duration-500"
          />
          <div className="absolute bottom-8 left-8 right-8 text-white z-10">
            <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
            <p className="opacity-90">Access your exclusive admin tools and analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAccount;