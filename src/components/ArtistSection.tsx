import { Instagram, Youtube, Twitter, Facebook, Music, Eye, ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Artist {
  _id: string;
  name: string;
  bio: string;
  imageUrl: string;
  age: string;
  management: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
}

interface ArtistSectionProps {
  isHomePage?: boolean;
}

const ArtistSection = ({ isHomePage = false }: ArtistSectionProps) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/artist');
        if (response.ok) {
          const data = await response.json();
          setArtists(isHomePage ? data.slice(0, 4) : data);
        }
      } catch (err) {
        console.error('Error fetching artists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <section className=" bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="break-inside-avoid animate-pulse">
                <div className="bg-gray-800 rounded-2xl h-80 mb-8"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="artists" className="py-20 bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            Our <span className="text-red-500">Artists</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Meet the incredible talent that defines our sound and vision
          </motion.p>
        </div>
      </div>

      {/* Artists Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {artists.length === 0 ? (
          <div className="text-center py-20">
            <Music className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No artists found</h3>
            <p className="text-gray-500">Check back soon for our featured artists</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {artists.map((artist, index) => (
              <motion.div
                key={artist._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid group cursor-pointer"
              >
                <Link to={`/artist/${artist._id}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Artist';
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{artist.name}</h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{artist.bio}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span className="px-2 py-1 bg-red-600 rounded-full text-xs">
                              {artist.management}
                            </span>
                          </div>
                          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                            <ZoomIn className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex gap-2 mt-4">
                          {artist.socialLinks.instagram && (
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Instagram className="h-4 w-4 text-white" />
                            </div>
                          )}
                          {artist.socialLinks.twitter && (
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Twitter className="h-4 w-4 text-white" />
                            </div>
                          )}
                          {artist.socialLinks.youtube && (
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Youtube className="h-4 w-4 text-white" />
                            </div>
                          )}
                          {artist.socialLinks.facebook && (
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Facebook className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-colors duration-500"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button - Only show on home page */}
        {isHomePage && artists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link
              to="/artists"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-medium transition-colors"
            >
              <Eye className="h-5 w-5" />
              View All Artists
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ArtistSection;