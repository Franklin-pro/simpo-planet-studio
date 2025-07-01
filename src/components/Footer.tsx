import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import light from '../assets/SIMPO-Logo.jpeg';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.footer 
      className="bg-gray-900 text-white py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="text-2xl font-bold text-white">
              <motion.img 
                src={light} 
                alt="Simpo Planet Logo" 
                className="w-40 h-14 rounded-xl object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            <p className="text-gray-400">
              Master the art of discipline, strength, and technique at our premier martial arts school.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: "#ef4444" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Facebook className="w-6 h-6 text-gray-400" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: "#ef4444" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Twitter className="w-6 h-6 text-gray-400" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: "#ef4444" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Instagram className="w-6 h-6 text-gray-400" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: "#ef4444" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Youtube className="w-6 h-6 text-gray-400" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Programs', 'Testimonials', 'Contact'].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {['Karate', 'Taekwondo', 'Kung Fu', 'Mixed Martial Arts', 'Private Lessons'].map((program, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-gray-400 hover:text-red-500 cursor-pointer">
                    {program}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">(+250) 783 054 403</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">Simpoplanet@gmail.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">
                  Kigali, Rwanda<br />Remera-Giporoso, KN5rd
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Simpo Planet. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;