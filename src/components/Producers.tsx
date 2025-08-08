import { useState } from "react";
import { motion } from "framer-motion";

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
    bio: "Pop music specialist with multiple platinum records to her name."
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
              <h3 className="text-xl font-bold text-white">{producer.name}</h3>
              <p className="text-gray-300 text-sm">{producer.bio}</p>
              <div className="pt-2 flex justify-between items-center">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  View Profile
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
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