import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Calendar, Image as ImageIcon } from 'lucide-react';
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
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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

  const handleShare = async () => {
    if (!item) return;
    
    try {
      const galleryUrl = `${window.location.origin}/gallery/${item._id}`;
      await navigator.clipboard.writeText(galleryUrl);
      setMessage('Gallery link copied to clipboard!');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error sharing gallery:', error);
      setMessage('Failed to copy link');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLike = async () => {
    if (!item || isLiking) return;
    
    setIsLiking(true);
    const newLikedState = !isLiked;
    
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
        setItem(prev => prev ? { 
          ...prev, 
          likeCount: result.likeCount,
          isLikedByUser: result.isLiked
        } : null);
        setIsLiked(result.isLiked);
      } else {
        setIsLiked(!newLikedState);
        setItem(prev => prev ? { 
          ...prev, 
          likeCount: Math.max(0, prev.likeCount + (newLikedState ? -1 : 1)),
          isLikedByUser: !newLikedState
        } : null);
      }
    } catch (error) {
      console.error('Error updating like:', error);
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading gallery item...</p>
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Gallery Item Not Found'}
            </h1>
            <Link to="/gallery" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Gallery
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mt-20 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link to="/gallery" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>

          {/* Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 rounded-lg">
              {message}
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="md:flex">
              {/* Left Column - Image */}
              <div className="md:w-2/3">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-96 md:h-[600px] object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/50 text-white rounded-full text-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="md:w-1/3 p-8">
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h1>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Heart className={`h-5 w-5 ${isLiked ? 'text-red-600 fill-current' : 'text-red-600 dark:text-red-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Likes</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.likeCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Created</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <ImageIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Category</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.category}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleLike}
                    disabled={isLiking}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isLiked
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryDetails;