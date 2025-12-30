import { PanelLeft, Bell, User, LogOut, ChevronDown, Menu } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopNavbar() {
    const { toggleSidebar, toggleMobileSidebar } = useSidebar();
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white border-b border-slate-200 h-16 sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6 shadow-sm shrink-0">
            <div className="flex items-center gap-4">
                {/* Mobile Toggle */}
                <button 
                    onClick={toggleMobileSidebar}
                    className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                    <Menu size={24} />
                </button>
                
                {/* Desktop Toggle - Only visible on desktop */}
                <button 
                    onClick={toggleSidebar}
                    className="hidden lg:block p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <PanelLeft size={20} />
                </button>

                {/* <div className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Permata
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {user?.role === 'super_admin' ? 'Super Admin' : 'Instructor'} Portal
                    </span>
                </div> */}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full relative transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-slate-700 leading-none">{user?.name}</p>
                            <p className="text-xs text-slate-500 mt-1 capitalize">{user?.role}</p>
                        </div>
                        <ChevronDown size={14} className={clsx("text-slate-400 transition-transform hidden md:block", isProfileOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 origin-top-right"
                            >
                                <div className="px-4 py-3 border-b border-slate-50 mb-1 md:hidden">
                                     <p className="text-sm font-medium text-slate-700">{user?.name}</p>
                                     <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                                </div>
                                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 mx-1 rounded-md transition-colors">
                                    <User size={16} /> Profile
                                </Link>
                                <div className="h-px bg-slate-100 my-1 mx-1" />
                                <button 
                                    onClick={logout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 mx-1 rounded-md transition-colors"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}
