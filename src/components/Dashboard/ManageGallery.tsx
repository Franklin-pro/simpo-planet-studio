import { useEffect, useState } from "react";
import axios from "axios";
import { PenBoxIcon, Trash } from "lucide-react";


export default function ManageGallery() {
  const [gallerys, setgallerys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editinggallery, setEditinggallery] = useState<gallery>();
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("last30");
  const [showDropdown, setShowDropdown] = useState(false);

  interface gallery {
    id: string;
    createdAt: string;
    _id: string;
    title: string;
    imageUrl: string;
    age: string;
    bio: string;
    management: string;
    image: string;
  }

  useEffect(() => {
    fetchgallerys();
  }, []);

  const fetchgallerys = async () => {
    try {
      const response = await axios.get("https://simpo-planet-studio-bn.onrender.com/api/v1/gallery");
      setgallerys(response.data || []);
    } catch (err) {
      setError("Failed to load gallerys.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery?")) return;

    try {
      await axios.delete(`https://simpo-planet-studio-bn.onrender.com/api/v1/gallery/${id}`);
      setgallerys((prev) => prev.filter((gallery: gallery) => gallery._id !== id));
      alert("gallery deleted successfully.");
      fetchgallerys();
    } catch (err) {
      alert("Delete failed.");
      console.error(err);
    }
  };

  const handleEdit = (gallery: gallery) => {
    setEditinggallery(gallery);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editinggallery) return;

    try {
      await axios.put(`https://simpo-planet-studio-bn.onrender.com/api/v1/gallery/${editinggallery._id}`, editinggallery);
      alert("gallery updated successfully.");
      setIsEditing(false);
      fetchgallerys();
    } catch (err) {
      alert("Update failed.");
      console.error(err);
    }
  };

  const filterByDate = (gallery: gallery) => {
    const now = new Date();
    const createdAt = new Date(gallery.createdAt);

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
  const formattedDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const filteredgallerys = gallerys
    .filter((a: gallery) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(filterByDate);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🎨 Manage gallerys</h2>

      {isEditing && editinggallery && (
        <div className="fixed inset-0 bg-black/15 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit gallery</h2>
            <div className="space-y-4">
              
              <input
                type="text"
                value={editinggallery.title}
                onChange={(e) => setEditinggallery({ ...editinggallery, title: e.target.value })}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editinggallery.age}
                onChange={(e) => setEditinggallery({ ...editinggallery, age: e.target.value })}
                placeholder="Age"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editinggallery.management}
                onChange={(e) => setEditinggallery({ ...editinggallery, management: e.target.value })}
                placeholder="Management"
                className="w-full p-2 border rounded"
              />
                  <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="mb-1 text-sm text-gray-600">Biography</label>
          <textarea
            name="bio"
          value={editinggallery.bio}
                onChange={(e) => setEditinggallery({ ...editinggallery, bio: e.target.value })}
            rows={4}
            className=" border-gray-400 border-2 rounded-lg px-3 py-2 focus:outline-none"
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

      <div className="relative overflow-x-auto bg-gray-200 p-2 shadow-md sm:rounded-lg">
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
              placeholder="Search for gallerys"
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
          <p className="text-center text-gray-500 py-4">Loading gallerys...</p>
        ) : error ? (
          <p className="text-red-600 text-center py-4">{error}</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="p-4"></th>
                <th className="px-6 py-3">gallery</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Created On</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredgallerys.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No gallerys found.
                  </td>
                </tr>
              ) : (
                filteredgallerys.map((gallery: gallery) => (
                  <tr
                    key={gallery._id}
                    className="bg-white border-b-2 border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4"></td>
                    <td className="px-6 py-4 flex items-center gap-2 font-medium text-gray-900 whitespace-nowrap">
                      <img
                        src={gallery.image}
                        alt={gallery.title}
                        className="h-10 w-10 object-cover rounded-full"
                      />
                      {gallery.title}
                    </td>
                    <td className="px-6 py-4">{gallery.title}</td>
                    <td className="px-6 py-4 truncate">{formattedDate(gallery.createdAt)}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEdit(gallery)}
                        className="text-yellow-600 cursor-pointer"
                      >
                        <PenBoxIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(gallery._id)}
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
    </div>
  );
}
