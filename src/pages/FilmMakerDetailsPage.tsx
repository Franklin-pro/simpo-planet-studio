import { useParams, Link } from 'react-router-dom';
import { filmmakers } from '../data/filmmakers';
import Header from '../components/Header';

const FilmMakerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const filmmaker = filmmakers.find(f => f._id === id);

  if (!filmmaker) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Filmmaker Not Found</h1>
          <Link to="/filmmakers" className="text-blue-600 hover:underline">
            Back to Filmmakers
          </Link>
        </div>
      </div>
    );
  }

  return (
<>    <Header/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/filmmakers" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Filmmakers
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Experience</h3>
                  <p className="text-gray-600 dark:text-gray-300">{filmmaker.experience} years</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    filmmaker.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {filmmaker.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Portfolio</h3>
                <div className="space-y-3">
                  {filmmaker.portfolio.map((project, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{project.role} • {project.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Email:</span> {filmmaker.contact.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Phone:</span> {filmmaker.contact.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 </>
  );
};

export default FilmMakerDetailsPage;