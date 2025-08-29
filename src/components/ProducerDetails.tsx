import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Award, Link, Music, User, Mail, Calendar, Instagram, Twitter, Facebook, Youtube,} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface Producer {
  name: string;
  level: string;
  image?: string;
  bio: string;
  genres: string[];
  skills: string[];
  contactEmail: string;
  yearsExperience: number;
  credits: Array<{
    project: string;
    role: string;
    year: number;
  }>;
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
    spotify: string;
    soundCloud: string;
    youtube: string;
    appleMusic: string;
  };
}

function ProducerDetails() {
  const { id } = useParams<{ id: string }>();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducer = async () => {
      try {
        const response = await fetch(`https://simpo-planet-studio-bn.onrender.com/api/v1/producer/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducer(result.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch producer details:", err);
        setError('Failed to load producer details. Please try again.');
        setIsLoading(false);
      }
    };

    fetchProducer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="flex items-center space-x-3">
          <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700 text-base sm:text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !producer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="p-4 sm:p-6 bg-white border border-gray-300 text-gray-700 rounded-lg max-w-md w-full text-center shadow-sm">
          {error || 'Producer not found.'}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Section - Responsive */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Title with Icon - Responsive text sizes */}
              <div className="flex items-center mb-6 sm:mb-8">
                <Music className="text-gray-600 w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
                  {producer.name}'s Profile
                </h1>
              </div>

              {/* Main Content Grid - Responsive layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Left Column - Profile Image and Basic Info */}
                <div className="lg:col-span-1 order-1 lg:order-1">
                  {/* Profile Image - Responsive sizing */}
                  <div className="relative w-full aspect-square sm:aspect-[4/5] lg:aspect-square mb-4 sm:mb-6">
                    {producer.image ? (
                      <img
                        src={producer.image}
                        alt={producer.name}
                        className="w-full h-full object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200">
                        <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Basic Info - Responsive spacing and text */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700 font-medium break-words">{producer.level}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{producer.yearsExperience} years of experience</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <a 
                        href={`mailto:${producer.contactEmail}`} 
                        className="text-sm sm:text-base text-gray-600 hover:text-gray-800 hover:underline transition-colors break-all"
                      >
                        {producer.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Bio and Details */}
                <div className="lg:col-span-2 order-2 lg:order-2 space-y-6 sm:space-y-8">
                  
                  {/* Bio Section - Responsive text */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">About</h2>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{producer.bio}</p>
                  </div>

                  {/* Genres Section - Responsive tags */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Genres</h2>
                    <div className="flex flex-wrap gap-2">
                      {producer.genres.map((genre) => (
                        <span
                          key={genre}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors cursor-default"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Section - Responsive tags */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {producer.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Notable Credits Section - Responsive layout */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Notable Credits</h2>
                    {producer.credits.length > 0 ? (
                      <div className="space-y-3 sm:space-y-4">
                        {producer.credits.map((credit, index) => (
                          <div key={index} className="border-b border-gray-200 pb-3 sm:pb-4 last:border-b-0 last:pb-0">
                            <p className="text-sm sm:text-base text-gray-800 font-medium mb-1">{credit.project}</p>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0">
                              <p className="text-xs sm:text-sm text-gray-600">Role: {credit.role}</p>
                              <p className="text-xs sm:text-sm text-gray-600">Year: {credit.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-600">No notable credits listed.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Media Links Section - Full width, responsive */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Connect</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                  {producer.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${producer.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start p-3 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <Instagram className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">Instagram</span>
                    </a>
                  )}
                  {producer.socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${producer.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start p-3 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <Twitter className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">Twitter</span>
                    </a>
                  )}
                  {producer.socialMedia.facebook && (
                    <a
                      href={`https://facebook.com/${producer.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start p-3 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">Facebook</span>
                    </a>
                  )}
                  {producer.socialMedia.spotify && (
                    <a
                      href={producer.socialMedia.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start p-3 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <Music className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">Spotify</span>
                    </a>
                  )}
                  {producer.socialMedia.soundCloud && (
                    <a
                      href={producer.socialMedia.soundCloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start p-3 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <Link className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">SoundCloud</span>
                    </a>
                  )}
                  {producer.socialMedia.youtube && (
                    <a
                      href={producer.socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start p-3 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <Youtube className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">YouTube</span>
                    </a>
                  )}
                  {producer.socialMedia.appleMusic && (
                    <a
                      href={producer.socialMedia.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start p-3 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <Link className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">Apple Music</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ProducerDetails;