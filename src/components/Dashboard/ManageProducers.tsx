import { useEffect, useState } from "react";
import axios from "axios";
import { Edit3, Trash2, Search, Filter, User, Calendar, Briefcase } from "lucide-react";
import DeleteModal from "../../components/DeleteModal";

export default function ManageProducers() {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProducer, setEditingProducer] = useState<Producer>();
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("last30");
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  interface Producer {
    id: string;
    createdAt: string;
    _id: string;
    name: string;
    contactEmail: string;
    bio: string;
    level: string;
    yearsExperience: number;
    profileImage: string;
    genres: string[];
    skills: string[];
    credits: string[];
    socialMedia: Record<string, string>;
  }

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = async () => {
    try {
      const response = await axios.get("https://simpo-planet-studio-bn.onrender.com/api/v1/producer");
      setProducers(response.data.data || []);
    } catch (err) {
      setError("Failed to load producers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`https://simpo-planet-studio-bn.onrender.com/api/v1/producer/${deleteId}`);
      setProducers((prev) => prev.filter((producer: Producer) => producer._id !== deleteId));
      setDeleteId(null);
      fetchProducers();
    } catch (err) {
      alert("Delete failed.");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (producer: Producer) => {
    setEditingProducer(producer);
    setIsEditing(true);
  };

const handleUpdate = async () => {
  if (!editingProducer) return;
  setIsUpdating(true);

  try {
    await axios.put(
      `https://simpo-planet-studio-bn.onrender.com/api/v1/producer/${editingProducer._id}`,
      {
        name: editingProducer.name,
        level: editingProducer.level,
        bio: editingProducer.bio,
        contactEmail: editingProducer.contactEmail,
        yearsExperience: editingProducer.yearsExperience,

        // stringify complex fields
        genres: JSON.stringify(editingProducer.genres || []),
        skills: JSON.stringify(editingProducer.skills || []),
        credits: JSON.stringify(editingProducer.credits || []),
        socialMedia: JSON.stringify(editingProducer.socialMedia || {}),
      }
    );

    alert("Producer updated successfully.");
    setIsEditing(false);
    fetchProducers();
  } catch (err) {
    alert("Update failed.");
    console.error(err);
  }
  finally {
    setIsUpdating(false);
  }
};


  const filterByDate = (producer: Producer) => {
    const now = new Date();
    const createdAt = new Date(producer.createdAt);

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

  const filteredProducers = Array.isArray(producers) 
    ? producers
        .filter((p: Producer) => p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(filterByDate)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Producer Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and organize your producers</p>
        </div>

        {/* Edit Modal */}
        {isEditing && editingProducer && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Producer</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={editingProducer.name}
                    onChange={(e) => setEditingProducer({ ...editingProducer, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={editingProducer.contactEmail}
                    onChange={(e) => setEditingProducer({ ...editingProducer, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
                  <select
                    value={editingProducer.level}
                    onChange={(e) => setEditingProducer({ ...editingProducer, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Level</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Legendary">Legendary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">yearsExperience (years)</label>
                  <input
                    type="number"
                    value={editingProducer.yearsExperience}
                    onChange={(e) => setEditingProducer({ ...editingProducer, yearsExperience: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={editingProducer.bio}
                    onChange={(e) => setEditingProducer({ ...editingProducer, bio: e.target.value })}
                    maxLength={500}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{editingProducer.bio?.length || 0}/500 characters</p>
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
            title="Delete Producer"
            message="Are you sure you want to delete this producer? This action cannot be undone."
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Producers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Array.isArray(producers) ? producers.length : 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredProducers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Array.isArray(producers) ? producers.length : 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
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
                    placeholder="Search producers..."
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
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading producers...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : filteredProducers.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No producers found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Producer</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">level</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">yearsExperience</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Created</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProducers.map((producer: Producer) => (
                    <tr key={producer._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            {producer.profileImage ? (
                              <img src={producer.profileImage} alt={producer.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900 dark:text-white">{producer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{producer.contactEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full">
                          {producer.level}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">{producer.yearsExperience} years</td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                        {new Date(producer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(producer)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="Edit producer"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(producer._id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete producer"
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