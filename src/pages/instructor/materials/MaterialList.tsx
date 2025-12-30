import { useState } from 'react';
import { 
    Plus, 
    Edit, 
    Trash, 
    Video, 
    FileText,
    Search,
    Link as LinkIcon
} from 'lucide-react';

interface Material {
    id: string;
    title: string;
    moduleId: string;
    type: 'video' | 'document' | 'link';
    url: string;
}

const mockMaterialsData: Material[] = [
    { id: '1', title: 'Intro to React', moduleId: '1', type: 'video', url: 'https://youtube.com/...' },
    { id: '2', title: 'React Cheatsheet', moduleId: '1', type: 'document', url: '/files/react-cheatsheet.pdf' },
    { id: '3', title: 'Official Docs', moduleId: '1', type: 'link', url: 'https://react.dev' },
];

export default function MaterialList() {
    // In a real app, you'd fetch modules first to populate the select dropdown
    const [materials, setMaterials] = useState<Material[]>(mockMaterialsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this material?')) {
            setMaterials(materials.filter(m => m.id !== id));
        }
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const newMaterial: Material = {
            id: Date.now().toString(),
            title: formData.get('title') as string,
            moduleId: formData.get('moduleId') as string,
            type: formData.get('type') as 'video' | 'document' | 'link',
            url: formData.get('url') as string
        };

        setMaterials([...materials, newMaterial]);
        setIsModalOpen(false);
    };

    const filteredMaterials = materials.filter(m => 
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getIcon = (type: string) => {
        switch(type) {
            case 'video': return <Video size={20} className="text-red-500" />;
            case 'document': return <FileText size={20} className="text-blue-500" />;
            case 'link': return <LinkIcon size={20} className="text-green-500" />;
            default: return <FileText size={20} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Materi Pembelajaran</h1>
                    <p className="text-slate-500">Kelola konten materi untuk setiap modul.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Tambah Materi
                </button>
            </div>

            {/* Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Cari materi..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Material List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Judul Materi</th>
                            <th className="px-6 py-4 font-semibold">Tipe</th>
                            <th className="px-6 py-4 font-semibold">URL / File</th>
                            <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredMaterials.length > 0 ? (
                            filteredMaterials.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                                {getIcon(item.type)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{item.title}</div>
                                                <div className="text-xs text-slate-500">Module ID: {item.moduleId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm truncate max-w-[200px] block">
                                            {item.url}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    Tidak ada materi ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Tambah Materi Baru</h3>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 pt-0 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Materi</label>
                                <input name="title" type="text" className="w-full p-2 border border-slate-200 rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Modul (ID)</label>
                                <input name="moduleId" type="text" defaultValue="1" className="w-full p-2 border border-slate-200 rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Konten</label>
                                <select name="type" className="w-full p-2 border border-slate-200 rounded-lg">
                                    <option value="video">Video</option>
                                    <option value="document">Dokumen / PDF</option>
                                    <option value="link">Link Eksternal</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">URL / Link</label>
                                <input name="url" type="text" className="w-full p-2 border border-slate-200 rounded-lg" required />
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
