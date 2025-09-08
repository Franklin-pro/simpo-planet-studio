import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Youtube, X, ExternalLink, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useRef, useEffect } from 'react';

interface MusicItem {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseDate: string;
  createdAt: string;
  duration: number;
  coverImageUrl: string;
  youtubeLink: string;
  playCount: number;
  audioSrc?: string;
  audioUrl: string;
  userPlays?: number; // User-specific play count
}

interface UserData {
  _id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

const Musics = () => {
  const [musicData, setMusicData] = useState<MusicItem[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<MusicItem | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Enhanced authentication check function
  const checkAndValidateAuth = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        return { isAuthenticated: false, userId: null, user: null };
      }

      const user = JSON.parse(userData);
      
      if (!user._id) {
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return { isAuthenticated: false, userId: null, user: null };
      }

      return { isAuthenticated: true, userId: user._id, user };
    } catch (error) {
      console.error('Error validating auth:', error);
      // Clear corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { isAuthenticated: false, userId: null, user: null };
    }
  };

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        // Validate authentication
        const { isAuthenticated, userId, user } = checkAndValidateAuth();
        
        setIsLoggedIn(isAuthenticated);
        setUser(user);
        
        let url = 'https://simpo-planet-studio-bn.onrender.com/api/v1/music';
        
        // Only include userId if user is properly authenticated
        if (isAuthenticated && userId) {
          url += `?userId=${userId}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMusicData(data.data.docs || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();

    return () => {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatPlayCount = (count: number) => {
    if (count >= 1e6) {
      return `${(count / 1e6).toFixed(1)}M`;
    }
    if (count >= 1e3) {
      return `${(count / 1e3).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

    const diffMonths =
      now.getMonth() -
      date.getMonth() +
      12 * (now.getFullYear() - date.getFullYear());

    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;

    const diffYears = now.getFullYear() - date.getFullYear();
    if (diffYears === 1) return "1 year ago";
    return `${diffYears} years ago`;
  };

  // Enhanced function to increment play count with strict user authentication
  const incrementPlayCount = async (musicId: string) => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      // Strict authentication check - return early if not authenticated
      if (!token || !userData) {
        console.log('User not authenticated, skipping play count update');
        return;
      }

      // Parse and validate user data
      let userId;
      try {
        const user = JSON.parse(userData);
        userId = user._id;
        
        if (!userId) {
          console.log('Invalid user data, skipping play count update');
          return;
        }
      } catch (parseError) {
        console.error('Error parsing user data:', parseError);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      // Additional check against current state
      if (!isLoggedIn || !user?._id) {
        console.log('User state indicates not logged in, skipping play count update');
        return;
      }

      const response = await fetch(`https://simpo-planet-studio-bn.onrender.com/api/v1/music/${musicId}/play`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        // Include userId in request body for backend validation
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid - clear auth data and update state
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUser(null);
          console.log('Authentication expired, user logged out');
          return;
        }
        if (response.status === 403) {
          console.log('User not authorized to update play count');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Update the local state with the new play count
        setMusicData(prevData => 
          prevData.map(music => 
            music._id === musicId 
              ? { 
                  ...music, 
                  playCount: data.playCount || music.playCount,
                  userPlays: data.userPlays || (music.userPlays || 0) + 1
                }
              : music
          )
        );
        
        // Update current playing track if it matches
        if (currentPlayingTrack && currentPlayingTrack._id === musicId) {
          setCurrentPlayingTrack(prev => 
            prev ? { 
              ...prev, 
              playCount: data.playCount || prev.playCount,
              userPlays: data.userPlays || (prev.userPlays || 0) + 1
            } : null
          );
        }
        
        console.log('Play count updated successfully:', {
          trackId: musicId,
          totalPlays: data.playCount,
          userPlays: data.userPlays,
          userId: userId
        });
      }
    } catch (error) {
      console.error('Error updating play count:', error);
      // Don't throw error to avoid breaking playback experience
      // But you might want to show a non-intrusive notification to user
    }
  };

  const startPlaybackTimer = () => {
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
    }
    playbackTimerRef.current = setTimeout(() => {
      setShowContinueModal(true);
      audioRef.current?.pause();
    }, 30000); // 30 seconds
  };

  const handlePlay = (id: string) => {
    const track = musicData.find(m => m._id === id);
    if (!track) return;

    if (currentTrack === id) {
      // Toggle play/pause for current track
      if (isPlaying) {
        audioRef.current?.pause();
        if (playbackTimerRef.current) {
          clearTimeout(playbackTimerRef.current);
        }
      } else {
        audioRef.current?.play();
        startPlaybackTimer();
        // DON'T increment play count on resume - only on initial play
      }
      setIsPlaying(!isPlaying);
    } else {
      // Stop previous track if any
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }

      // Create new audio element
      const audio = new Audio(track.audioUrl);
      audioRef.current = audio;
      
      // Track if play count has been incremented for this session
      let playCountIncremented = false;
      
      audio.onplay = () => {
        setIsPlaying(true);
        setCurrentTrack(id);
        setCurrentPlayingTrack(track);
        startPlaybackTimer();
        
        // Only increment play count ONCE per new track session
        if (!playCountIncremented) {
          const token = localStorage.getItem('token');
          const userData = localStorage.getItem('user');
          
          let isAuthenticated = false;
          let parsedUser = null;
          
          if (token && userData) {
            try {
              parsedUser = JSON.parse(userData);
              isAuthenticated = Boolean(parsedUser?._id);
            } catch (error) {
              console.error('Error parsing user data:', error);
            }
          }
          
          console.log('Auth check for NEW track play:', { 
            hasToken: !!token, 
            hasUserData: !!userData, 
            parsedUser, 
            isAuthenticated,
            trackId: id
          });
          
          // Only increment play count if user is properly authenticated
          if (isAuthenticated && parsedUser?._id) {
            incrementPlayCount(id);
            playCountIncremented = true; // Mark as incremented
          } else {
            console.log('Play count not tracked - user not authenticated');
          }
        }
      };
      
      audio.onpause = () => {
        setIsPlaying(false);
        if (playbackTimerRef.current) {
          clearTimeout(playbackTimerRef.current);
        }
      };
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTrack(null);
        setProgress(0);
        setCurrentPlayingTrack(null);
        if (playbackTimerRef.current) {
          clearTimeout(playbackTimerRef.current);
        }
        // DON'T increment play count on end - already counted on initial play
      };
      
      audio.ontimeupdate = () => {
        setProgress(audio.currentTime);
        setDuration(audio.duration || 0);
      };

      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
        setError("Playback failed. Please try again.");
      });
    }
  };

  const closeModal = () => {
    setShowContinueModal(false);
  };

  const continueOnPlatform = (platformUrl: string) => {
    window.open(platformUrl, '_blank');
    closeModal();
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-64 bg-gray-800 rounded mb-4"></div>
              <div className="h-6 w-80 bg-gray-800 rounded mb-12"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-xl p-4">
                    <div className="h-64 w-full bg-gray-700 rounded-xl mb-4"></div>
                    <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <div className="bg-red-900/20 p-8 rounded-xl max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Error Loading Music</h2>
              <p className="text-red-300 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (musicData.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <div className="bg-gray-800/20 p-8 rounded-xl max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">No Music Available</h2>
              <p className="text-gray-300 mb-6">We couldn't find any music tracks in our database.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16'>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Latest <span className='text-red-500'>Releases</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Discover the hottest tracks from your favorite artists
            </motion.p>
            
            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 bg-gray-800/50 p-4 rounded-lg max-w-md mx-auto"
              >
                <p className="text-gray-300 mb-2 flex items-center justify-center">
                  <User size={16} className="mr-2" />
                  Sign in to track your listening history
                </p>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
              </motion.div>
            )}

            {isLoggedIn && user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 bg-green-800/20 p-4 rounded-lg max-w-md mx-auto border border-green-600/30"
              >
                <p className="text-green-300 flex items-center justify-center">
                  <User size={16} className="mr-2" />
                  Welcome back, {user.name}! Your plays are being tracked.
                </p>
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {musicData.map((music) => (
              <motion.div
                key={music._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/30"
              >
                <div className="relative group">
                  <img
                    src={music.coverImageUrl}
                    alt={music.title}
                    className="w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Music+Cover';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {music.artist} • {music.genre}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePlay(music._id)}
                    className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      currentTrack === music._id && isPlaying
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gray-900/90 hover:bg-gray-800'
                    }`}
                    aria-label={currentTrack === music._id && isPlaying ? 'Pause' : 'Play'}
                  >
                    {currentTrack === music._id && isPlaying ? (
                      <Pause size={20} className="text-white" />
                    ) : (
                      <Play size={20} className="text-white pl-1" />
                    )}
                  </button>

                  {/* Authentication status indicator */}
                  {!isLoggedIn && (
                    <div className="absolute top-4 left-4 bg-gray-900/90 text-gray-300 px-2 py-1 rounded-full text-xs">
                      Guest Mode
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold truncate">{music.title}</h3>
                      <p className="text-gray-400 text-sm truncate">{music.artist}</p>
                      <p className="text-gray-500 text-xs mt-1 truncate">{music.album} • {formatDate(music.createdAt)}</p>
                    </div>
                  </div>
        
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Play size={16}/>
                      <span className="text-sm text-gray-400">{formatPlayCount(music.playCount)}</span>
                      <span className="text-xs text-gray-500">plays</span>
                    </div>
                    
                    {isLoggedIn && music.userPlays !== undefined && music.userPlays > 0 && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <User size={14} />
                        <span className="text-xs">You played {music.userPlays} time{music.userPlays !== 1 ? 's' : ''}</span>
                      </div>
                    )}

                    {!isLoggedIn && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <User size={14} />
                        <span className="text-xs">Sign in to track</span>
                      </div>
                    )}
                  </div>

                  {currentTrack === music._id && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-red-500 h-1.5 rounded-full"
                          style={{ width: duration > 0 ? `${(progress / duration) * 100}%` : '0%' }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue Listening Modal */}
        <AnimatePresence>
          {showContinueModal && currentPlayingTrack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>

                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={currentPlayingTrack.coverImageUrl}
                      alt={currentPlayingTrack.title}
                      className="w-20 h-20 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Music+Cover';
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">{currentPlayingTrack.title}</h3>
                      <p className="text-gray-400">{currentPlayingTrack.artist}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">
                    Enjoying this track? Continue listening on your favorite platform:
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => continueOnPlatform(currentPlayingTrack.youtubeLink)}
                      className="w-full flex items-center justify-between bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Youtube size={20} />
                        <span>Continue on YouTube</span>
                      </div>
                      <ExternalLink size={16} />
                    </button>

                    <button
                      onClick={() => continueOnPlatform(`https://audiomack.com/search?q=${encodeURIComponent(`${currentPlayingTrack.artist} ${currentPlayingTrack.title}`)}`)}
                      className="w-full flex items-center justify-between bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src="https://audiomack.com/favicon.ico"
                          alt="Audiomack" 
                          className="w-5 h-5"
                        />
                        <span>Continue on Audiomack</span>
                      </div>
                      <ExternalLink size={16} />
                    </button>

                    <button
                      onClick={closeModal}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors mt-4"
                    >
                      Keep listening here
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default Musics;