import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type MenuItem = {
  label: string;
  items: { name: string; path: string }[];
};

const menus: MenuItem[] = [
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
    <div className="w-64 bg-white shadow-md p-4 flex flex-col justify-between h-screen">
      <div>
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li key={menu.label}>
              <div
                onClick={() => toggleMenu(menu.label)}
                className="cursor-pointer font-medium text-gray-800 hover:text-blue-600 flex justify-between"
              >
                {menu.label}
                <span>{openMenu === menu.label ? '-' : '+'}</span>
              </div>
              {openMenu === menu.label && (
                <ul className="ml-4 mt-2 space-y-1">
                  {menu.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`block text-sm px-2 py-1 rounded hover:bg-blue-100 ${
                          pathname === item.path ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
