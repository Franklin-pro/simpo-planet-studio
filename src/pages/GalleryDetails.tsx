import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  createdAt: string;
  likeCount: number;
  updatedAt: string;
  isLikedByUser?: boolean;
  likedBy?: string[];
}

const GalleryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        setLoading(true);
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
        
        const url = userId 
          ? `https://simpo-planet-studio-bn.onrender.com/api/v1/gallery/${id}?userId=${userId}`
          : `https://simpo-planet-studio-bn.onrender.com/api/v1/gallery/${id}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        const galleryItem = data.success && data.data ? data.data : data;
        
        setItem(galleryItem);
        
        // Check if user has liked this gallery item
        let userHasLiked = galleryItem.isLikedByUser || false;
        if (!userHasLiked && galleryItem.likedBy && userId) {
          userHasLiked = galleryItem.likedBy.includes(userId);
        }
        
        setIsLiked(userHasLiked);
      } catch (error) {
        console.error('Error fetching gallery item:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGalleryItem();
    }
  }, [id]);

  const handleLike = async () => {
    if (!item || isLiking) return;
    
    // Prevent unliking when count is 0 and user hasn't liked
    if (!isLiked && item.likeCount === 0) return;
    
    setIsLiking(true);
    const newLikedState = !isLiked;
    
    // Optimistic update
    setIsLiked(newLikedState);
    setItem(prev => prev ? { 
      ...prev, 
      likeCount: Math.max(0, prev.likeCount + (newLikedState ? 1 : -1)),
      isLikedByUser: newLikedState
    } : null);
    
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
      
      const response = await fetch(`https://simpo-planet-studio-bn.onrender.com/api/v1/gallery/${item._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ userId })
      });
      
      if (response.ok) {
        const result = await response.json();
        // Update with server response
        setItem(prev => prev ? { 
          ...prev, 
          likeCount: result.likeCount,
          isLikedByUser: result.isLiked
        } : null);
        setIsLiked(result.isLiked);
      } else if (response.status === 400) {
        // User already liked - keep liked state
        const errorData = await response.json();
        if (errorData.message?.includes('already liked')) {
          setIsLiked(true);
          setItem(prev => prev ? { 
            ...prev, 
            isLikedByUser: true
          } : null);
        } else {
          // Other 400 errors - revert
          setIsLiked(!newLikedState);
          setItem(prev => prev ? { 
            ...prev, 
            likeCount: Math.max(0, prev.likeCount + (newLikedState ? -1 : 1)),
            isLikedByUser: !newLikedState
          } : null);
        }
      } else {
        // Other errors - revert
        setIsLiked(!newLikedState);
        setItem(prev => prev ? { 
          ...prev, 
          likeCount: Math.max(0, prev.likeCount + (newLikedState ? -1 : 1)),
          isLikedByUser: !newLikedState
        } : null);
      }
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert on error
      setIsLiked(!newLikedState);
      setItem(prev => prev ? { 
        ...prev, 
        likeCount: Math.max(0, prev.likeCount + (newLikedState ? -1 : 1)),
        isLikedByUser: !newLikedState
      } : null);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-gray-800 rounded mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-800 rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-gray-800 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
                  <div className="h-20 w-full bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !item) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Gallery Item Not Found</h2>
            <p className="text-gray-400 mb-6">{error || 'The requested gallery item could not be found.'}</p>
            <button
              onClick={() => navigate('/gallery')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Back to Gallery
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
        <div className="container mx-auto px-4 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Gallery
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
                <div className="flex items-center gap-4 text-gray-400 mb-6">
                  <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </div>

              {item.description && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              )}

              <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isLiked
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{item.likeCount} Likes</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 size={20} />
                  Share
                </button>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Details</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span>{formatDate(item.updatedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{item.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryDetails;