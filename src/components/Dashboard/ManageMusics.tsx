import { useEffect, useState } from "react";
import axios from "axios";
import { Edit3, Trash2, Search, Filter, Music, Calendar, Play } from "lucide-react";
import DeleteModal from "../../components/DeleteModal";

export default function ManageMusic() {
  const [musicTracks, setMusicTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMusic, setEditingMusic] = useState<MusicTrack>();
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("last30");
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

  interface MusicTrack {
    id: string;
    createdAt: string;
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    duration: number;
    audioUrl: string;
    coverImageUrl: string;
    youtubeLink: string;
    tags: string[];
    isActive: boolean;
    playCount: number;
    releaseDate: string;
  }

  useEffect(() => {
    fetchMusicTracks();
  }, []);

  const fetchMusicTracks = async () => {
    try {
      const response = await axios.get("https://simpo-planet-studio-bn.onrender.com/api/v1/music");
      setMusicTracks(response.data.data.docs || []);
    } catch (err) {
      console.error('fetching music tracks.',err);
      setError("Failed to load music tracks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`https://simpo-planet-studio-bn.onrender.com/api/v1/music/${deleteId}`);
      setMusicTracks((prev) => prev.filter((track: MusicTrack) => track._id !== deleteId));
      setDeleteId(null);
      fetchMusicTracks();
    } catch (err) {
      console.error('handle to delete.',err);
      setMessage({ type: 'error', text: 'Delete failed.' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (track: MusicTrack) => {
    setEditingMusic(track);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editingMusic) return;
    setIsUpdating(true);

    try {
      await axios.put(`https://simpo-planet-studio-bn.onrender.com/api/v1/music/${editingMusic._id}`, editingMusic);
      setMessage({ type: 'success', text: 'Music track updated successfully.' });
      setIsEditing(false);
      fetchMusicTracks();
    } catch (err) {
      console.error('handle to update.',err);
      setMessage({ type: 'error', text: 'Update failed.' });
    }
    finally {
      setIsUpdating(false);
    }
  };

  const filterByDate = (track: MusicTrack) => {
    const now = new Date();
    const createdAt = new Date(track.createdAt);

    const daysDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

    switch (selectedFilter) {
      case "last1":
        return daysDiff <= 1;
      case "last7":
        return daysDiff <= 7;
      case "last30":
        return daysDiff <= 30;
      case "lastMonth":
        return createdAt.getMonth() === now.getMonth() - 1;
      case "lastYear":
        return createdAt.getFullYear() === now.getFullYear() - 1;
      default:
        return true;
    }
  };

  const filteredMusicTracks = Array.isArray(musicTracks) 
    ? musicTracks
        .filter((t: MusicTrack) => t.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(filterByDate)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Music Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and organize your music tracks</p>
        </div>

        {/* Edit Modal */}
        {isEditing && editingMusic && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Music Track</h2>
              </div>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingMusic.title}
                    onChange={(e) => setEditingMusic({ ...editingMusic, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Artist</label>
                  <input
                    type="text"
                    value={editingMusic.artist}
                    onChange={(e) => setEditingMusic({ ...editingMusic, artist: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Album</label>
                  <input
                    type="text"
                    value={editingMusic.album}
                    onChange={(e) => setEditingMusic({ ...editingMusic, album: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Genre</label>
                  <input
                    type="text"
                    value={editingMusic.genre}
                    onChange={(e) => setEditingMusic({ ...editingMusic, genre: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration (seconds)</label>
                  <input
                    type="number"
                    value={editingMusic.duration}
                    onChange={(e) => setEditingMusic({ ...editingMusic, duration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Audio File</label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle file upload logic here
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current: {editingMusic.audioUrl}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle file upload logic here
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Current: {editingMusic.coverImageUrl}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">YouTube Link</label>
                  <input
                    type="url"
                    value={editingMusic.youtubeLink}
                    onChange={(e) => setEditingMusic({ ...editingMusic, youtubeLink: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={editingMusic.tags?.join(', ') || ''}
                    onChange={(e) => setEditingMusic({ ...editingMusic, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingMusic.isActive}
                      onChange={(e) => setEditingMusic({ ...editingMusic, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {
                    isUpdating ? 'Updating...' : 'Update Track'
                  }
           
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteId && (
          <DeleteModal
            isOpen={!!deleteId}
            onClose={() => setDeleteId(null)}
            onConfirm={handleDelete}
            isDeleting={isDeleting}
            title="Delete Music Track"
            message="Are you sure you want to delete this music track? This action cannot be undone."
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Music className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tracks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Array.isArray(musicTracks) ? musicTracks.length : 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredMusicTracks.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Array.isArray(musicTracks) ? musicTracks.length : 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <p>{
            message.type === 'success' ? (
              <div className="text-green-600 p-4">{message.text}</div>
            ) : message.type === 'error' ? (
              <div className="text-red-600 p-4">{message.text}</div>
            ) : null
          
            }</p>
          {/* Table Header with Search and Filter */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center flex-wrap gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search music tracks..."
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                  {showDropdown && (
                    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
                      <div className="p-2">
                        {[
                          { label: "Last day", value: "last1" },
                          { label: "Last 7 days", value: "last7" },
                          { label: "Last 30 days", value: "last30" },
                          { label: "Last month", value: "lastMonth" },
                          { label: "Last year", value: "lastYear" },
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded cursor-pointer">
                            <input
                              type="radio"
                              name="filter-radio"
                              value={option.value}
                              checked={selectedFilter === option.value}
                              onChange={() => {
                                setSelectedFilter(option.value);
                                setShowDropdown(false);
                              }}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading music tracks...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : filteredMusicTracks.length === 0 ? (
              <div className="text-center py-12">
                <Music className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No music tracks found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Track</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Artist</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Genre</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Duration</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Created</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMusicTracks.map((track: MusicTrack) => (
                    <tr key={track._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            {track.coverImageUrl ? (
                              <img src={track.coverImageUrl} alt={track.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <Music className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900 dark:text-white">{track.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">{track.artist}</td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">{track.genre}</td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">{track.duration}</td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                        {new Date(track.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(track)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="Edit music track"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(track._id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete music track"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}