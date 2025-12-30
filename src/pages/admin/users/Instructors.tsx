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
    Star
} from 'lucide-react';

interface Instructor {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    coursesCount: number;
    studentsCount: number;
    rating: number;
    joinDate: string;
    specialization: string;
}

const mockInstructors: Instructor[] = [
    { id: '1', name: 'Dr. Budi Santoso', email: 'budi.dr@permata.com', phone: '081212345678', status: 'active', coursesCount: 5, studentsCount: 120, rating: 4.8, joinDate: '2022-11-10', specialization: 'Web Development' },
    { id: '2', name: 'Rina Maryana', email: 'rina.m@permata.com', phone: '081298761234', status: 'active', coursesCount: 3, studentsCount: 85, rating: 4.9, joinDate: '2023-01-05', specialization: 'UI/UX Design' },
    { id: '3', name: 'Joko Widodo', email: 'joko.dev@permata.com', phone: '081345678901', status: 'inactive', coursesCount: 0, studentsCount: 0, rating: 0, joinDate: '2023-04-12', specialization: 'Data Science' },
];

export default function AdminInstructors() {
    const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Filter Logic
    const filteredInstructors = instructors.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers
    const handleView = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
        setIsViewModalOpen(true);
    };

    const handleEdit = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedInstructor) {
            setInstructors(instructors.filter(s => s.id !== selectedInstructor.id));
            setIsDeleteModalOpen(false);
            setSelectedInstructor(null);
        }
    };

    const handleConfirmEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedInstructor) return;
        
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const updatedName = formData.get('name') as string;
        const updatedEmail = formData.get('email') as string;
        const updatedSpec = formData.get('specialization') as string;
        const updatedStatus = formData.get('status') as 'active' | 'inactive';

        setInstructors(instructors.map(s => s.id === selectedInstructor.id ? { 
            ...s, 
            name: updatedName, 
            email: updatedEmail, 
            specialization: updatedSpec,
            status: updatedStatus 
        } : s));
        setIsEditModalOpen(false);
        setSelectedInstructor(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Instructors Management</h1>
                    <p className="text-slate-500">Kelola data pengajar dan instruktur.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    <UserPlus size={20} />
                    <span>Tambah Instructor</span>
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
                                <th className="px-6 py-4 font-semibold">Nama Instructor</th>
                                <th className="px-6 py-4 font-semibold">Spesialisasi</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Stats</th>
                                <th className="px-6 py-4 font-semibold">Rating</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredInstructors.length > 0 ? (
                                filteredInstructors.map((instructor) => (
                                    <tr key={instructor.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                                    {instructor.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{instructor.name}</div>
                                                    <div className="text-xs text-slate-500">{instructor.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded">
                                                {instructor.specialization}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                instructor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {instructor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div className="flex flex-col text-xs">
                                                <span>{instructor.coursesCount} Courses</span>
                                                <span>{instructor.studentsCount} Students</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                                                <Star size={14} className="text-amber-400 fill-amber-400" />
                                                {instructor.rating > 0 ? instructor.rating : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleView(instructor)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Detail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleEdit(instructor)}
                                                    className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteClick(instructor)}
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
                                        Tidak ada data instructor ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedInstructor && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Detail Instructor</h3>
                            <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 text-3xl font-bold">
                                    {selectedInstructor.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedInstructor.name}</h2>
                                    <p className="text-slate-500">{selectedInstructor.specialization}</p>
                                    <span className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                        selectedInstructor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {selectedInstructor.status === 'active' && <CheckCircle size={12} />}
                                        {selectedInstructor.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-3 bg-slate-50 rounded-lg text-center">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Total Courses</p>
                                    <p className="text-xl font-bold text-indigo-600">{selectedInstructor.coursesCount}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-center">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Total Students</p>
                                    <p className="text-xl font-bold text-indigo-600">{selectedInstructor.studentsCount}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                    <Mail className="text-slate-400 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Email</p>
                                        <p className="text-slate-700">{selectedInstructor.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                    <Phone className="text-slate-400 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">No. Telepon</p>
                                        <p className="text-slate-700">{selectedInstructor.phone}</p>
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
            {isEditModalOpen && selectedInstructor && (
                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Edit Instructor</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleConfirmEdit}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                                    <input type="text" name="name" defaultValue={selectedInstructor.name} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" name="email" defaultValue={selectedInstructor.email} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Spesialisasi</label>
                                    <input type="text" name="specialization" defaultValue={selectedInstructor.specialization} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select name="status" defaultValue={selectedInstructor.status} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
            {isDeleteModalOpen && selectedInstructor && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden text-center">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                                <Trash size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Instructor?</h3>
                            <p className="text-slate-500 mb-6">
                                Apakah Anda yakin ingin menghapus data instructor <strong>{selectedInstructor.name}</strong>? 
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
