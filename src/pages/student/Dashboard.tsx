import { useAuth } from '../../context/AuthContext';
import { 
    BookOpen, 
    Award, 
    Clock, 
    Zap,  
    TrendingUp,
    User as UserIcon
} from 'lucide-react';
import { mockCourses } from '../../data/mockData';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
    const { user } = useAuth();
    
    // Mock user's active courses
    const activeCourses = mockCourses.slice(0, 3).map(c => ({
        ...c,
        progress: Math.floor(Math.random() * 100) // Mock progress
    }));

    return (
        <div className="space-y-8 pb-12">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-xl"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                        Selamat Datang kembali, {user?.name}! 👋
                    </h1>
                    <p className="text-blue-100 text-lg mb-8 max-w-xl">
                        Lanjutkan perjalanan belajarmu hari ini. Ada banyak hal baru yang menunggu untuk dipelajari.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/student/catalog" className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm">
                            Jelajahi Course
                        </Link>
                        <Link to="/student/my-courses" className="bg-blue-600/50 text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-blue-600/70 transition-colors backdrop-blur-sm">
                            Lanjutkan Belajar
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Course Aktif', value: activeCourses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Selesai', value: '12', icon: Award, color: 'text-green-600', bg: 'bg-green-100' },
                    { label: 'Jam Belajar', value: '48h', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
                    { label: 'XP', value: '2450', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                ].map((stat, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        key={idx}
                        className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
                    >
                        <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center mb-3", stat.bg, stat.color)}>
                            <stat.icon size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Continue Learning Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="text-blue-600" />
                        Lanjutkan Belajar
                    </h2>
                    <Link to="/student/my-courses" className="text-blue-600 font-semibold text-sm hover:underline">
                        Lihat Semua
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activeCourses.map((course, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            key={course.id}
                            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
                        >
                            <div className="h-40 bg-slate-200 relative overflow-hidden">
                                {/* Placeholder Gradient Image */}
                                <div className={clsx("absolute inset-0 bg-gradient-to-br", 
                                    course.category === 'Web Development' ? 'from-sky-400 to-blue-600' : 
                                    course.category === 'Mobile Development' ? 'from-green-400 to-teal-600' : 
                                    'from-purple-400 to-indigo-600'
                                )} />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                    {course.category}
                                </div>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                                    <UserIcon size={14} /> {course.instructor}
                                </p>
                                
                                <div className="mt-auto">
                                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                                        <span>Progres Belajar</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <Link 
                                        to={`/student/course/${course.id}`} 
                                        className="mt-4 w-full block text-center bg-slate-50 text-slate-700 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                    >
                                        Lanjutkan
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recommended / Explore Section */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-white shadow-inner">
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Ingin mempelajari skill baru?</h2>
                    <p className="text-slate-500">Jelajahi katalog course kami dan temukan materi yang sesuai dengan minatmu.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {['Web Development', 'Data Science', 'UI/UX Design', 'Cloud Computing'].map((cat, i) => (
                       <Link 
                            key={i} 
                            to="/student/catalog"
                            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center hover:border-blue-500 hover:text-blue-600 transition-all hover:-translate-y-1"
                       >
                           <h4 className="font-bold">{cat}</h4>
                           <p className="text-xs text-slate-400 mt-1">12 Courses</p>
                       </Link>
                   ))}
                </div>
            </div>
        </div>
    );
}
