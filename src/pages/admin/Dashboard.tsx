import { Music, Image, } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";

interface DashboardData {
  overview: {
    totalUsers: number;
    totalAdmins: number;
    totalRegularUsers: number;
    totalGalleryItems: number;
    totalArtists: number;
    totalMusic: number;
    totalProducers: number;
    totalFilmmakers: number;
    totalContacts: number;
  };
  engagement: {
    totalLikes: number;
    averageLikes: number;
    topGalleryItems: Array<{
      _id: string;
      title: string;
      likeCount: number;
      image: string;
    }>;
    totalMusicPlays: number;
    averageMusicPlays: number;
    topMusicTracks: Array<{
      _id: string;
      title: string;
      playCount: number;
    }>;
  };
  recentActivity: {
    newUsersLast7Days: number;
    newGalleryLast7Days: number;
  };
  userDistribution: Array<{
    _id: string;
    count: number;
  }>;
  summary: {
    totalContent: number;
    totalEngagement: number;
    activeUsers: number;
  };
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        "https://simpo-planet-studio-bn.onrender.com/api/v1/dashboard/analytics"
      );
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const result = await response.json();
      setDashboardData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{
    type: string;
    index: number;
    value: number;
    month: string;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const getChartData = () => {
    if (!dashboardData) return [];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const currentArtists = dashboardData.overview.totalArtists || 0;
    const currentMusic = dashboardData.overview.totalMusic || 0;
    const currentPlays = dashboardData.engagement.totalMusicPlays || 0;
    // const currentUsers = dashboardData.overview.totalUsers || 0;

    return months.map((month, index) => {
      const progress = (index + 1) / 6;
      return {
        month,
        artists: currentArtists > 0 ? Math.floor(currentArtists * progress) : 0,
        music: currentMusic > 0 ? Math.floor(currentMusic * progress) : 0,
        listens: currentPlays > 0 ? Math.floor(currentPlays * progress) : 0,
        views: dashboardData.engagement.totalLikes > 0 ? Math.floor(dashboardData.engagement.totalLikes * progress) : 0,
      };
    });
  };

  const chartData = getChartData();

  // Calculate maximum values for scaling
  const maxArtists =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.artists)) : 1;
  const maxMusic =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.music)) : 1;
  const maxListens =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.listens)) : 1;
  const maxViews =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.views)) : 1;

  // Handle tooltip positioning
  const handleBarHover = (index: number, e: MouseEvent) => {
    setHoveredBar(index);
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handlePointHover = (
    type: string,
    index: number,
    value: number,
    month: string,
    e: MouseEvent
  ) => {
    setHoveredPoint({ type, index, value, month });
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Content</h3>
          <p className="text-3xl font-bold">
            {dashboardData?.summary.totalContent || 0}
          </p>
          <p className="text-blue-100 text-sm">
            Artists + Music + Gallery + Filmmakers
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Engagement</h3>
          <p className="text-3xl font-bold">
            {dashboardData?.summary.totalEngagement || 0}
          </p>
          <p className="text-green-100 text-sm">Total likes across platform</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-3xl font-bold">
            {dashboardData?.summary.activeUsers || 0}
          </p>
          <p className="text-purple-100 text-sm">Registered platform users</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Monthly Growth
          </h3>
          <div
            ref={chartContainerRef}
            className="h-64 flex items-end justify-between space-x-2 relative px-2"
          >
            {chartData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 relative group"
                onMouseEnter={(e) => handleBarHover(index, e)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="w-full flex justify-center space-x-1">
                  <div
                    className="w-3 bg-blue-500 rounded-t hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                    style={{
                      height: `${(data.artists / maxArtists) * 80}%`,
                      minHeight: "4px",
                    }}
                    title={`Artists: ${data.artists}`}
                  ></div>
                  <div
                    className="w-3 bg-green-500 rounded-t hover:bg-green-600 transition-all duration-200 cursor-pointer"
                    style={{
                      height: `${(data.music / maxMusic) * 80}%`,
                      minHeight: "4px",
                    }}
                    title={`Music: ${data.music}`}
                  ></div>
                  <div
                    className="w-3 bg-purple-500 rounded-t hover:bg-purple-600 transition-all duration-200 cursor-pointer"
                    style={{
                      height: `${(data.listens / maxListens) * 80}%`,
                      minHeight: "4px",
                    }}
                    title={`Listens: ${data.listens}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {data.month}
                </span>
              </div>
            ))}

            {/* Tooltip */}
            {hoveredBar !== null && (
              <div
                className="absolute bg-gray-900 dark:bg-gray-700 text-white p-3 rounded-lg text-xs whitespace-nowrap z-10 shadow-lg pointer-events-none"
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y - 80}px`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="font-semibold mb-1">
                  {chartData[hoveredBar].month}
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>Artists: {chartData[hoveredBar].artists}</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>Music: {chartData[hoveredBar].music}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span>Listens: {chartData[hoveredBar].listens}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Artists
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Music
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Listens
              </span>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Engagement Trend
          </h3>
          <div ref={chartContainerRef} className="h-64 relative">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((val) => (
                <line
                  key={val}
                  x1="0"
                  y1={val}
                  x2="100"
                  y2={val}
                  stroke="#e5e7eb"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                  className="dark:stroke-gray-700"
                />
              ))}

              {/* Likes Line */}
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points={chartData
                  .map(
                    (data, index) =>
                      `${(index / (chartData.length - 1)) * 90 + 5},${
                        95 - (data.views / maxViews) * 70
                      }`
                  )
                  .join(" ")}
              />

              {/* Plays Line */}
              <polyline
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                points={chartData
                  .map(
                    (data, index) =>
                      `${(index / (chartData.length - 1)) * 90 + 5},${
                        95 - (data.listens / maxListens) * 70
                      }`
                  )
                  .join(" ")}
              />

              {/* Views Points */}
              {chartData.map((data, index) => (
                <circle
                  key={`views-${index}`}
                  cx={(index / (chartData.length - 1)) * 90 + 5}
                  cy={95 - (data.views / maxViews) * 70}
                  r="2"
                  fill="#ef4444"
                  className="cursor-pointer transition-all hover:r-3"
                  onMouseEnter={(e) =>
                    handlePointHover("views", index, data.views, data.month, e)
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}

              {/* Listens Points */}
              {chartData.map((data, index) => (
                <circle
                  key={`listens-${index}`}
                  cx={(index / (chartData.length - 1)) * 90 + 5}
                  cy={95 - (data.listens / maxListens) * 70}
                  r="2"
                  fill="#8b5cf6"
                  className="cursor-pointer transition-all hover:r-3"
                  onMouseEnter={(e) =>
                    handlePointHover(
                      "listens",
                      index,
                      data.listens,
                      data.month,
                      e
                    )
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
              {chartData.map((data, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-600 dark:text-gray-400"
                  style={{
                    marginLeft: index === 0 ? "0" : "-2%",
                    marginRight: index === chartData.length - 1 ? "0" : "-2%",
                  }}
                >
                  {data.month}
                </span>
              ))}
            </div>

            {/* Tooltip */}
            {hoveredPoint && (
              <div
                className="absolute bg-gray-900 dark:bg-gray-700 text-white p-2 rounded text-xs whitespace-nowrap z-10 shadow-lg pointer-events-none"
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y - 60}px`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="font-semibold">{hoveredPoint.month}</div>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded mr-2 ${
                      hoveredPoint.type === "likes"
                        ? "bg-red-500"
                        : "bg-purple-500"
                    }`}
                  ></div>
                  {hoveredPoint.value} {hoveredPoint.type}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Likes
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Plays
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View all
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                New Users (7 days)
              </h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {dashboardData?.recentActivity.newUsersLast7Days || 0}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                New Gallery Items (7 days)
              </h4>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {dashboardData?.recentActivity.newGalleryLast7Days || 0}
              </p>
            </div>
          </div>

          {/* Top Gallery Items */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Top Gallery Items
            </h4>
            <div className="space-y-2">
              {(dashboardData?.engagement?.topGalleryItems ?? []).length > 0 ? (
                (dashboardData?.engagement?.topGalleryItems ?? [])
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center">
                        <Image className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {item.likeCount} likes
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No gallery items yet
                </p>
              )}
            </div>
          </div>

          {/* Top Music Tracks */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Top Music Tracks
            </h4>
            <div className="space-y-2">
              {(dashboardData?.engagement?.topMusicTracks ?? []).length > 0 ? (
                (dashboardData?.engagement?.topMusicTracks ?? [])
                  .slice(0, 3)
                  .map((track) => (
                    <div
                      key={track._id}
                      className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                        <Music className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {track.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {track.playCount} plays
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No music tracks yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
