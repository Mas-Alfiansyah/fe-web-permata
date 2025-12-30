import { useState } from 'react';
import { 
    Plus, 
    Edit, 
    Trash, 
    Video, 
    FileText,
    Search,
    BookOpen
} from 'lucide-react';
import { mockCourses } from '../../../data/mockData';

interface Module {
    id: string;
    title: string;
    courseId: string;
    description: string;
    materialCount: number;
}

const mockModulesData: Module[] = [
    { id: '1', title: 'Pengenalan React', courseId: '1', description: 'Dasar-dasar React dan JSX', materialCount: 5 },
    { id: '2', title: 'State & Props', courseId: '1', description: 'Mengelola data dalam komponen', materialCount: 3 },
    { id: '3', title: 'Hooks Basic', courseId: '1', description: 'useState dan useEffect', materialCount: 4 },
];

export default function ModuleList() {
    const [modules, setModules] = useState<Module[]>(mockModulesData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this module?')) {
            setModules(modules.filter(m => m.id !== id));
        }
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const newModule: Module = {
            id: Date.now().toString(),
            title: formData.get('title') as string,
            courseId: formData.get('courseId') as string,
            description: formData.get('description') as string,
            materialCount: 0
        };

        setModules([...modules, newModule]);
        setIsModalOpen(false);
    };

    const filteredModules = modules.filter(m => 
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Modul & Materi</h1>
                    <p className="text-slate-500">Kelola struktur modul pembelajaran course Anda.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Tambah Modul
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Cari modul..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Module List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredModules.length > 0 ? (
                    filteredModules.map((module) => (
                        <div key={module.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                                        <BookOpen className="text-indigo-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
                                        <p className="text-sm text-slate-500 mb-2">{module.description}</p>
                                        <div className="flex gap-4">
                                            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md flex items-center gap-1">
                                                <Video size={12} /> {module.materialCount} Video
                                            </span>
                                            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md flex items-center gap-1">
                                                <FileText size={12} /> 2 Dokumen
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                        <Edit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(module.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">Belum ada modul</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mt-1">
                            Mulai dengan menambahkan modul pertama untuk course Anda.
                        </p>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Tambah Modul Baru</h3>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 pt-0 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Modul</label>
                                <input name="title" type="text" className="w-full p-2 border border-slate-200 rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                                <select name="courseId" className="w-full p-2 border border-slate-200 rounded-lg">
                                    {mockCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
                                <textarea name="description" rows={3} className="w-full p-2 border border-slate-200 rounded-lg"></textarea>
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
