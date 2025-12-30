import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';

export default function StudentLayout() {
  const { logout, user } = useAuth();
  const location = useLocation();

  const navItems = [
      { name: 'Dashboard', path: '/student/dashboard' },
      { name: 'Katalog Course', path: '/student/catalog' },
      { name: 'Course Saya', path: '/student/my-courses' },
      { name: 'Aktivasi Kode', path: '/student/activation' },
      { name: 'Event', path: '/student/events' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex">
                    <div className="shrink-0 flex items-center">
                        <span className="text-2xl font-bold text-blue-600">Permata</span>
                    </div>
                    <nav className="ml-6 flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={clsx(
                                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                                    location.pathname === item.path 
                                        ? "border-blue-500 text-gray-900" 
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700">Hi, {user?.name}</span>
                    <button onClick={logout} className="text-gray-500 hover:text-red-500">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
