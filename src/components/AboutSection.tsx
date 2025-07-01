import { Award, Users, Clock, Target } from "lucide-react";
import about from "../assets/about.png"; // Adjust the path as necessary
import { motion } from 'framer-motion';

const AboutSection = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Artist Trained" },
    { icon: <Award className="w-8 h-8" />, number: "15+", label: "Years Experience" },
    { icon: <Clock className="w-8 h-8" />, number: "24/7", label: "Support Available" },
    { icon: <Target className="w-8 h-8" />, number: "95%", label: "Success Rate" },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative w-full rounded-lg overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src={about} alt="About Us" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-red-500">Our Label Music</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                SimpoPlanet is a dynamic music label based in East Africa,
                Rwanda, with a mission to discover, nurture, and promote
                emerging talent in the music industry. Through our
                state-of-the-art Simpo Studio, we provide a creative space where
                new singers and music producers can grow, express themselves,
                and share their voices with the world.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                At SimpoPlanet, we believe in the power of music to inspire and
                connect people. We are committed to supporting the next
                generation of artists by offering them professional guidance,
                high-quality production, and the exposure they need to reach a
                wider audience. Join us on our journey to shape the future of
                music—one artist at a time.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-red-500 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
