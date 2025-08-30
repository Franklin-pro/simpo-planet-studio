import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type MenuItem = {
  label: string;
  path?: string;
  items?: { name: string; path: string }[];
};

const menus: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/admin',
  },
  {
    label: 'Artists',
    items: [
      { name: 'Create Artist', path: '/admin/artists/create' },
      { name: 'Manage Artists', path: '/admin/artists/manage' },
    ],
  },
  {
    label: 'Gallery',
    items: [
      { name: 'Create Gallery', path: '/admin/gallery/create' },
      { name: 'Manage Gallery', path: '/admin/gallery/manage' },
    ],
  },
   {
    label: 'Musics',
    items: [
      { name: 'Upload Music', path: '/admin/music/upload' },
      { name: 'Manage Music', path: '/admin/music/manage' },
    ],
  },
     {
    label: 'Producers',
    items: [
      { name: 'Add New Producer', path: '/admin/producer/create' },
      { name: 'Manage Producers', path: '/admin/producer/manage' },
    ],
  },
  {
    label: 'Contact Messages',
    items: [
      { name: 'View Messages', path: '/admin/contact/messages' },
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


  const handleLogout = () => {
    // Example: remove token from localStorage and redirect
    localStorage.removeItem('token');
    navigate('/login');
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
                  className={`block font-medium px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/20 ${
                    pathname === menu.path ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {menu.label}
                </Link>
              ) : (
                <>
                  <div
                    onClick={() => toggleMenu(menu.label)}
                    className="cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 flex justify-between"
                  >
                    {menu.label}
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
        className="mt-8 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-4 py-2 rounded transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
