import { useState, type FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/SIMPO-Logo-1.png';
import { ArrowLeft } from 'lucide-react';

function LoginAccount() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [username, setusername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  const formContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (isCreateAccount) {
      if (!username || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
    } else {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isCreateAccount) {
        // Create account logic
        const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/admin/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        setError('');
        setIsCreateAccount(false);
        setusername('');
      } else {
        // Login logic
        const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/admin/login', {
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
        if (data.data.userType !== 'admin') {
          navigate('/');
        }else{
    navigate('/admin');
        }
      }
      setEmail('');
      setPassword('');
      setRememberMe(false);
    } catch (err) {
      console.error('Auth error:', err); 
      setError(isCreateAccount ? 'Registration failed. Please try again.' : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormMode = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate the form container
    if (formContainerRef.current) {
      formContainerRef.current.style.transform = 'translateX(20px)';
      formContainerRef.current.style.opacity = '0';
    }
    
    // Animate the image container
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = 'translateX(-20px)';
      imageContainerRef.current.style.opacity = '0';
    }
    
    // After a short delay, toggle the mode and animate back in
    setTimeout(() => {
      setIsCreateAccount(!isCreateAccount);
      setError('');
      setEmail('');
      setPassword('');
      setusername('');
      
      // Animate elements back into view
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.style.transform = 'translateX(0)';
          formContainerRef.current.style.opacity = '1';
        }
        
        if (imageContainerRef.current) {
          imageContainerRef.current.style.transform = 'translateX(0)';
          imageContainerRef.current.style.opacity = '1';
        }
        
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl shadow-xl rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl bg-white">
        {/* Form Side */}
        <div 
          ref={formContainerRef}
          className={`p-8 md:p-10 flex flex-col justify-center transition-all duration-300 ease-out ${isCreateAccount ? 'md:order-2' : 'md:order-1'}`}
        >
          <div className="mb-8">
            <a href="/" className='flex items-center gap-2 mb-2 text-red-500 transition-colors hover:text-red-700'>
              <ArrowLeft size={18}/> <span>back to home</span>
            </a>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 transition-all duration-500">
              {isCreateAccount ? 'Create Account' : 'Holla, Welcome Back'}
            </h2>
            <p className="text-gray-500 transition-all duration-500">
              {isCreateAccount ? 'Join our admin team and get access to exclusive tools' : 'Hey, welcome back to your special place only admin can logged in'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md animate-fade-in">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {isCreateAccount && (
                <div className="animate-fade-in-down">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  />
                </div>
              )}
              <div className={isCreateAccount ? 'animate-fade-in-down delay-100' : ''}>
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
              <div className={isCreateAccount ? 'animate-fade-in-down delay-200' : ''}>
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

            {!isCreateAccount && (
              <div className="flex items-center justify-between text-sm animate-fade-in">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-red-600 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} transform hover:scale-[1.02] active:scale-[0.98] transition-transform`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isCreateAccount ? 'Creating Account...' : 'Signing in...'}
                </span>
              ) : (isCreateAccount ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isCreateAccount ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              type="button"
              onClick={toggleFormMode}
              className="text-red-600 hover:text-red-800 hover:underline transition font-medium"
            >
              {isCreateAccount ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div 
          ref={imageContainerRef}
          className={`hidden md:flex items-center justify-center bg-gradient-to-br from-red-300 to-red-500 p-8 relative overflow-hidden transition-all duration-300 ease-out ${isCreateAccount ? 'md:order-1' : 'md:order-2'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={logo}
              alt="Admin Illustration"
              className="w-4/5 max-w-md z-10 transform transition duration-700 hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 right-8 text-white z-10 transition-all duration-500">
              <h3 className="text-xl font-bold mb-2">
                {isCreateAccount ? 'Join Our Team' : 'Admin Dashboard'}
              </h3>
              <p className="opacity-90">
                {isCreateAccount ? 'Become part of our exclusive admin community' : 'Access your exclusive admin tools and analytics'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out forwards;
        }
        
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}

export default LoginAccount;