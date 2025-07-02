import founder from '../assets/founder.jpeg';
import { motion } from 'framer-motion';

const FounderSection = () => {
  return (
    <section className="min-h-screen dark:bg-black dark:text-white relative overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 gap-4 h-full opacity-5">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-gray-200 text-lg tracking-wider uppercase">FOUNDER, HEADMASTER</p>
              <div className="w-24 h-1 bg-white"></div>
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                Simpo
                <br />
                <span className="text-red-500"> Savior</span>
              </h1>
              <div className="w-24 h-1 bg-white"></div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-200 text-lg leading-relaxed italic">
                "Lacinia nulla porttitor faucibus hendrerit at amet tincidunt id dis sit sed enim sit sed tortor odio mi sapien consequat aliquam volutpat diam elefend risus at tempor volutpat massa dis."
              </p>

              <div className="text-right">
                <div className="text-3xl font-bold italic text-gray-300">Simpo Savior</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Founder Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] overflow-hidden rounded-lg">
              <img
                src={founder}
                alt="simpo planet - Founder and Headmaster"
                className="w-full h-full object-cover object-left-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
