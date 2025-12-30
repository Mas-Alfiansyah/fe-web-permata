import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Calendar,
    BarChart,
    Settings,
    ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useSidebar } from '../../context/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';
import PermataLogo from '../../assets/images/permata.webp';

const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    {
        title: 'User Management',
        icon: Users,
        submenu: [
            { title: 'Students', path: '/admin/users/students' },
            { title: 'Instructors', path: '/admin/users/instructors' },
            { title: 'Role & Permission', path: '/admin/users/roles' },
        ]
    },
    { 
        title: 'Course Management', 
        icon: BookOpen,
        submenu: [
            { title: 'Semua Course', path: '/admin/courses' },
            { title: 'Kategori Course', path: '/admin/courses/categories' },
            { title: 'Activation Course', path: '/admin/courses/activation' },
            { title: 'Approval Course', path: '/admin/courses/approval' },
        ]
    },
    { title: 'Events & Bootcamps', icon: Calendar, path: '/admin/events' },
    { title: 'Laporan & Analytics', icon: BarChart, path: '/admin/reports' },
    { title: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar() {
    // const { logout } = useAuth(); // Unused
    const location = useLocation();
    const { isCollapsed, isMobile, isMobileOpen, toggleMobileSidebar } = useSidebar();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const sidebarClasses = clsx(
        "bg-white text-slate-600 flex flex-col h-screen fixed lg:static z-50 transition-all duration-300 ease-in-out border-r border-slate-200 mt-16 lg:mt-0 pt-0 lg:pt-16",
        {
            "w-64": !isCollapsed && !isMobile,
            "w-20": isCollapsed && !isMobile,
            "translate-x-0 w-64 shadow-2xl": isMobile && isMobileOpen,
            "-translate-x-full": isMobile && !isMobileOpen,
        }
    );

    const handleDropdownClick = (title: string) => {
        if (isCollapsed) return;
        setOpenDropdown(openDropdown === title ? null : title);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={toggleMobileSidebar}
                />
            )}

            <aside className={sidebarClasses}>
                {/* Branding */}
                <div className="absolute top-0 h-16 flex items-center gap-1 px-6 border-b border-slate-100 shrink-0">
                   <div className="pw-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                        {/* Placeholder Logo if no image */}
                        <img src={PermataLogo} className='w-full h-full object-cover' alt="" />
                   </div>
                   {!isCollapsed && (
                       <span className="font-bold text-xl text-slate-800 tracking-tight">
                           Permata
                       </span>
                   )}
                </div>

                <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-200">
                    <nav className="space-y-1 px-3">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path || 
                                           (item.submenu && item.submenu.some(sub => location.pathname.startsWith(sub.path)));
                            const isDropdownOpen = openDropdown === item.title;

                            return (
                                <div key={item.title}>
                                    {item.submenu ? (
                                        // Dropdown Parent
                                        <div>
                                            <button
                                                onClick={() => handleDropdownClick(item.title)}
                                                className={clsx(
                                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group relative",
                                                    isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon size={20} className={clsx("shrink-0", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                                                    {!isCollapsed && (
                                                        <span className="font-medium whitespace-nowrap">{item.title}</span>
                                                    )}
                                                </div>
                                                {!isCollapsed && (
                                                    <ChevronDown size={16} className={clsx("transition-transform duration-200", isDropdownOpen && "rotate-180")} />
                                                )}
                                                {/* Tooltip for collapsed mode */}
                                                {isCollapsed && (
                                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                                        {item.title}
                                                    </div>
                                                )}
                                            </button>

                                            {/* Submenu */}
                                            <AnimatePresence>
                                                {isDropdownOpen && !isCollapsed && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-1 ml-4 pl-3 border-l border-slate-200 space-y-1">
                                                            {item.submenu.map((sub) => (
                                                                <Link
                                                                    key={sub.path}
                                                                    to={sub.path}
                                                                    className={clsx(
                                                                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                                                                        location.pathname === sub.path 
                                                                            ? "text-blue-600 font-medium bg-blue-50/50" 
                                                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                                                    )}
                                                                >
                                                                    {sub.title}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        // Standard Link
                                        <Link 
                                            to={item.path}
                                            className={clsx(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                                                isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            )}
                                        >
                                            <item.icon size={20} className={clsx("shrink-0", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                                            {!isCollapsed && (
                                                <span className="font-medium whitespace-nowrap">{item.title}</span>
                                            )}
                                            {isCollapsed && (
                                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                                    {item.title}
                                                </div>
                                            )}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}
