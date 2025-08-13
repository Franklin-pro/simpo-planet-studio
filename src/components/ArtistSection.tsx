import { Instagram, Disc, Youtube, Twitter, Facebook, Eye, Music, Mic2, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

interface Artist {
  _id: string;
  name: string;
  bio: string;
  imageUrl: string;
  age: string;
  management: string;
  genre?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
}

const ArtistSection = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/artist');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtists(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Error fetching artists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const socialIcons = [
    { name: 'instagram', icon: <Instagram size={18} /> },
    { name: 'twitter', icon: <Twitter size={18} /> },
    { name: 'tiktok', icon: <Disc size={18} /> },
    { name: 'youtube', icon: <Youtube size={18} /> },
    { name: 'facebook', icon: <Facebook size={18} /> },
  ];

  if (loading) {
    return (
      <section id="artists" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Artist <span className="text-red-500">Label</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                <Skeleton height={320} className="mb-4 rounded-xl" />
                <Skeleton count={3} className="mb-2" />
                <div className="flex gap-2 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} circle width={40} height={40} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="artists" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 p-8 rounded-xl max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Error Loading Artists</h2>
            <p className="text-red-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (artists.length === 0) {
    return (
      <section id="artists" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 p-8 rounded-xl max-w-2xl mx-auto"
          >
            <Music size={48} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-3xl font-bold mb-4">No Artists Found</h2>
            <p className="text-gray-300 mb-6">We couldn't find any artists in our database.</p>
            <Link
              to="/login"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors inline-block"
            >
              Suggest an Artist
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="artists" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Our <span className="text-red-500">Artists</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover the talented artists that make our label special
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gray-800/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50"
            >
              <Link to={`/artist/${artist._id}`} className="block">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Artist+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-gray-300 line-clamp-3">{artist.bio}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      artist.management?.toLowerCase().includes('independent') 
                        ? 'bg-blue-600/90 text-white' 
                        : 'bg-red-600/90 text-white'
                    }`}>
                      {artist.management}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors">
                      {artist.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <User size={14} className="mr-1" />
                      <span>{artist.age} years</span>
                      {artist.genre && (
                        <>
                          <span className="mx-2">•</span>
                          <Mic2 size={14} className="mr-1" />
                          <span>{artist.genre}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link 
                    to={`/artist/${artist._id}`}
                    className="p-2 bg-gray-700/50 hover:bg-red-600 rounded-full transition-colors"
                    aria-label={`View ${artist.name}'s profile`}
                  >
                    <Eye size={18} />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {socialIcons.map((social) => {
                    const link = artist.socialLinks[social.name as keyof typeof artist.socialLinks];
                    return link ? (
                      <motion.a
                        key={social.name}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${artist.name} ${social.name}`}
                      >
                        {social.icon}
                      </motion.a>
                    ) : null;
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;