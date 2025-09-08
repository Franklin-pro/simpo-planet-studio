import { Target, Eye, Heart, Music, Globe, Award } from "lucide-react";
import { motion } from 'framer-motion';

const MissionVisionSection = () => {
  const coreValues = [
    { 
      icon: <Music className="w-6 h-6" />, 
      title: "Innovation", 
      desc: "Pushing creative boundaries in music production" 
    },
    { 
      icon: <Heart className="w-6 h-6" />, 
      title: "Passion", 
      desc: "Genuine love for music and artist development" 
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      title: "Unity", 
      desc: "Building bridges through African musical heritage" 
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      title: "Excellence", 
      desc: "Commitment to the highest quality standards" 
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-4"
          >
            <Target className="h-4 w-4" />
            Our Purpose & Direction
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Mission, Vision & <span className="text-red-600 dark:text-red-400">Values</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Discover what drives us to empower the next generation of East African musical talent
          </motion.p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                <p className="text-red-600 dark:text-red-400 font-medium">What We Do</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              At SimpoPlanet Music Label, our mission is to discover and empower new musical talent 
              across Rwanda and East Africa. We are dedicated to promoting upcoming singers and music 
              producers by providing them with access to professional recording, production, and 
              promotional opportunities through Simpo Studio.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Where We're Going</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Our vision is to be a leading music label in East Africa, known for nurturing and 
              promoting the next generation of musical talent. We aim to create a vibrant community 
              of artists who can express themselves freely and reach audiences worldwide through our 
              commitment to quality and innovation.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Core Values</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            The fundamental principles that guide our decisions and shape our culture
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-red-600 dark:text-red-400">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-600/15 to-red-700/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Be Part of Our Mission?
            </h3>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Join us in shaping the future of East African music. Whether you're an artist, 
              producer, or music enthusiast, there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              onClick={() => window.location.href = '/contacts'}
               className="px-8 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;