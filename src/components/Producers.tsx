import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Facebook, Instagram, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Placeholder icons (replace with actual asset paths if available)
const spotifyIcon = "https://via.placeholder.com/24?text=Spotify";
const soundCloudIcon = "https://via.placeholder.com/24?text=SoundCloud";

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

function Producers() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch producers from API
  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/producer');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducers(result.data || []);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load producers. Please try again.');
        setIsLoading(false);
      }
    };

    fetchProducers();
  }, []);

  // Dynamically generate categories from producer levels
  const categories = ["All", ...new Set(producers.map(p => p.level))];

  // Filter producers based on active category
  const filteredProducers = activeCategory === "All"
    ? producers
    : producers.filter(p => p.level === activeCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-300 text-lg">Loading producers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
          Simpo Planet <span className="text-red-400">Producers</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Discover talented music producers at every level of experience
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Producer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {filteredProducers.map((producer) => (
          <motion.div
            key={producer._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={producer.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={producer.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  producer.level === "Senior" 
                    ? "bg-purple-600 text-white" 
                    : producer.level === "Mid-level"
                    ? "bg-blue-600 text-white"
                    : producer.level === "Legendary"
                    ? "bg-yellow-600 text-white"
                    : "bg-green-600 text-white"
                }`}>
                  {producer.level}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{producer.name}</h3>
                  <p className="text-gray-300 truncate w-50 text-sm">{producer.bio}</p>
                </div>
                <div>
                  <Eye 
                    size={20} 
                    className="text-green-500 cursor-pointer hover:text-green-400 transition-colors" 
                    onClick={() => navigate(`/producer/${producer._id}`)}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <div className="flex space-x-2">
                  {producer.socialMedia && (
                    <>
                      {producer.socialMedia.instagram && (
                        <a href={producer.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram size={24} className="text-pink-400 hover:text-pink-300 transition-colors" />    
                        </a>
                      )}
                      {producer.socialMedia.twitter && (
                        <a href={producer.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter size={24} className="text-blue-400 hover:text-blue-300 transition-colors" />
                        </a>
                      )}
                      {producer.socialMedia.facebook && (
                        <a href={producer.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook size={24} className="text-blue-600 hover:text-blue-500 transition-colors" />
                        </a>
                      )}
                      {producer.socialMedia.spotify && (
                        <a href={producer.socialMedia.spotify} target="_blank" rel="noopener noreferrer">
                          <img src={spotifyIcon} alt="Spotify" className="w-6 h-6" />
                        </a>
                      )}
                      {producer.socialMedia.soundCloud && (
                        <a href={producer.socialMedia.soundCloud} target="_blank" rel="noopener noreferrer">
                          <img src={soundCloudIcon} alt="SoundCloud" className="w-6 h-6" />
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Producers;