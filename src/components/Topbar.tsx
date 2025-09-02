import { UserCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";

export function Topbar() {
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setMessage('Good Morning');
    } else if (hour < 18) {
      setMessage('Good Afternoon');
    } else {
      setMessage('Good Evening');
    }
  }, []);

  if (!user || !user.email) {
    return null; // Hide topbar if user is not properly set
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold text-gray-800 dark:text-white">{message} 👋</div>
      <div className="text-sm flex items-center text-gray-600 dark:text-gray-300">
        <UserCircleIcon className="inline-block mr-2 w-8 h-8" />
        <div className="flex flex-col">
          <span className="font-bold">{user.username || 'Admin'}</span>
          <span className="text-xs">{user.email}</span>
        </div>
      </div>
    </header>
  );
}
