import founder from "../assets/founder.jpeg";
import { motion } from "framer-motion";
import { Quote, Music, Award, Globe, Star } from "lucide-react";

const FounderSection = () => {
  const achievements = [
    {
      icon: <Music className="w-6 h-6" />,
      title: "Reggae Pioneer",
      description: "Leading voice in East African reggae music"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Pan-Africanist",
      description: "Advocate for African unity and consciousness"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Acclaimed Artist",
      description: "Groundbreaking debut album recognition"
    }
  ];

  return (
    <section className=" bg-gray-50 pb-20 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-4"
          >
            <Star className="h-4 w-4" />
            Meet Our Founder
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            The Visionary Behind <span className="text-red-600 dark:text-red-400">Simpo Planet</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={founder}
                alt="Simpo Savior - Founder"
                className="w-full h-[600px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Floating Quote */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Quote className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium text-sm">
                      "Music is the weapon against injustice and the bridge for African unity."
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">- Simpo Savior</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Simpo Savior
                </h3>
                <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
                  Founder & Creative Director
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Born Ndizihiwe Alain Jean Sauveur
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Simpo Savior is a Rwandan reggae artist and outspoken Pan-Africanist whose music 
                  is a powerful blend of rhythm, resistance, and reflection. Known for his deep lyrics 
                  and soulful sound, Simpo uses his voice as a weapon against injustice and a bridge 
                  for African unity.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Rooted in the spirit of reggae legends but uniquely shaped by his East African heritage, 
                  Simpo Savior stands as one of the voices of conscious music in Rwanda and beyond. His 
                  groundbreaking debut album "Africa, Why Do Your Profits Go Abroad?" established him as 
                  not only a musician but also a messenger.
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Key Achievements</h4>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <div className="text-red-600 dark:text-red-400">
                        {achievement.icon}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {achievement.title}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default FounderSection;