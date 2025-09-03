import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Users, Calendar, UserCheck, Eye, Shield } from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);

  interface User {
    id: string;
    createdAt: string;
    _id: string;
    username: string;
    email: string;
    userType: string;
    isActive: boolean;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://simpo-planet-studio-bn.onrender.com/api/v1/admin/users");
      setUsers(response.data.data || []);
    } catch (err) {
      setError("Failed to load users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await axios.patch(`https://simpo-planet-studio-bn.onrender.com/api/v1/admin/users/${userId}/status`, {
        isActive: !currentStatus
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to update user status.");
      console.error(err);
    }
  };

  const filterByDate = (user: User) => {
    const now = new Date();
    const createdAt = new Date(user.createdAt);

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

  const filteredUsers = Array.isArray(users) 
    ? users
        .filter((u: User) => u.username?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(filterByDate)
    : [];

  const adminUsers = Array.isArray(users) ? users.filter((u: User) => u.userType === 'admin') : [];
  const activeUsers = Array.isArray(users) ? users.filter((u: User) => u.isActive !== false) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and organize your platform users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{Array.isArray(users) ? users.length : 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeUsers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminUsers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredUsers.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Table Header with Search and Filter */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search users..."
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
                          { label: "All users", value: "all" },
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
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading users...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No users found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">User</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Role</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Joined</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user: User) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                              {user.username?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.userType === 'admin' 
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}>
                          {user.userType === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.isActive !== false
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                        }`}>
                          {user.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="View user details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user._id, user.isActive)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.isActive !== false
                                ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
                                : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30'
                            }`}
                            title={user.isActive !== false ? 'Deactivate user' : 'Activate user'}
                          >
                            <UserCheck className="h-4 w-4" />
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