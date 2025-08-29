import { Link } from 'react-router-dom';
import { filmmakers } from '../data/filmmakers';
import Header from '../components/Header';

const FilmMakerPage = () => {
  return (
    <>
        <Header/>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Filmmakers</h1>
          <p className="text-xl text-gray-600">Meet our talented team of creative professionals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filmmakers.map((filmmaker) => (
            <div key={filmmaker._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={filmmaker.image} 
                alt={filmmaker.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{filmmaker.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{filmmaker.specialization}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{filmmaker.bio}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{filmmaker.experience} years exp.</span>
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
      </div>
    </div></>

  );
};

export default FilmMakerPage;