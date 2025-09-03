import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ZoomIn, Heart, Share2, Play, PlayCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  image?: string;
  category: string;
  type: 'image' | 'video';
  createdAt: string;
  likes?: number;
  likeCount?: number;
  videoUrl?: string;
}

// interface ApiResponse {
//   success: boolean;
//   data: {
//     docs: GalleryItem[];
//     totalDocs: number;
//     limit: number;
//     page: number;
//     totalPages: number;
//   };
//   message?: string;
// }

export default function ArtGallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState("All");
  const [likedImages, setLikedImages] = useState(new Set());
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/gallery', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Handle direct array response or nested object response
        let galleryItems = [];
        if (Array.isArray(data)) {
          galleryItems = data;
        } else if (data.success && data.data?.docs) {
          galleryItems = data.data.docs;
        } else if (data.data && Array.isArray(data.data)) {
          galleryItems = data.data;
        } else {
          throw new Error('Invalid gallery data format');
        }
        
        // Map API data to component format
        const mappedImages = galleryItems.map((item:any) => ({
          ...item,
          imageUrl: item.image,
          likes: item.likeCount || 0,
          category: item.category || 'General',
          type: 'image' as const
        }));
        
        setImages(mappedImages);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
          setError('Network error: Unable to connect to the server. Please check your internet connection.');
        } else {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const categories = ["All", ...new Set(images.map((img) => img.category))];

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  const toggleLike = async (index: number) => {
    const image = images[index];
    if (!image) return;
    
    const newLiked = new Set(likedImages);
    const isLiked = newLiked.has(index);
    
    if (isLiked) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedImages(newLiked);
    
    // Update like count locally first
    const newLikeCount = (image.likes || 0) + (isLiked ? -1 : 1);
    setImages(prevImages => 
      prevImages.map((img, i) => 
        i === index 
          ? { ...img, likes: newLikeCount }
          : img
      )
    );
    
    // Update selected image if it's the same one
    if (selectedImage && image._id === selectedImage._id) {
      setSelectedImage(prev => 
        prev ? { ...prev, likes: newLikeCount } : null
      );
    }
    
    // Send API request to update like count
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      let userId = null;
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          userId = user._id;
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      await fetch(`https://simpo-planet-studio-bn.onrender.com/api/v1/gallery/${image._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ userId })
      });
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const getGridClass = (index: number) => {
    const patterns = [
      "col-span-2 row-span-2",
      "col-span-1 row-span-1",
      "col-span-2 row-span-2",
      "col-span-1 row-span-2",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-2",
    ];
    return patterns[index % patterns.length];
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`
      : url;
  };

  return (
    <div id="gallery" className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/15"></div>
        <div className="relative px-6 py-20 text-center">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Visual <span className="text-red-500">Stories</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover a curated collection of breathtaking moments captured
            through the lens of creativity
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, i) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  filter === category
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="px-6 pb-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-[200px]">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-2xl h-48"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="px-6 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-900/20 p-8 rounded-xl border border-red-500/30">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Gallery</h2>
              <p className="text-red-300 mb-6">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  window.location.reload();
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && images.length === 0 && (
        <div className="px-6 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-800/20 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-400 mb-4">No Gallery Items</h2>
              <p className="text-gray-300 mb-6">We couldn't find any gallery items to display.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && !error && images.length > 0 && (
        <div className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-[200px]">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer ${getGridClass(
                    index
                  )}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-2xl h-full">
                    {image.type === "image" ? (
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover object-left-top transition-all duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-black flex items-center justify-center text-white text-sm relative">
                        {image.imageUrl && (
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-full object-cover object-left-top transition-all duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Video+Thumbnail';
                            }}
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle size={48} className="text-white/80" />
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          await toggleLike(index);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                          likedImages.has(index)
                            ? "bg-red-500/80 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={likedImages.has(index) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-white">
                        <h3 className="font-bold text-lg mb-1 truncate">
                          {image.title}
                        </h3>
                        <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {image.category}
                        </span>
                        <div className="flex p-2 items-center justify-between mt-2">
                          <button 
                            onClick={async (e) => {
                              e.stopPropagation();
                              const galleryUrl = `${window.location.origin}/gallery/${image._id}`;
                              await navigator.clipboard.writeText(galleryUrl);
                              setMessage('Gallery link copied!');
                              setTimeout(() => setMessage(null), 3000);
                            }}
                            className="text-lg hover:text-white transition-colors"
                          >
                            <Share2 size={16} />
                          </button>
                          <button 
                            onClick={async (e) => {
                              e.stopPropagation();
                              await toggleLike(index);
                            }}
                            className="text-lg flex items-center gap-2 hover:text-white transition-colors"
                          >
                            <Heart size={16} />
                            <span>{image.likes || 0}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Icons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/gallery/${image._id}`);
                          }}
                          className="bg-white/20 backdrop-blur-md rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-white/30"
                        >
                          <Eye size={20} className="text-white" />
                        </button>
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          {image.type === "image" ? (
                            <ZoomIn size={20} className="text-white" />
                          ) : (
                            <Play size={20} className="text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X size={32} />
            </button>

            <div className="relative">
              {selectedImage.type === "image" ? (
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                  }}
                />
              ) : selectedImage.videoUrl?.includes("youtube.com") ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedImage.videoUrl)}
                  title={selectedImage.title}
                  className="w-[80vw] h-[45vw] max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : selectedImage.videoUrl ? (
                <video
                  src={selectedImage.videoUrl}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  controls
                  autoPlay
                />
              ) : (
                <div className="w-[80vw] h-[45vw] max-w-full max-h-[80vh] bg-gray-800 rounded-lg shadow-2xl flex items-center justify-center">
                  <p className="text-white">Video not available</p>
                </div>
              )}

              {/* Image Details */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedImage.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {selectedImage.category}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={async () => {
                          const imageIndex = images.findIndex(img => img._id === selectedImage._id);
                          await toggleLike(imageIndex);
                        }}
                        className={`p-2 rounded-full flex items-center gap-1 backdrop-blur-md transition-all duration-300 ${
                          likedImages.has(images.findIndex(img => img._id === selectedImage._id))
                            ? "bg-red-500/80 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Heart
                          size={20}
                          fill={
                            likedImages.has(images.findIndex(img => img._id === selectedImage._id))
                              ? "currentColor"
                              : "none"
                          }
                        />
                        <span>{selectedImage.likes || 0}</span>
                      </button>
                      <button 
                        onClick={async () => {
                          const galleryUrl = `${window.location.origin}/gallery/${selectedImage._id}`;
                          await navigator.clipboard.writeText(galleryUrl);
                          setMessage('Gallery link copied!');
                          setTimeout(() => setMessage(null), 3000);
                        }}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Message */}
      {message && (
        <div className="fixed top-24 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}
    </div>
  );
}