import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Eye, ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  image?: string;
  category: string;
  createdAt: string;
  likes?: number;
  likeCount?: number;
}

interface ArtGalleryProps {
  isHomePage?: boolean;
}

export default function ArtGallery({ isHomePage = false }: ArtGalleryProps) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/gallery');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        let galleryItems = [];
        if (Array.isArray(data)) {
          galleryItems = data;
        } else if (data.success && data.data?.docs) {
          galleryItems = data.data.docs;
        } else if (data.data && Array.isArray(data.data)) {
          galleryItems = data.data;
        }
        
        const mappedImages = galleryItems.map((item: GalleryItem) => ({
          ...item,
          imageUrl: item.image || item.imageUrl,
          likes: item.likeCount || 0,
          category: item.category || 'General'
        }));
        
        setImages(mappedImages);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const categories = ["All", ...new Set(images.map((img) => img.category))];
  let filteredImages = filter === "All" ? images : images.filter((img) => img.category === filter);
  
  // Limit to 4 items on home page
  if (isHomePage) {
    filteredImages = filteredImages.slice(0, 4);
  }

  const handleImageClick = (item: GalleryItem) => {
    navigate(`/gallery/${item._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen dark:bg-black bg-white flex items-center justify-center">
        <div className="text-center dark:text-white text-black">
          <h2 className="text-2xl font-bold mb-4">Failed to load gallery</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="gallery" className="min-h-screen dark:bg-black bg-white text-white">
      {/* Hero Section */}
      <div className="relative py-4 px-4">
        <div className="absolute inset-0 bg-gradient-to-b dark:from-red-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            Visual <span className="text-red-500">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl dark:text-gray-300 text-gray-900 max-w-2xl mx-auto mb-12"
          >
            Immerse yourself in a world of stunning photography and artistic expression
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
                    : "dark:bg-white/10 bg-gray-500/20 dark:text-gray-300 text-black hover:bg-red-500/10  backdrop-blur-sm border cursor-pointer dark:border-white/20 border-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No images found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {filteredImages.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => handleImageClick(item)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{item.likes || 0}</span>
                          </div>
                          <span className="px-2 py-1 bg-red-600 rounded-full text-xs">
                            {item.category}
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
              </motion.div>
            ))}
          </div>
        )}
        
        {/* View All Button - Only show on home page */}
        {isHomePage && filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-medium transition-colors"
            >
              <Eye className="h-5 w-5" />
              View All Gallery
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}