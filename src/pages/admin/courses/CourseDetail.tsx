import { useParams, useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, 
    Edit, 
    Trash, 
    Clock, 
    Users, 
    Star,
    Calendar,
    Tag
} from 'lucide-react';
import { useState } from 'react';

// Mock Data (replace with API call)
const mockCourseDetail = {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React, including components, state, props, and hooks. Perpect for beginners starting their frontend journey.',
    instructor: 'Dr. Budi Santoso',
    category: 'Programming',
    level: 'Beginner',
    price: 500000,
    status: 'active',
    enrolledStudents: 120,
    rating: 4.8,
    totalModules: 12,
    duration: '10h 30m',
    lastUpdated: '2023-10-15',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
};

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // In a real app, fetch data based on ID
    const course = mockCourseDetail; 

    // Handle Delete
    const handleDelete = () => {
        // API call to delete
        console.log('Delete course', id);
        setIsDeleteModalOpen(false);
        navigate('/admin/courses');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/admin/courses')}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Detail Course</h1>
                        <p className="text-slate-500">ID: #{course.id}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Edit size={18} />
                        <span>Edit Course</span>
                    </button>
                    <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                    >
                        <Trash size={18} />
                        <span>Hapus</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Thumbnail */}
                    <div className="w-full aspect-video bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                        <img 
                            src={course.thumbnail} 
                            alt={course.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Deskripsi Course</h2>
                        <p className="text-slate-600 leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    {/* Syllabus / Modules Placeholder */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Kurikulum & Modul</h2>
                            <span className="text-sm text-slate-500">{course.totalModules} Modul</span>
                        </div>
                        <div className="space-y-3">
                             {/* Dummy Modules */}
                             {[1, 2, 3].map((mod) => (
                                <div key={mod} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between">
                                        <p className="font-medium text-slate-800">Modul {mod}: Topic Title</p>
                                        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">3 Materi</span>
                                    </div>
                                </div>
                             ))}
                             <button className="w-full text-center text-indigo-600 text-sm font-medium mt-2 hover:underline">
                                 Lihat Semua Modul
                             </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
                        <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100">Informasi Cepat</h3>
                        
                        <div className="flex items-center gap-3 text-slate-600">
                            <Users size={20} className="text-slate-400" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-400 uppercase font-bold">Instructor</p>
                                <p className="font-medium text-slate-900">{course.instructor}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                            <Tag size={20} className="text-slate-400" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-400 uppercase font-bold">Category & Level</p>
                                <p className="font-medium text-slate-900">{course.category} • {course.level}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                            <Clock size={20} className="text-slate-400" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-400 uppercase font-bold">Durasi</p>
                                <p className="font-medium text-slate-900">{course.duration}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                            <Calendar size={20} className="text-slate-400" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-400 uppercase font-bold">Terakhir Update</p>
                                <p className="font-medium text-slate-900">{course.lastUpdated}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <span className={`w-full block text-center py-2 rounded-lg font-medium capitalize ${
                                course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                                Status: {course.status}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Stats & Performance</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-indigo-50 p-3 rounded-lg text-center">
                                <p className="text-2xl font-bold text-indigo-600">{course.enrolledStudents}</p>
                                <p className="text-xs text-indigo-400 font-medium">Siswa Terdaftar</p>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg text-center">
                                <p className="text-2xl font-bold text-amber-500 flex items-center justify-center gap-1">
                                    {course.rating} <Star size={16} className="fill-amber-500" />
                                </p>
                                <p className="text-xs text-amber-500 font-medium">Rating Rata-rata</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden text-center">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                                <Trash size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Course?</h3>
                            <p className="text-slate-500 mb-6">
                                Apakah Anda yakin ingin menghapus course <strong>{course.title}</strong>? Data yang dihapus tidak dapat dikembalikan.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                                >
                                    Ya, Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
