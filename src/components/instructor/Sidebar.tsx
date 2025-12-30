import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    BookOpen, 
    Video, 
    FileText, 
    MessageCircle, 
    Award,
} from 'lucide-react';
import clsx from 'clsx';
import { useSidebar } from '../../context/SidebarContext';
import PermataLogo from '../../assets/images/permata.webp';


const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/instructor/dashboard' },
    { title: 'Course Saya', icon: BookOpen, path: '/instructor/courses' },
    { title: 'Aktivasi Course', icon: Award, path: '/instructor/courses/activation' },
    { title: 'Materi & Modul', icon: Video, path: '/instructor/modules' },
    { title: 'Assessment', icon: FileText, path: '/instructor/assessments' },
    { title: 'Diskusi', icon: MessageCircle, path: '/instructor/discussions' },
];

export default function InstructorSidebar() {
    // const { logout } = useAuth();
    const location = useLocation();
    const { isCollapsed, isMobile, isMobileOpen, toggleMobileSidebar } = useSidebar();
    
    const sidebarClasses = clsx(
        "bg-white text-slate-600 flex flex-col h-screen fixed lg:static z-50 transition-all duration-300 ease-in-out border-r border-slate-200 mt-16 lg:mt-0 pt-0 lg:pt-16",
        {
            "w-64": !isCollapsed && !isMobile,
            "w-20": isCollapsed && !isMobile,
            "translate-x-0 w-64 shadow-2xl": isMobile && isMobileOpen,
            "-translate-x-full": isMobile && !isMobileOpen,
        }
    );

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
                            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                            return (
                                <Link 
                                    key={item.title}
                                    to={item.path}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                                        isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <item.icon size={20} className={clsx("shrink-0", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                                    {!isCollapsed && (
                                        <span className="font-medium whitespace-nowrap">{item.title}</span>
                                    )}
                                    {isCollapsed && (
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                            {item.title}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}
