import { Instagram, Disc, Youtube, Twitter, Facebook, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { artists } from "../data/artists"; // Assuming you have a data file with artist information

const ArtistSection = () => {
 
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
            Artist <span className="text-red-500">Label</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto">
          {artists.map((artist, index: number) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="group space-y-1 hover:scale-[1.03] transition-transform duration-300"
            >
              <Link to={`/artist/${artist.id}`} className="block">
                <div className="relative mb-6 overflow-hidden cursor-pointer">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white bg-red-500/55 p-3 rounded-full  font-semibold text-lg">
                      <Eye size={24} className="" />
                    </span>
                  </div>
                </div>
              </Link>

              <h3 className="text-2xl font-bold">{artist.name}</h3>
              <p className="text-lg">Age: {artist.age}</p>
              <span className="font-semibold text-red-500">
                Management: {artist.management}
              </span>
              <p className="truncate mb-4">{artist.description}</p>
              <div className="flex justify-center md:justify-start space-x-4">
                {/* Instagram */}
                {artist.socials.instagram &&
                  artist.socials.instagram !== "#" && (
                    <a
                      href={artist.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                      aria-label={`${artist.name} Instagram`}
                    >
                      <Instagram size={20} />
                    </a>
                  )}

                {/* Twitter */}
                {artist.socials.twitter && artist.socials.twitter !== "#" && (
                  <a
                    href={artist.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                    aria-label={`${artist.name} Twitter`}
                  >
                    <Twitter size={20} />
                  </a>
                )}

                {/* TikTok */}
                {artist.socials.tiktok && artist.socials.tiktok !== "#" && (
                  <a
                    href={artist.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                    aria-label={`${artist.name} TikTok`}
                  >
                    <Disc size={20} />
                  </a>
                )}

                {/* YouTube */}
                {artist.socials.youtube && artist.socials.youtube !== "#" && (
                  <a
                    href={artist.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                    aria-label={`${artist.name} YouTube`}
                  >
                    <Youtube size={20} />
                  </a>
                )}
                {artist.socials.facebook &&
                  artist.socials.facebook !== "#" && (
                    <a
                      href={artist.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                      aria-label={`${artist.name} Facebook`}
                    >
                      <Facebook size={20} />
                    </a>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
