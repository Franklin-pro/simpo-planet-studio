import { useState } from "react";
import { X, ZoomIn, Heart, Share2, Play, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import mclay from '../assets/mclay.jpeg';
import cynthia from '../assets/cynthia.jpeg';
import skilibombe from '../assets/skilbombe.jpeg';
import founder from '../assets/founder.jpeg';

const images = [
  {
    src: founder,
    title: "Simpo Planet",
    category: "founder",
    type: "image",
  },
  {
    src: cynthia,
    title: "Umurungi Cynthia",
    category: "artist",
    type: "image",
  },
  {
    src: skilibombe,
    title: "Skilibombe",
    category: "Studio-session",
    type: "image",
  },
  {
    src: "https://www.youtube.com/watch?v=ZVqHQfavP-4&list=RDZVqHQfavP-4&index=1",
    title: "skilbombe new Video",
    category: "Videos",
    type: "video",
  },
  {
    src: mclay,
    title: "MCLAY",
    category: "artist",
    type: "image",
  },
];

export default function ArtGallery() {
  const [selectedImage, setSelectedImage] = useState(
    null as {
      src: string;
      title: string;
      category: string;
      type: string;
      index: number;
    } | null
  );
  const [filter, setFilter] = useState("All");
  const [likedImages, setLikedImages] = useState(new Set());

  const categories = ["All", ...new Set(images.map((img) => img.category))];

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  const toggleLike = (index: number) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedImages(newLiked);
  };

  const gridVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
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
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
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

      {/* Gallery Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-[200px]">
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={gridVariants}
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer ${getGridClass(
                  index
                )}`}
                onClick={() => setSelectedImage({ ...image, index })}
              >
                <div className="relative overflow-hidden rounded-2xl h-full">
                  {image.type === "image" ? (
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover object-left-top transition-all duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center text-white text-sm">
                      <PlayCircle size={48} />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(index);
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
                        <button className="text-lg hover:text-white transition-colors">
                          <Share2 size={16} />
                        </button>
                        <button className="text-lg flex items-center gap-2 hover:text-white transition-colors">
                          <Heart size={16} />
                          <span>100</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      {image.type === "image" ? (
                        <ZoomIn size={24} className="text-white" />
                      ) : (
                        <Play size={24} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              ) : selectedImage.src.includes("youtube.com") ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedImage.src)}
                  title={selectedImage.title}
                  className="w-[80vw] h-[45vw] max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={selectedImage.src}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  controls
                  autoPlay
                />
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
                        onClick={() => toggleLike(selectedImage.index)}
                        className={`p-2 rounded-full flex items-center gap-1 backdrop-blur-md transition-all duration-300 ${
                          likedImages.has(selectedImage.index)
                            ? "bg-red-500/80 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Heart
                          size={20}
                          fill={
                            likedImages.has(selectedImage.index)
                              ? "currentColor"
                              : "none"
                          }
                        />
                        <span>100</span>
                      </button>
                      <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300">
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
    </div>
  );
}
