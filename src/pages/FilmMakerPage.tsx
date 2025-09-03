import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

interface Filmmaker {
  _id: string;
  name: string;
  bio: string;
  specialization: string;
  experience: number;
  image: string;
}

const FilmMakerPage = () => {
  const [filmmakers, setFilmmakers] = useState<Filmmaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFilmmakers();
  }, []);

  const fetchFilmmakers = async () => {
    try {
      const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/filmmaker');
      const data = await response.json();
      setFilmmakers(data || []);
    } catch (err) {
      setError('Failed to load filmmakers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header/>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading filmmakers...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header/>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchFilmmakers}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Filmmakers</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Meet our talented team of creative professionals</p>
          </div>
          
          {filmmakers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No filmmakers found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filmmakers.map((filmmaker) => (
                <div key={filmmaker._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={filmmaker.image || '/placeholder-image.jpg'} 
                    alt={filmmaker.name}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{filmmaker.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{filmmaker.specialization}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{filmmaker.bio}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{filmmaker.experience} years exp.</span>
                      <Link 
                        to={`/filmmakers/${filmmaker._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilmMakerPage;