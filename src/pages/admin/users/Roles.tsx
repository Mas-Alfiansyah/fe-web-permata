import { useState } from 'react';
import { 
    Shield, 
    Edit, 
    Trash, 
    Plus
} from 'lucide-react';

interface Role {
    id: string;
    name: string;
    permissions: string[];
    usersCount: number;
}

const mockRoles: Role[] = [
    { id: '1', name: 'Super Admin', permissions: ['all'], usersCount: 2 },
    { id: '2', name: 'Instructor', permissions: ['course.create', 'course.edit', 'student.view'], usersCount: 15 },
    { id: '3', name: 'Student', permissions: ['course.view', 'quiz.take'], usersCount: 1240 },
];

export default function Roles() {
    const [roles, setRoles] = useState<Role[]>(mockRoles);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure? This might affect users with this role.')) {
            setRoles(roles.filter(r => r.id !== id));
        }
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const newRole: Role = {
            id: Date.now().toString(),
            name: formData.get('name') as string,
            permissions: (formData.get('permissions') as string).split(',').map(p => p.trim()),
            usersCount: 0
        };

        setRoles([...roles, newRole]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Role & Permissions</h1>
                    <p className="text-slate-500">Kelola hak akses pengguna dalam sistem.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Tambah Role
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {roles.map((role) => (
                    <div key={role.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <Shield size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                    <Edit size={18} />
                                </button>
                                {role.usersCount === 0 && (
                                    <button 
                                        onClick={() => handleDelete(role.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{role.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{role.usersCount} Users Assigned</p>
                        
                        <div className="mt-auto">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Permissions</h4>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.map((perm, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">
                                        {perm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

             {/* Add Modal */}
             {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Tambah Role Baru</h3>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 pt-0 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Role</label>
                                <input name="name" type="text" className="w-full p-2 border border-slate-200 rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Permissions (comma separated)</label>
                                <textarea name="permissions" rows={3} placeholder="course.view, quiz.take" className="w-full p-2 border border-slate-200 rounded-lg"></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
