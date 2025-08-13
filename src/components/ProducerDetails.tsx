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
        const response = await fetch(`http://localhost:3000/api/v1/producer/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducer(result.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load producer details. Please try again.');
        setIsLoading(false);
      }
    };

    fetchProducer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !producer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error || 'Producer not found.'}
        </div>
      </div>
    );
  }

  return (
    <>
     <Header/>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg my-8">
      <div className="flex items-center mb-8">
        <Music className="text-indigo-600 text-3xl mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">{producer.name}'s Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image and Basic Info */}
        <div className="md:col-span-1">
          <div className="relative w-full h-64 mb-4">
            {producer.image ? (
              <img
                src={producer.image}
                alt={producer.name}
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-gray-700 font-medium">{producer.level}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-gray-700">{producer.yearsExperience} years of experience</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-indigo-600 mr-2" />
              <a href={`mailto:${producer.contactEmail}`} className="text-indigo-600 hover:underline">
                {producer.contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Bio and Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Bio */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
            <p className="text-gray-600 leading-relaxed">{producer.bio}</p>
          </div>

          {/* Genres */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {producer.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm hover:bg-indigo-200 transition-colors cursor-default"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {producer.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm hover:bg-indigo-200 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Notable Credits */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Notable Credits</h2>
            {producer.credits.length > 0 ? (
              <div className="space-y-4">
                {producer.credits.map((credit, index) => (
                  <div key={index} className="border-b border-gray-200 pb-2">
                    <p className="text-gray-800 font-medium">{credit.project}</p>
                    <p className="text-gray-600 text-sm">Role: {credit.role}</p>
                    <p className="text-gray-600 text-sm">Year: {credit.year}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No notable credits listed.</p>
            )}
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Connect</h2>
            <div className="flex flex-wrap gap-4">
              {producer.socialMedia.instagram && (
                <a
                  href={`https://instagram.com/${producer.socialMedia.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </a>
              )}
              {producer.socialMedia.twitter && (
                <a
                  href={`https://twitter.com/${producer.socialMedia.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </a>
              )}
              {producer.socialMedia.facebook && (
                <a
                  href={`https://facebook.com/${producer.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </a>
              )}
              {producer.socialMedia.spotify && (
                <a
                  href={producer.socialMedia.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {/* <Spotify className="w-5 h-5 mr-2" /> */}
                  Spotify
                </a>
              )}
              {producer.socialMedia.soundCloud && (
                <a
                  href={producer.socialMedia.soundCloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Link className="w-5 h-5 mr-2" />
                  SoundCloud
                </a>
              )}
              {producer.socialMedia.youtube && (
                <a
                  href={producer.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  YouTube
                </a>
              )}
              {producer.socialMedia.appleMusic && (
                <a
                  href={producer.socialMedia.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Link className="w-5 h-5 mr-2" />
                  Apple Music
                </a>
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