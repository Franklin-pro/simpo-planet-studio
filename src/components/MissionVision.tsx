import { Target, Eye, Heart, Shield } from "lucide-react";
import { motion } from 'framer-motion';


const MissionVisionSection = () => {


  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-red-500">Mission & Vision</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Dedicated to empowering individuals through martial arts training,
            discipline, and character development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <motion.div
            custom={0}
         initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gray-800 p-8 rounded-lg"
          >
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-red-500 mr-4" />
              <h3 className="text-3xl font-bold">Our Mission</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              At SimpoPlanet Music Label, our mission is to discover and empower
              new musical talent across Rwanda and East Africa. We are dedicated
              to promoting upcoming singers and music producers by providing
              them with access to professional recording, production, and
              promotional opportunities through Simpo Studio.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            custom={1}
             initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gray-800 p-8 rounded-lg"
          >
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-red-500 mr-4" />
              <h3 className="text-3xl font-bold">Our Vision</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our vision is to be a leading music label in East Africa, known
              for nurturing and promoting the next generation of musical talent.
              We aim to create a vibrant community of artists who can express
              themselves freely and reach audiences worldwide. Through our
              commitment to quality and innovation, we strive to elevate the
              music industry in the region.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-8">Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="w-8 h-8 text-red-500" />, title: "Respect", desc: "Honor for self, others, and the art" },
              { icon: <Shield className="w-8 h-8 text-red-500" />, title: "Discipline", desc: "Commitment to excellence in training" },
              { icon: <Target className="w-8 h-8 text-red-500" />, title: "Focus", desc: "Mental clarity and determination" },
              { icon: <Eye className="w-8 h-8 text-red-500" />, title: "Wisdom", desc: "Learning from tradition and experience" }
            ].map((value, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
