import { Outlet } from 'react-router-dom';

import {Topbar} from '../components/Topbar';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-700">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
