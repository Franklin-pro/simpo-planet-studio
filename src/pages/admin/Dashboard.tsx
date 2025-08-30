import { Users, Music, Image, Film, TrendingUp, Eye, Headphones } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Artists', value: '24', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Total Music', value: '156', icon: Music, color: 'bg-green-500', change: '+8%' },
    { title: 'Gallery Items', value: '89', icon: Image, color: 'bg-purple-500', change: '+15%' },
    { title: 'Filmmakers', value: '12', icon: Film, color: 'bg-orange-500', change: '+5%' },
    { title: 'Total Views', value: '12.5K', icon: Eye, color: 'bg-red-500', change: '+23%' },
    { title: 'Growth Rate', value: '18%', icon: TrendingUp, color: 'bg-indigo-500', change: '+3%' }
  ];

  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const chartContainerRef = useRef(null);

  const chartData = [
    { month: 'Jan', artists: 20, music: 45, listens: 850, views: 1200 },
    { month: 'Feb', artists: 22, music: 52, listens: 1200, views: 1800 },
    { month: 'Mar', artists: 24, music: 48, listens: 980, views: 2100 },
    { month: 'Apr', artists: 26, music: 61, listens: 1450, views: 2400 },
    { month: 'May', artists: 28, music: 55, listens: 1300, views: 2800 },
    { month: 'Jun', artists: 30, music: 67, listens: 1680, views: 3200 }
  ];

  // Calculate maximum values for scaling
  const maxArtists = Math.max(...chartData.map(d => d.artists));
  const maxMusic = Math.max(...chartData.map(d => d.music));
  const maxListens = Math.max(...chartData.map(d => d.listens));
  const maxViews = Math.max(...chartData.map(d => d.views));

  // Handle tooltip positioning
  const handleBarHover = (index, e) => {
    setHoveredBar(index);
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handlePointHover = (type, index, value, month, e) => {
    setHoveredPoint({ type, index, value, month });
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Growth</h3>
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
                    style={{ height: `${(data.artists / maxArtists) * 80}%`, minHeight: '4px' }}
                    title={`Artists: ${data.artists}`}
                  ></div>
                  <div 
                    className="w-3 bg-green-500 rounded-t hover:bg-green-600 transition-all duration-200 cursor-pointer"
                    style={{ height: `${(data.music / maxMusic) * 80}%`, minHeight: '4px' }}
                    title={`Music: ${data.music}`}
                  ></div>
                  <div 
                    className="w-3 bg-purple-500 rounded-t hover:bg-purple-600 transition-all duration-200 cursor-pointer"
                    style={{ height: `${(data.listens / maxListens) * 80}%`, minHeight: '4px' }}
                    title={`Listens: ${data.listens}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{data.month}</span>
              </div>
            ))}
            
            {/* Tooltip */}
            {hoveredBar !== null && (
              <div 
                className="absolute bg-gray-900 dark:bg-gray-700 text-white p-3 rounded-lg text-xs whitespace-nowrap z-10 shadow-lg pointer-events-none"
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y - 80}px`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="font-semibold mb-1">{chartData[hoveredBar].month}</div>
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
              <span className="text-sm text-gray-600 dark:text-gray-400">Artists</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Music</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Listens</span>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Views & Listens Trend</h3>
          <div 
            ref={chartContainerRef}
            className="h-64 relative"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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
              
              {/* Views Line */}
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points={chartData.map((data, index) => 
                  `${(index / (chartData.length - 1)) * 90 + 5},${95 - (data.views / maxViews) * 70}`
                ).join(' ')}
              />
              
              {/* Listens Line */}
              <polyline
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                points={chartData.map((data, index) => 
                  `${(index / (chartData.length - 1)) * 90 + 5},${95 - (data.listens / maxListens) * 70}`
                ).join(' ')}
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
                  onMouseEnter={(e) => handlePointHover('views', index, data.views, data.month, e)}
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
                  onMouseEnter={(e) => handlePointHover('listens', index, data.listens, data.month, e)}
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
                    marginLeft: index === 0 ? '0' : '-2%',
                    marginRight: index === chartData.length - 1 ? '0' : '-2%'
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
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="font-semibold">{hoveredPoint.month}</div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded mr-2 ${hoveredPoint.type === 'views' ? 'bg-red-500' : 'bg-purple-500'}`}></div>
                  {hoveredPoint.value} {hoveredPoint.type}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Views</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Listens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all</button>
        </div>
        <div className="space-y-4">
          {[
            { action: 'New artist added', name: 'John Doe', time: '2 hours ago', type: 'artist' },
            { action: 'Music uploaded', name: 'Summer Vibes', time: '4 hours ago', type: 'music' },
            { action: 'Gallery updated', name: 'Concert Photos', time: '6 hours ago', type: 'gallery' },
            { action: 'Filmmaker registered', name: 'Sarah Wilson', time: '1 day ago', type: 'filmmaker' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${
                activity.type === 'artist' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                activity.type === 'music' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                activity.type === 'gallery' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
              }`}>
                {activity.type === 'artist' && <Users className="h-4 w-4" />}
                {activity.type === 'music' && <Music className="h-4 w-4" />}
                {activity.type === 'gallery' && <Image className="h-4 w-4" />}
                {activity.type === 'filmmaker' && <Film className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{activity.name}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;