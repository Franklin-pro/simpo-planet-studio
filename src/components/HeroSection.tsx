import { motion } from 'framer-motion';
import { Phone, Play, Star, Music, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero.png';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-red-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-red-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-xs sm:text-sm font-medium"
            >
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">East Africa's Premier Music Label</span>
              <span className="sm:hidden">Premier Music Label</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                Simpo Planet
                <br />
                <span className="text-red-500">Studio</span>
              </h1>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-red-500 rounded-full mx-auto lg:mx-0"></div>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0"
            >
              Discovering and nurturing exceptional talent across East Africa. 
              Where creativity meets opportunity in the heart of Rwanda's music scene.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-500">50+</div>
                <div className="text-xs sm:text-sm text-gray-400">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-500">100+</div>
                <div className="text-xs sm:text-sm text-gray-400">Tracks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-500">5+</div>
                <div className="text-xs sm:text-sm text-gray-400">Years</div>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start"
            >
              <motion.button 
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">JOIN STUDIO TODAY</span>
                  <span className="sm:hidden">JOIN STUDIO</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
              
              <motion.button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/20 hover:border-red-500/50 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/musics')}
              >
                Explore Music
              </motion.button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-6 sm:pt-8 border-t border-gray-800"
            >
              <p className="text-gray-400 text-xs sm:text-sm mb-2">Get in touch:</p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-white">
                <Phone size={16} className="text-red-500 sm:w-[18px] sm:h-[18px]" />
                <span className="font-medium text-sm sm:text-base">(+250) 783 054 403</span>
              </div>
            </motion.div>
          </div>
          
          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative order-first lg:order-last mt-8 lg:mt-0"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 bg-red-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 bg-red-600/10 rounded-full blur-2xl"></div>
              
              {/* Main Image */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hero} 
                  alt="Simpo Planet Studio" 
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3"
                >
                  <Music className="h-4 w-4 sm:h-6 sm:w-6 text-red-500" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-black/50 backdrop-blur-sm rounded-lg p-2 sm:p-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs sm:text-sm font-medium">Live Studio</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="p-2 sm:p-3 bg-red-600/20 rounded-lg flex-shrink-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">Artist Development</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Nurturing talent from discovery to stardom</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="p-2 sm:p-3 bg-red-600/20 rounded-lg flex-shrink-0">
              <Music className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">Music Production</h3>
              <p className="text-gray-400 text-xs sm:text-sm">State-of-the-art recording facilities</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="p-2 sm:p-3 bg-red-600/20 rounded-lg flex-shrink-0">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">Industry Recognition</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Award-winning productions and artists</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;