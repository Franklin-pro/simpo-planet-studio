import { useParams, Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Disc, Music, Globe, Calendar, ArrowLeft, User, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

interface Artist {
  _id: string;
  name: string;
  imageUrl: string;
  management: string;
  age: string;
  bio: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  createdAt: string;
  updatedAt: string;
}

const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://simpo-planet-studio-bn.onrender.com/api/v1/artist/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch artist: ${response.status}`);
        }

        const data = await response.json();
        setArtist(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading artist details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !artist) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Artist Not Found'}
            </h1>
            <Link to="/artists" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Artists
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 mt-20 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link to="/artists" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Artists
          </Link>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="md:flex">
              {/* Left Column - Image */}
              <div className="md:w-1/3">
                <div className="h-96 md:h-full">
                  {artist.imageUrl ? (
                    <img 
                      src={artist.imageUrl} 
                      alt={artist.name}
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
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{artist.name}</h1>
                  <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">{artist.management}</p>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{artist.bio}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Age</h3>
                      <p className="text-gray-600 dark:text-gray-300">{artist.age} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Music className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Genre</h3>
                      <p className="text-gray-600 dark:text-gray-300">Music Artist</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                      <p className="text-gray-600 dark:text-gray-300">Rwanda</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Joined</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {new Date(artist.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect with {artist.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    {artist.socialLinks.facebook && (
                      <a
                        href={`https://${artist.socialLinks.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {artist.socialLinks.instagram && (
                      <a
                        href={`https://instagram.com/${artist.socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                        Instagram
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {artist.socialLinks.twitter && (
                      <a
                        href={`https://twitter.com/${artist.socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {artist.socialLinks.youtube && (
                      <a
                        href={`https://youtube.com/${artist.socialLinks.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <Youtube className="h-4 w-4" />
                        YouTube
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {artist.socialLinks.tiktok && (
                      <a
                        href={`https://tiktok.com/@${artist.socialLinks.tiktok}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Disc className="h-4 w-4" />
                        TikTok
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtistDetails;