import { useState } from 'react';
import { 
    Search, 
    Filter, 
    Eye, 
    Edit, 
    Trash, 
    UserPlus,
    X,
    CheckCircle,
    Mail,
    Phone,
    MapPin,
    Calendar
} from 'lucide-react';

interface Student {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    enrolledCourses: number;
    joinDate: string;
    avatar?: string;
    address?: string;
}

const mockStudents: Student[] = [
    { id: '1', name: 'Ahmad Rizki', email: 'ahmad@example.com', phone: '081234567890', status: 'active', enrolledCourses: 4, joinDate: '2023-01-15', address: 'Jakarta, Indonesia' },
    { id: '2', name: 'Siti Aminah', email: 'siti@example.com', phone: '081298765432', status: 'active', enrolledCourses: 2, joinDate: '2023-02-20', address: 'Bandung, Indonesia' },
    { id: '3', name: 'Budi Santoso', email: 'budi@example.com', phone: '081355556666', status: 'inactive', enrolledCourses: 0, joinDate: '2023-03-10', address: 'Surabaya, Indonesia' },
];

export default function AdminStudents() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Filter Logic
    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers
    const handleView = (student: Student) => {
        setSelectedStudent(student);
        setIsViewModalOpen(true);
    };

    const handleEdit = (student: Student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (student: Student) => {
        setSelectedStudent(student);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedStudent) {
            setStudents(students.filter(s => s.id !== selectedStudent.id));
            setIsDeleteModalOpen(false);
            setSelectedStudent(null);
        }
    };

    const handleConfirmEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedStudent) return;
        
        // In reality, gather data from form
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const updatedName = formData.get('name') as string;
        const updatedEmail = formData.get('email') as string;
        const updatedStatus = formData.get('status') as 'active' | 'inactive';

        setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, name: updatedName, email: updatedEmail, status: updatedStatus } : s));
        setIsEditModalOpen(false);
        setSelectedStudent(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Students Management</h1>
                    <p className="text-slate-500">Kelola data siswa yang terdaftar di platform.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    <UserPlus size={20} />
                    <span>Tambah Siswa</span>
                </button>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Cari nama atau email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                    <Filter size={20} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Nama Siswa</th>
                                <th className="px-6 py-4 font-semibold">Kontak</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Courses</th>
                                <th className="px-6 py-4 font-semibold">Join Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{student.name}</div>
                                                    <div className="text-xs text-slate-500">ID: #{student.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm">
                                                <span className="text-slate-900">{student.email}</span>
                                                <span className="text-slate-500 text-xs">{student.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {student.enrolledCourses} Enrolled
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {student.joinDate}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleView(student)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Detail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleEdit(student)}
                                                    className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteClick(student)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus"
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
                                        Tidak ada data siswa ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Detail Siswa</h3>
                            <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold">
                                    {selectedStudent.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedStudent.name}</h2>
                                    <p className="text-slate-500">Student ID: #{selectedStudent.id}</p>
                                    <span className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                        selectedStudent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {selectedStudent.status === 'active' && <CheckCircle size={12} />}
                                        {selectedStudent.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                    <Mail className="text-slate-400 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Email</p>
                                        <p className="text-slate-700">{selectedStudent.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                    <Phone className="text-slate-400 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">No. Telepon</p>
                                        <p className="text-slate-700">{selectedStudent.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                    <MapPin className="text-slate-400 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Alamat</p>
                                        <p className="text-slate-700">{selectedStudent.address || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                    <Calendar className="text-slate-400 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Tanggal Bergabung</p>
                                        <p className="text-slate-700">{selectedStudent.joinDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                            <button 
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium shadow-sm"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && selectedStudent && (
                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Edit Siswa</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleConfirmEdit}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                                    <input type="text" name="name" defaultValue={selectedStudent.name} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" name="email" defaultValue={selectedStudent.email} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select name="status" defaultValue={selectedStudent.status} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium shadow-sm"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden text-center">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                                <Trash size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Siswa?</h3>
                            <p className="text-slate-500 mb-6">
                                Apakah Anda yakin ingin menghapus data siswa <strong>{selectedStudent.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium shadow-sm"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleConfirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-sm"
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
