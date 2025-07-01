import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import hero from '../assets/hero.png';


const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  const dotVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 0.05,
      transition: {
        delay: i * 0.005,
        duration: 0.5
      }
    })
  };

  return (
    <section id="home" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={dotVariants}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-20 md:pt-32 pb-16 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div className="space-y-4" variants={itemVariants}>
              <p className="text-gray-300 text-lg tracking-wider uppercase">
                Welcome to our Simpo Planet Studio Label
              </p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Simpo Planet 
                <br />
                <span className="text-red-500">Studio.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 text-lg max-w-md leading-relaxed"
              variants={itemVariants}
            >
              Master the art of discipline, strength, and technique. Our expert instructors guide you through traditional martial arts training in a supportive environment.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 items-start"
              variants={itemVariants}
            >
              <motion.button 
                className="bg-red-500 cursor-pointer rounded-lg text-white px-8 py-4 text-lg font-semibold hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                JOIN STUDIO TODAY
              </motion.button>
              
              <div className="space-y-2">
                <p className="text-gray-400">Register now:</p>
                <div className="flex items-center gap-2 text-white text-xl font-semibold">
                  <Phone size={20} className="text-red-500" />
                  (+250)783054403
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Content - Martial Artist Image */}
          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br rounded-lg overflow-hidden">
              <div className="absolute inset-0"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <motion.img 
                  src={hero} 
                  alt="Martial artist" 
                  className='w-full h-full object-cover rounded-lg'
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;