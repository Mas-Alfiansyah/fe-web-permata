import { useState } from 'react';
import { 
    Search, 
    CheckCircle, 
    XCircle, 
    Eye,
    Clock,
    User,
    BookOpen,
    AlertCircle,
    X,
} from 'lucide-react';

interface ApprovalRequest {
    id: string;
    courseTitle: string;
    instructorName: string;
    category: string;
    submittedDate: string;
    status: 'pending' | 'approved' | 'rejected';
}

const mockRequests: ApprovalRequest[] = [
    { id: '1', courseTitle: 'Advanced Machine Learning', instructorName: 'Dr. Budi Santoso', category: 'Data Science', submittedDate: '2025-01-02', status: 'pending' },
    { id: '2', courseTitle: 'UI Design Principles', instructorName: 'Rina Maryana', category: 'Design', submittedDate: '2025-01-03', status: 'pending' },
];

export default function CourseApproval() {
    const [requests, setRequests] = useState<ApprovalRequest[]>(mockRequests);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'approve' | 'reject' | null>(null);
    const [feedback, setFeedback] = useState('');

    const handleAction = (request: ApprovalRequest, mode: 'view' | 'approve' | 'reject') => {
        setSelectedRequest(request);
        setModalMode(mode);
        setFeedback(''); // Reset feedback
    };

    const confirmAction = () => {
        if (!selectedRequest || !modalMode) return;

        if (modalMode === 'approve') {
             setRequests(requests.filter(r => r.id !== selectedRequest.id));
             // In real app, call API to approve
        } else if (modalMode === 'reject') {
             setRequests(requests.filter(r => r.id !== selectedRequest.id));
             // In real app, call API to reject with feedback
        }

        setModalMode(null);
        setSelectedRequest(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Approval Course</h1>
                    <p className="text-slate-500">Tinjau dan setujui course baru dari instruktur.</p>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                         type="text" 
                         className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                         placeholder="Cari course atau instruktur..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Course Title</th>
                            <th className="px-6 py-4 font-semibold">Instructor</th>
                            <th className="px-6 py-4 font-semibold">Tanggal Submit</th>
                            <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">{req.courseTitle}</div>
                                        <div className="text-xs text-slate-500">{req.category}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{req.instructorName}</td>
                                    <td className="px-6 py-4 text-slate-500">{req.submittedDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleAction(req, 'view')}
                                                className="flex items-center gap-1 px-3 py-1.5 text-blue-600 bg-blue-50 rounded-lg text-sm font-medium hover:bg-blue-100"
                                            >
                                                <Eye size={16} /> Review
                                            </button>
                                            <button 
                                                onClick={() => handleAction(req, 'approve')}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg" title="Approve"
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                            <button 
                                                 onClick={() => handleAction(req, 'reject')}
                                                 className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Reject"
                                            >
                                                <XCircle size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    Tidak ada permintaan approval pending.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for View/Approve/Reject */}
            {modalMode && selectedRequest && (
                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-900">
                                {modalMode === 'view' ? 'Review Course' : modalMode === 'approve' ? 'Approve Course' : 'Reject Course'}
                            </h3>
                            <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="p-6 overflow-y-auto">
                            {/* Course Summary (Always visible) */}
                            <div className="flex gap-4 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="w-16 h-16 bg-indigo-100 rounded-md shrink-0 flex items-center justify-center text-indigo-600">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{selectedRequest.courseTitle}</h4>
                                    <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                                        <User size={14} /> {selectedRequest.instructorName}
                                    </p>
                                    <p className="text-sm text-slate-600 flex items-center gap-2 mt-0.5">
                                        <Clock size={14} /> Submitted: {selectedRequest.submittedDate}
                                    </p>
                                </div>
                            </div>

                            {modalMode === 'view' && (
                                <div className="space-y-4">
                                     <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Course Overview</h4>
                                     <p className="text-slate-600 text-sm leading-relaxed">
                                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                     </p>
                                     <div className="grid grid-cols-2 gap-4 mt-4">
                                         <div className="p-3 border border-slate-200 rounded-lg">
                                             <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Total Modules</span>
                                             <span className="font-medium">12 Modules</span>
                                         </div>
                                         <div className="p-3 border border-slate-200 rounded-lg">
                                             <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Price</span>
                                             <span className="font-medium">Rp 500.000</span>
                                         </div>
                                     </div>
                                </div>
                            )}

                            {modalMode === 'reject' && (
                                <div className="space-y-3">
                                    <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3">
                                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                        <p className="text-sm">Anda akan menolak course ini. Mohon berikan alasan penolakan agar instruktur dapat memperbaikinya.</p>
                                    </div>
                                    <textarea 
                                        className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        rows={4}
                                        placeholder="Tuliskan alasan penolakan..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    ></textarea>
                                </div>
                            )}

                             {modalMode === 'approve' && (
                                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3">
                                    <CheckCircle size={24} className="shrink-0" />
                                    <p className="font-medium">Apakah Anda yakin ingin menyetujui course ini untuk dipublikasikan?</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                             {modalMode === 'view' ? (
                                 <>
                                     <button 
                                         onClick={() => setModalMode('reject')}
                                         className="px-4 py-2 border border-red-200 text-red-600 bg-white rounded-lg hover:bg-red-50 font-medium"
                                     >
                                         Reject
                                     </button>
                                     <button 
                                         onClick={() => setModalMode('approve')}
                                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                     >
                                         Approve
                                     </button>
                                 </>
                             ) : (
                                 <>
                                    <button 
                                         onClick={() => setModalMode('view')} // Back to view if confirming
                                         className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                                     >
                                         Batal
                                     </button>
                                     <button 
                                         onClick={confirmAction}
                                         className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm ${
                                             modalMode === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                         }`}
                                     >
                                         Konfirmasi {modalMode === 'approve' ? 'Approve' : 'Reject'}
                                     </button>
                                 </>
                             )}
                        </div>
                    </div>
                 </div>
            )}
        </div>
    );
}
