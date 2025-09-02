import { useEffect, useState } from "react";
import axios from "axios";
import { PenBoxIcon, Trash } from "lucide-react";
import DeleteModal from "../../components/DeleteModal";


export default function ManartistMusics() {
  const [musics, setmusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingmusic, setEditingmusic] = useState<music>();
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("last30");
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  interface music {
    id: string;
    createdAt: string;
    _id: string;
    title: string;
    coverImageUrl: string;
    artist: string;
    album: string;
    genre: string;
    imartist: string;
  }

  useEffect(() => {
    fetchmusics();
  }, []);

  const fetchmusics = async () => {
    try {
      const response = await axios.get("https://simpo-planet-studio-bn.onrender.com/api/v1/music");
      setmusics(response.data.data.docs || []);
    } catch (err) {
      setError("Failed to load musics.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`https://simpo-planet-studio-bn.onrender.com/api/v1/music/${deleteId}`);
      setmusics((prev) => prev.filter((music: music) => music._id !== deleteId));
      setDeleteId(null);
      fetchmusics();
    } catch (err) {
      alert("Delete failed.");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (music: music) => {
    setEditingmusic(music);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editingmusic) return;

    try {
      await axios.put(`https://simpo-planet-studio-bn.onrender.com/api/v1/music/${editingmusic._id}`, editingmusic);
      alert("music updated successfully.");
      setIsEditing(false);
      fetchmusics();
    } catch (err) {
      alert("Update failed.");
      console.error(err);
    }
  };

  const filterByDate = (music: music) => {
    const now = new Date();
    const createdAt = new Date(music.createdAt);

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

  const filteredmusics = musics
    .filter((a: music) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(filterByDate);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl dark:text-gray-100 text-gray-900 font-bold mb-6">🎨 Manartist Musics</h2>

      {isEditing && editingmusic && (
        <div className="fixed inset-0 bg-black/15 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl dark:text-gray-100 text-gray-900 font-bold mb-4">Edit music</h2>
            <div className="space-y-4">
              
              <input
                type="text"
                value={editingmusic.title}
                onChange={(e) => setEditingmusic({ ...editingmusic, title: e.target.value })}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={editingmusic.artist}
                onChange={(e) => setEditingmusic({ ...editingmusic, artist: e.target.value })}
                placeholder="artist"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={editingmusic.genre}
                onChange={(e) => setEditingmusic({ ...editingmusic, genre: e.target.value })}
                placeholder="genre"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
                  <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="mb-1 text-sm text-gray-600">albumgraphy</label>
          <textarea
            name="album"
          value={editingmusic.album}
                onChange={(e) => setEditingmusic({ ...editingmusic, album: e.target.value })}
            rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-x-auto bg-gray-200 dark:bg-gray-500 dark:border-gray-500 dark:text-gray-100 p-2 shadow-md sm:rounded-lg">
        {/* FILTER & SEARCH BAR */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between pb-4 space-y-4 sm:space-y-0">
          {/* Filter dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
            >
              Filter: {selectedFilter}
              <svg className="w-2.5 h-2.5 ml-2" fill="none" viewBox="0 0 10 6">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                <ul className="p-2 space-y-1 text-sm text-gray-700">
                  {[
                    { label: "Last day", value: "last1" },
                    { label: "Last 7 days", value: "last7" },
                    { label: "Last 30 days", value: "last30" },
                    { label: "Last month", value: "lastMonth" },
                    { label: "Last year", value: "lastYear" },
                  ].map((option) => (
                    <li key={option.value}>
                      <label className="flex items-center gap-2 cursor-pointer">
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
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
              placeholder="Search for musics"
            />
            <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89
                  3.476l4.817 4.817a1 1 0 01-1.414
                  1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading musics...</p>
        ) : error ? (
          <p className="text-red-600 text-center py-4">{error}</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs uppercase text-gray-700 dark:bg-gray-500 dark:border-gray-500 dark:text-gray-100 bg-gray-50">
  <tr>
    <th className="px-6 py-3">Cover</th>
    <th className="px-6 py-3">Title</th>
    <th className="px-6 py-3">Artist</th>
    <th className="px-6 py-3">Genre</th>
    <th className="px-6 py-3">Album</th>
    <th className="px-6 py-3">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredmusics.length === 0 ? (
    <tr>
      <td colSpan={6} className="text-center py-4">
        No musics found.
      </td>
    </tr>
  ) : (
    filteredmusics.map((music: music) => (
      <tr
        key={music._id}
        className="bg-white dark:bg-gray-700 dark:border-gray-500 dark:text-gray-100 border-b-2 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <td className="px-6 py-4">
          <img
            src={music.coverImageUrl}
            alt={music.title}
            className="h-12 w-12 object-cover rounded"
          />
        </td>
        <td className="px-6 py-4 font-bold">{music.title}</td>
        <td className="px-6 py-4 font-semibold">{music.artist}</td>
        <td className="px-6 py-4">{music.genre}</td>
        <td className="px-6 py-4">{music.album}</td>
        <td className="px-6 py-4 space-x-2">
          <button
            onClick={() => handleEdit(music)}
            className="text-yellow-600 cursor-pointer"
          >
            <PenBoxIcon />
          </button>
          <button
            onClick={() => setDeleteId(music._id)}
            className="text-red-600 cursor-pointer"
          >
            <Trash />
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        )}
      </div>
      
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Music"
        message="Are you sure you want to delete this music? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  );
}
