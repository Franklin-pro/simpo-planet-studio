import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, Music, User, Mail, Calendar, Instagram, Twitter, Facebook, Youtube, ArrowLeft, ExternalLink } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface Producer {
  _id: string;
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
      } catch (err) {
        console.error("Failed to fetch producer details:", err);
        setError('Failed to load producer details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducer();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header/>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading producer details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !producer) {
    return (
      <>
        <Header/>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Producer Not Found'}
            </h1>
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Producers
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl mt-20 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Back Link */}
          <Link to="/" className="text-blue-600 mb-4 p-2 dark:text-blue-400 hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Producers
          </Link>
            <div className="md:flex">
              {/* Left Column - Image */}
              <div className="md:w-1/3">
                <div className="h-96 md:h-full">
                  {producer.image ? (
                    <img 
                      src={producer.image} 
                      alt={producer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="md:w-2/3 p-8">
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{producer.name}</h1>
                  <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">{producer.level}</p>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{producer.bio}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Experience</h3>
                      <p className="text-gray-600 dark:text-gray-300">{producer.yearsExperience} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Contact</h3>
                      <a 
                        href={`mailto:${producer.contactEmail}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {producer.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Genres */}
                {producer.genres && producer.genres.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Music className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Genres</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {producer.genres.map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {producer.skills && producer.skills.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {producer.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Credits */}
                {producer.credits && producer.credits.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notable Credits</h3>
                    <div className="space-y-3">
                      {producer.credits.map((credit, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white">{credit.project}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{credit.role} • {credit.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Media */}
                {producer.socialMedia && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
                    <div className="flex flex-wrap gap-3">
                      {producer.socialMedia.instagram && (
                        <a
                          href={producer.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors"
                        >
                          <Instagram className="h-4 w-4" />
                          Instagram
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {producer.socialMedia.twitter && (
                        <a
                          href={producer.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {producer.socialMedia.youtube && (
                        <a
                          href={producer.socialMedia.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          <Youtube className="h-4 w-4" />
                          YouTube
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {producer.socialMedia.facebook && (
                        <a
                          href={producer.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          <Facebook className="h-4 w-4" />
                          Facebook
                          <ExternalLink className="h-3 w-3" />
                        </a>
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
}

export default ProducerDetails;