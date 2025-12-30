import { useState } from 'react';
import { 
    Search, 
    Filter, 
    Plus, 
    Eye, 
    Edit, 
    Trash, 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Course {
    id: string;
    title: string;
    instructor: string;
    category: string;
    status: 'active' | 'draft' | 'archived';
    students: number;
    price: number;
}

const mockCourses: Course[] = [
    { id: '1', title: 'Introduction to React', instructor: 'Dr. Budi Santoso', category: 'Programming', status: 'active', students: 120, price: 500000 },
    { id: '2', title: 'Advanced UI Design', instructor: 'Rina Maryana', category: 'Design', status: 'active', students: 85, price: 750000 },
    { id: '3', title: 'Digital Marketing 101', instructor: 'Andi Pratama', category: 'Marketing', status: 'draft', students: 0, price: 300000 },
];

export default function CourseList() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this course?')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
                    <p className="text-slate-500">Kelola semua course yang tersedia di platform.</p>
                </div>
                <Link 
                    to="/admin/courses/create"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    <span>Tambah Course</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Cari judul course atau instruktur..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-600"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Semua Status</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                        <Filter size={20} />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Course Title</th>
                                <th className="px-6 py-4 font-semibold">Instructor</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Students</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{course.title}</div>
                                            <div className="text-xs text-slate-500">{course.category}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{course.instructor}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                course.status === 'active' ? 'bg-green-100 text-green-800' : 
                                                course.status === 'draft' ? 'bg-slate-100 text-slate-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{course.students}</td>
                                        <td className="px-6 py-4 text-slate-600">Rp {course.price.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => navigate(`/admin/courses/${course.id}`)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                                    title="Lihat Detail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
                                                    className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" 
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(course.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                                    title="Hapus"
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        Tidak ada course ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
