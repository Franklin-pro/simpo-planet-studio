import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Facebook, Instagram, Twitter } from "lucide-react";
import spotifyIcon from "../assets/spotify.png"; 
import soundCloudIcon from "../assets/soundclouds.png"; // Assuming you have a soundcloud icon

const mockProducers = [
  { 
    id: 1, 
    name: "Alice", 
    level: "Beginner", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    bio: "Specializes in electronic music with a focus on atmospheric soundscapes."
  },
  { 
    id: 2, 
    name: "Bob", 
    level: "Senior", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "Award-winning producer with 10+ years experience in hip-hop and R&B."
  },
  { 
    id: 3, 
    name: "Charlie", 
    level: "Beginner", 
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "Upcoming talent specializing in lo-fi beats and chillwave."
  },
  { 
    id: 4, 
    name: "Diane", 
    level: "Senior", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    bio: "Film score composer and electronic music producer with orchestral influences."
  },
  { 
    id: 5, 
    name: "Eve", 
    level: "Senior", 
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
    bio: "Pop music specialist with multiple platinum records to her name.",
    socialMedia: {
      instagram: "https://instagram.com/eveproducer",
      twitter: "https://twitter.com/eveproducer",
      facebook: "https://facebook.com/eveproducer",
      spotifiy: "https://open.spotify.com/artist/1234567890",
      soundCloud: "https://soundcloud.com/eveproducer"
    }
  },
];

const categories = ["All", "Beginner", "Senior"];




function Producers() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducers = activeCategory === "All"
    ? mockProducers
    : mockProducers.filter(p => p.level === activeCategory);

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
            key={producer.id}
               custom={0}
         initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={producer.image}
                alt={producer.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  producer.level === "Senior" 
                    ? "bg-purple-600 text-white" 
                    : "bg-blue-600 text-white"
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
              <Eye size={20} className="text-green-500 cursor-pointer" />
           </div>
              </div>
                  
              <div className="pt-2 flex justify-between items-center">
           
                <div className="flex space-x-2">
                {producer.socialMedia && (
                  <>
                    {producer.socialMedia.instagram && (
                      <a href={producer.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram size={24} className="text-pink-400" />    
                      </a>
                    )}
                    {producer.socialMedia.twitter && (
                      <a href={producer.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter size={24} className="text-blue-400" />
                      </a>
                    )}
                    {producer.socialMedia.facebook && (
                      <a href={producer.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook size={24} className="text-blue-600" />
                      </a>
                    )}
                    {producer.socialMedia.spotifiy && (
                      <a href={producer.socialMedia.spotifiy} target="_blank" rel="noopener noreferrer">
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