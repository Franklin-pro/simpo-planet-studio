
import { Facebook, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import mclay from '../assets/mclay.jpeg';
import cynthia from '../assets/cynthia.jpeg';
import skilibombe from '../assets/skilbombe.jpeg';

const ArtistSection = () => {
  const artists = [
    {
      id: 1,
      name: "Umurungi Cynthia",
      age: "22 years old",
      management: "Simpo Planet Label",
      description: "A passionate martial artist with over 10 years of experience in various disciplines. Known for her dedication and innovative teaching methods.",
      image: cynthia,
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#"
      }
    },
    {
      id: 2,
      name: "MCLAY",
      age: "23 years old",
      management: "Simpo Planet Label",
        description: "An accomplished martial artist with a focus on self-defense techniques. She brings a wealth of knowledge and experience to her students.",
      image: mclay,
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#"
      }
    },
    {
      id: 3,
      name: "Kristine Cox",
      age: "24 years old",
      management: "Simpo Planet Label",
        description: "An experienced martial artist specializing in Taekwondo and Karate. She has a unique approach to training that emphasizes both physical and mental strength.",
        image: skilibombe,
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#"
      }
    },
    {
      id: 5,
      name: "Alec Whitten",
      age: "21 years old",
      management: "Simpo Planet Label",
        description: "An experienced martial artist with a focus on traditional techniques and a strong commitment to student development.",
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=400&fit=crop&crop=face",
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#"
      }
    },
    {
      id: 6,
      name: "Aaron Nunez",
      age: "20 years old",
      management: "Simpo Planet Label",
      description: "A dynamic and energetic instructor who brings a fresh perspective to martial arts training",
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=400&fit=crop&crop=face",
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#"
      }
    }
  ];

 const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <section id="artists" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Artist <span className='text-red-500'>Label</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto">
          {artists.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true, amount: 0.2 }}
              className="group space-y-1 hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-80 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <h3 className="text-2xl font-bold">{teacher.name}</h3>
              <p className="text-lg">Age: {teacher.age}</p>
              <span className='font-semibold text-red-500'>Management: {teacher.management}</span>
              <p className='truncate mb-4'>{teacher.description}</p>

              <div className="flex justify-center space-x-4">
                <a href={teacher.socials.facebook} className="social-btn" aria-label={`${teacher.name} Facebook`}>
                  <Facebook size={20} />
                </a>
                <a href={teacher.socials.twitter} className="social-btn" aria-label={`${teacher.name} Twitter`}>
                  <Twitter size={20} />
                </a>
                <a href={teacher.socials.youtube} className="social-btn" aria-label={`${teacher.name} YouTube`}>
                  <Youtube size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
