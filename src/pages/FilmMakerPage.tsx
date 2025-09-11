import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, ZoomIn, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Filmmaker {
  _id: string;
  name: string;
  bio: string;
  specialization: string;
  experience: number;
  image: string;
}

const FilmMakerPage = () => {
  const [filmmakers, setFilmmakers] = useState<Filmmaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const { t, i18n } = useTranslation();

  // Update filter when language changes
  useEffect(() => {
    setFilter(t('filmmakers.all'));
  }, [i18n.language, t]);

  useEffect(() => {
    fetchFilmmakers();
  }, []);

  const fetchFilmmakers = async () => {
    try {
      const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/filmmaker');
      const data = await response.json();
      setFilmmakers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [t('filmmakers.all'), ...new Set(filmmakers.map((f) => f.specialization))];
  const filteredFilmmakers = filter === t('filmmakers.all') ? filmmakers : filmmakers.filter((f) => f.specialization === filter);

  if (loading) {
    return (
      <>
        <Header/>
        <section className=" bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="break-inside-avoid animate-pulse">
                  <div className="bg-gray-800 rounded-2xl h-80 mb-8"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer/>
      </>
    );
  }

  return (
    <>
      <Header/>
      <section className=" dark:bg-black dark:text-white">
        {/* Hero Section */}
        <div className="relative py-8 px-4">
          <div className="absolute inset-0 bg-gradient-to-b dark:from-red-900/20 dark:to-transparent"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              {t('filmmakers.title')} <span className="text-red-500">{t('filmmakers.titleHighlight')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl dark:text-gray-300 max-w-2xl mx-auto mb-12"
            >
              {t('filmmakers.subtitle')}
            </motion.p>

            {/* Category Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                      :"dark:bg-white/10 bg-gray-500/20 dark:text-gray-300  hover:bg-red-500/10  backdrop-blur-sm border cursor-pointer dark:border-white/20 border-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Filmmakers Masonry Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          {filteredFilmmakers.length === 0 ? (
            <div className="text-center py-20">
              <Film className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">{t('filmmakers.noFilmmakersTitle')}</h3>
              <p className="text-gray-500">{t('filmmakers.noFilmmakersText')}</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
              {filteredFilmmakers.map((filmmaker, index) => (
                <motion.div
                  key={filmmaker._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="break-inside-avoid group cursor-pointer"
                >
                  <Link to={`/filmmakers/${filmmaker._id}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                      <img
                        src={filmmaker.image || "https://via.placeholder.com/400x500?text=Filmmaker"}
                        alt={filmmaker.name}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-2">{filmmaker.name}</h3>
                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{filmmaker.bio}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{filmmaker.experience} {t('filmmakers.years')}</span>
                              </div>
                              <span className="px-2 py-1 bg-red-600 rounded-full text-xs">
                                {filmmaker.specialization}
                              </span>
                            </div>
                            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                              <ZoomIn className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-colors duration-500"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default FilmMakerPage;