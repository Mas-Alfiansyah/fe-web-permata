import { useState } from 'react';
import { 
    Plus, 
    Search, 
    MoreVertical, 
    Copy, 
    XCircle
} from 'lucide-react';
import { mockActivationCodes, mockCourses } from '../../../data/mockData';
import type { ActivationCode } from '../../../data/mockData';
import clsx from 'clsx';

export default function ActivationCodes() {
    const [codes, setCodes] = useState<ActivationCode[]>(mockActivationCodes);
    const [activeTab, setActiveTab] = useState<'active' | 'history' | 'blacklist'>('active');
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    
    // Filter logic
    const filteredCodes = codes.filter(code => {
        if (activeTab === 'active') return code.status === 'active';
        if (activeTab === 'history') return code.status !== 'active'; // Simplified for demo
        if (activeTab === 'blacklist') return code.status === 'blacklisted';
        return true;
    });

    const getCourseName = (id: string) => mockCourses.find(c => c.id === id)?.title || 'Unknown Course';

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock generation logic
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const courseId = formData.get('courseId') as string;
        const type = formData.get('type') as 'single' | 'multi';
        const maxUses = type === 'multi' ? parseInt(formData.get('maxUses') as string) : 1;
        
        const newCode: ActivationCode = {
            code: `PMT-${mockCourses.find(c => c.id === courseId)?.category.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`,
            courseId,
            type,
            maxUses,
            usedCount: 0,
            expiresAt: formData.get('expiresAt') as string,
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0]
        };

        setCodes([...codes, newCode]);
        setShowGenerateModal(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add toast notification here
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Aktivasi Course</h1>
                    <p className="text-gray-500">Kelola kode aktivasi untuk akses course.</p>
                </div>
                <button 
                    onClick={() => setShowGenerateModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Generate Kode
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium">Total Kode Aktif</div>
                    <div className="text-2xl font-bold text-slate-800">{codes.filter(c => c.status === 'active').length}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium">Total Terpakai</div>
                    <div className="text-2xl font-bold text-blue-600">
                        {codes.reduce((acc, curr) => acc + curr.usedCount, 0)}
                    </div>
                </div>
                {/* More stats can be added */}
            </div>

            {/* Tabs & Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-200 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                        {(['active', 'history', 'blacklist'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                    activeTab === tab 
                                        ? "bg-white text-slate-900 shadow-sm" 
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {tab === 'active' ? 'Kode Aktif' : tab === 'history' ? 'Riwayat' : 'Blacklist'}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari kode..." 
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Kode Aktivasi</th>
                                <th className="px-6 py-4 font-semibold">Course</th>
                                <th className="px-6 py-4 font-semibold">Tipe</th>
                                <th className="px-6 py-4 font-semibold">Penggunaan</th>
                                <th className="px-6 py-4 font-semibold">Valid Sampai</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCodes.map((code) => (
                                <tr key={code.code} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <code className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-mono text-sm font-bold">
                                                {code.code}
                                            </code>
                                            <button 
                                                onClick={() => copyToClipboard(code.code)}
                                                className="text-slate-400 hover:text-blue-500"
                                                title="Copy Code"
                                            >
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">Dibuat: {code.createdAt}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-700">{getCourseName(code.courseId)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            code.type === 'single' ? "bg-purple-100 text-purple-800" : "bg-teal-100 text-teal-800"
                                        )}>
                                            {code.type === 'single' ? 'Single Use' : 'Multi Use'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${(code.usedCount / code.maxUses) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-slate-600">{code.usedCount}/{code.maxUses}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {code.expiresAt}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            code.status === 'active' && "bg-green-100 text-green-700",
                                            code.status === 'disabled' && "bg-slate-100 text-slate-700",
                                            code.status === 'blacklisted' && "bg-red-100 text-red-700"
                                        )}>
                                            <span className={clsx("w-1.5 h-1.5 rounded-full",
                                                code.status === 'active' ? "bg-green-500" : 
                                                code.status === 'disabled' ? "bg-slate-500" : "bg-red-500"
                                            )} />
                                            {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Generate Modal */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Generate Kode Baru</h3>
                            <button onClick={() => setShowGenerateModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                        </div>
                        <form onSubmit={handleGenerate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Course</label>
                                <select name="courseId" className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {mockCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Kode</label>
                                    <select name="type" className="w-full p-2 border border-slate-200 rounded-lg">
                                        <option value="single">Single Use (1 User)</option>
                                        <option value="multi">Multi Use (Many Users)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Berlaku Sampai</label>
                                    <input type="date" name="expiresAt" className="w-full p-2 border border-slate-200 rounded-lg" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kuota Penggunaan (Multi Use)</label>
                                <input type="number" name="maxUses" defaultValue={50} className="w-full p-2 border border-slate-200 rounded-lg" />
                            </div>
                            <div className="pt-4 flex gap-3 justify-end">
                                <button type="button" onClick={() => setShowGenerateModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Generate Kode</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
