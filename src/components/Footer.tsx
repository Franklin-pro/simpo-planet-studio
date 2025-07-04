import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Music, Disc } from 'lucide-react';
import light from '../assets/SIMPO-Logo.jpeg';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { Icon: Facebook, url: 'https://www.facebook.com/share/16Lfs1mjre/' },
    { Icon: Twitter, url: '#' }, // You can add your Twitter link here
    { Icon: Instagram, url: 'https://www.instagram.com/simpo_planet/profilecard/?igsh=MXN1c3N0MnF1NWp1ag==' },
    { Icon: Youtube, url: 'https://youtube.com/@simpoplanet?si=dQN4tDhWEFssCf0W' },
    { Icon: Disc, url: 'https://www.tiktok.com/@simpo.planet?_t=ZM-8xcL56gvclp&_r=1' }, // TikTok (using Disc icon as placeholder)
    { Icon: Music, url: 'https://audiomack.com/simpoplanet/song/umunsi?share-user-id=18684387' } // Audiomack
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
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
              Through our state-of-the-art Simpo Studio, we provide a creative space for new singers and music producers to grow and share their voices with the world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, url }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: "#ef4444" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-6 h-6 text-gray-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Music', 'Gallery', 'Contact'].map((link, index) => (
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {['Label', 'Freestyle', 'Podcast', 'Competition', 'Cypher'].map((program, index) => (
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              {[
                { icon: Phone, text: "(+250) 783 054 403" },
                { icon: Mail, text: "Simpoplanet@gmail.com" },
                { icon: MapPin, text: "Kigali, Rwanda\nRemera-Giporoso, KN5rd" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-4 h-4 text-red-500" />
                  <span className="text-gray-400 whitespace-pre-line">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Simpo Planet. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
