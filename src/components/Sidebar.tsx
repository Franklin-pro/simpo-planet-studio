import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Palette,Film, Image, Music, Briefcase, Mail, LogOut } from 'lucide-react';

type MenuItem = {
  label: string;
  icon: any;
  path?: string;
  items?: { name: string; path: string }[];
};

const menus: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
  },
  {
    label: 'Individual Users',
    icon: Users,
    path: '/admin/users/manage',
  },
    {
    label: 'Messages',
    icon: Mail,
    path: '/admin/contact/messages',
  },
  {
    label: 'Artists',
    icon: Palette,
    items: [
      { name: 'Create Artist', path: '/admin/artists/create' },
      { name: 'Manage Artists', path: '/admin/artists/manage' },
    ],
  },
  {
    label: 'Gallery',
    icon: Image,
    items: [
      { name: 'Create Gallery', path: '/admin/gallery/create' },
      { name: 'Manage Gallery', path: '/admin/gallery/manage' },
    ],
  },
  {
    label: 'Musics',
    icon: Music,
    items: [
      { name: 'Upload Music', path: '/admin/music/upload' },
      { name: 'Manage Music', path: '/admin/music/manage' },
    ],
  },
  {
    label: 'Producers',
    icon: Briefcase,
    items: [
      { name: 'Add New Producer', path: '/admin/producer/create' },
      { name: 'Manage Producers', path: '/admin/producer/manage' },
    ],
  },
    {
    label: 'FilmMakers',
    icon: Film,
    items: [
      { name: 'Create FilmMaker', path: '/admin/filmmaker/create' },
      { name: 'Manage FilmMaker', path: '/admin/filmmaker/manage' },
    ],
  },
];

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };


  const handleLogout = async() => {
    try {
      // Clear local storage/session storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      // Try to call logout API without credentials
      await fetch("https://simpo-planet-studio-bn.onrender.com/api/v1/admin/logout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error("Logout API failed:", error);
      // Continue with logout even if API fails
    } finally {
      // Always navigate to login regardless of API success/failure
      navigate("/login");
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col justify-between h-screen">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        </div>
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li key={menu.label}>
              {menu.path ? (
                <Link
                  to={menu.path}
                  className={`flex items-center gap-3 font-medium px-2 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/20 ${
                    pathname === menu.path ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <menu.icon size={18} />
                  {menu.label}
                </Link>
              ) : (
                <>
                  <div
                    onClick={() => toggleMenu(menu.label)}
                    className="cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between px-2 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <menu.icon size={18} />
                      {menu.label}
                    </div>
                    <span>{openMenu === menu.label ? '-' : '+'}</span>
                  </div>
                  {openMenu === menu.label && menu.items && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {menu.items.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`block text-sm px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/20 ${
                              pathname === item.path ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-4 py-2 rounded transition-colors flex items-center gap-2 justify-center"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
