import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, Award, Film, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PortfolioItem {
  title: string;
  year: number;
  role: string;
}

interface Filmmaker {
  _id: string;
  name: string;
  bio: string;
  specialization: string;
  experience: number;
  image: string;
  isActive?: boolean;
  portfolio?: PortfolioItem[];
  contact?: {
    email: string;
    phone: string;
  };
}

const FilmMakerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [filmmaker, setFilmmaker] = useState<Filmmaker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchFilmmaker(id);
    }
  }, [id]);

  const fetchFilmmaker = async (filmakerId: string) => {
    try {
      const response = await fetch(`https://simpo-planet-studio-bn.onrender.com/api/v1/filmmaker/${filmakerId}`);
      if (!response.ok) {
        throw new Error('Filmmaker not found');
      }
      const data = await response.json();
      setFilmmaker(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load filmmaker');
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
            <p className="text-gray-600 dark:text-gray-400">Loading filmmaker...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !filmmaker) {
    return (
      <>
        <Header/>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Filmmaker Not Found'}
            </h1>
            <Link to="/filmmakers" className="text-blue-600 hover:underline">
              Back to Filmmakers
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
<>    <Header/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl  mt-20 mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/filmmakers" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Filmmakers
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={filmmaker.image} 
                alt={filmmaker.name}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{filmmaker.name}</h1>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">{filmmaker.specialization}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{filmmaker.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h3>
                    <p className="text-gray-600 dark:text-gray-300">{filmmaker.experience} years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      filmmaker.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {filmmaker.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              {filmmaker.portfolio && filmmaker.portfolio.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Film className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio</h3>
                  </div>
                  <div className="space-y-3">
                    {filmmaker.portfolio.map((project, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{project.role} • {project.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filmmaker.contact && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                  </div>
                  <div className="space-y-3">
                    {filmmaker.contact.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-300">{filmmaker.contact.email}</p>
                      </div>
                    )}
                    {filmmaker.contact.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-300">{filmmaker.contact.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
 </>
  );
};

export default FilmMakerDetailsPage;