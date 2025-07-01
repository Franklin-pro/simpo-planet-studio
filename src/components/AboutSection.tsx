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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, when: "beforeChildren" }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }
  };

  const statItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.5, type: "spring", stiffness: 100 }
    })
  };

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div className="relative" variants={imageVariants}>
              <div className="w-full rounded-lg overflow-hidden">
                <img src={about} alt="About Us" />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
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
                    custom={index}
                    variants={statItemVariants}
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
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
