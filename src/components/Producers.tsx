import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Facebook, Instagram, Twitter, Heart, ZoomIn, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface ProducersProps {
  isHomePage?: boolean;
}

function Producers({ isHomePage = false }: ProducersProps) {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/producer');
        if (response.ok) {
          const result = await response.json();
          setProducers(result.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch producers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducers();
  }, []);

  const categories = ["All", ...new Set(producers.map(p => p.level))];
  let filteredProducers = activeCategory === "All"
    ? producers
    : producers.filter(p => p.level === activeCategory);
  
  // Limit to 4 items on home page
  if (isHomePage) {
    filteredProducers = filteredProducers.slice(0, 4);
  }

  if (isLoading) {
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
    <section className=" bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            Our <span className="text-red-500">Producers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Discover the masterminds behind the beats and melodies
          </motion.p>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Producers Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredProducers.length === 0 ? (
          <div className="text-center py-20">
            <Music className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No producers found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {filteredProducers.map((producer, index) => (
              <motion.div
                key={producer._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => navigate(`/producer/${producer._id}`)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                  <img
                    src={producer.image || "https://via.placeholder.com/400x500?text=Producer"}
                    alt={producer.name}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{producer.name}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{producer.bio}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{producer.yearsExperience}+ years</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            producer.level === "Senior" 
                              ? "bg-purple-600" 
                              : producer.level === "Mid-level"
                              ? "bg-blue-600"
                              : producer.level === "Legendary"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                          }`}>
                            {producer.level}
                          </span>
                        </div>
                        <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                          <ZoomIn className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex gap-2 mt-4">
                        {producer.socialMedia?.instagram && (
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Instagram className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {producer.socialMedia?.twitter && (
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Twitter className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {producer.socialMedia?.facebook && (
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
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button - Only show on home page */}
        {isHomePage && filteredProducers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate('/producers')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-medium transition-colors"
            >
              <Eye className="h-5 w-5" />
              View All Producers
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Producers;