import { useState } from 'react';
import { 
    Plus, 
    Clock, 
    CheckCircle, 
    XCircle,
    AlertCircle
} from 'lucide-react';
import { mockActivationRequests, mockCourses } from '../../../data/mockData';
import type { ActivationRequest } from '../../../data/mockData';
import clsx from 'clsx';
import { useAuth } from '../../../context/AuthContext';

export default function ActivationRequests() {
    const { user } = useAuth();
    // In real app, filter requests by user.id
    const [requests, setRequests] = useState<ActivationRequest[]>(mockActivationRequests);
    const [showRequestModal, setShowRequestModal] = useState(false);

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const newRequest: ActivationRequest = {
            id: `req-${Date.now()}`,
            instructorId: user?.id || 'unknown',
            courseId: formData.get('courseId') as string,
            reason: formData.get('reason') as string,
            estimatedParticipants: parseInt(formData.get('estimatedParticipants') as string),
            duration: formData.get('duration') as string,
            status: 'pending',
            createdAt: new Date().toISOString().split('T')[0]
        };

        setRequests([newRequest, ...requests]);
        setShowRequestModal(false);
    };

    const getCourseName = (id: string) => mockCourses.find(c => c.id === id)?.title || 'Unknown Course';

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Request Aktivasi Course</h1>
                    <p className="text-gray-500">Ajukan kode aktivasi untuk course Anda.</p>
                </div>
                <button 
                    onClick={() => setShowRequestModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={20} />
                    Buat Request
                </button>
            </div>

            {/* Request List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-200 p-4">
                    <h2 className="font-semibold text-slate-900">Riwayat Pengajuan</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Course</th>
                                <th className="px-6 py-4 font-semibold">Alasan</th>
                                <th className="px-6 py-4 font-semibold">Estimasi Peserta</th>
                                <th className="px-6 py-4 font-semibold">Durasi</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-medium text-slate-800">{getCourseName(req.courseId)}</td>
                                    <td className="px-6 py-4 text-slate-600">{req.reason}</td>
                                    <td className="px-6 py-4 text-slate-600">{req.estimatedParticipants}</td>
                                    <td className="px-6 py-4 text-slate-600">{req.duration}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            req.status === 'approved' && "bg-green-100 text-green-700",
                                            req.status === 'pending' && "bg-yellow-100 text-yellow-700",
                                            req.status === 'rejected' && "bg-red-100 text-red-700"
                                        )}>
                                            {req.status === 'approved' && <CheckCircle size={14} />}
                                            {req.status === 'pending' && <Clock size={14} />}
                                            {req.status === 'rejected' && <XCircle size={14} />}
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{req.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Request Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Ajukan Kode Aktivasi</h3>
                            <button onClick={() => setShowRequestModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                        </div>
                        <form onSubmit={handleRequest} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Course</label>
                                <select name="courseId" className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    {mockCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Alasan Pengajuan</label>
                                <textarea name="reason" rows={3} className="w-full p-2 border border-slate-200 rounded-lg" placeholder="Contoh: Untuk kelas bootcamp batch 5..." required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Estimasi Peserta</label>
                                    <input type="number" name="estimatedParticipants" className="w-full p-2 border border-slate-200 rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Durasi Akses</label>
                                    <select name="duration" className="w-full p-2 border border-slate-200 rounded-lg">
                                        <option value="1 bulan">1 Bulan</option>
                                        <option value="3 bulan">3 Bulan</option>
                                        <option value="6 bulan">6 Bulan</option>
                                        <option value="1 tahun">1 Tahun</option>
                                        <option value="Selamanya">Selamanya</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-blue-700 text-sm">
                                <AlertCircle size={20} className="shrink-0" />
                                <p>Admin akan meninjau permintaan Anda. Setelah disetujui, kode akan muncul di halaman ini.</p>
                            </div>

                            <div className="pt-4 flex gap-3 justify-end">
                                <button type="button" onClick={() => setShowRequestModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Kirim Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
