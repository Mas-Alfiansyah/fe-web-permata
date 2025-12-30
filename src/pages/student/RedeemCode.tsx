import { useState } from 'react';
import { 
    KeyRound, 
    ArrowRight, 
    CheckCircle, 
    AlertCircle,
    BookOpen
} from 'lucide-react';
import { mockActivationCodes, mockCourses } from '../../data/mockData';
import type { Course } from '../../data/mockData';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function RedeemCode() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid' | 'success'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [matchedCourse, setMatchedCourse] = useState<Course | null>(null);

    const handleValidate = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('validating');
        
        // Simulate API call
        setTimeout(() => {
            const foundCode = mockActivationCodes.find(c => c.code === code);
            
            if (!foundCode) {
                setStatus('invalid');
                setErrorMsg('Kode tidak ditemukan.');
                return;
            }

            if (foundCode.status !== 'active') {
                setStatus('invalid');
                setErrorMsg('Kode ini sudah tidak aktif atau diblacklist.');
                return;
            }

            if (foundCode.expiresAt < new Date().toISOString().split('T')[0]) {
                setStatus('invalid');
                setErrorMsg('Kode sudah kadaluarsa.');
                return;
            }

            if (foundCode.maxUses <= foundCode.usedCount) {
                setStatus('invalid');
                setErrorMsg('Kuota penggunaan kode ini sudah habis.');
                return;
            }

            const course = mockCourses.find(c => c.id === foundCode.courseId);
            if (course) {
                setMatchedCourse(course);
                setStatus('valid');
            } else {
                setStatus('invalid');
                setErrorMsg('Data course tidak ditemukan.');
            }
        }, 1000);
    };

    const handleRedeem = () => {
        // Simulate redemption
        setStatus('success');
        setTimeout(() => {
            navigate('/student/my-courses');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="text-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <KeyRound size={32} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Aktivasi Course</h1>
                <p className="text-slate-500 mt-2">Masukkan kode aktivasi yang Anda terima untuk mengakses course.</p>
            </div>

            {status !== 'success' ? (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
                    <form onSubmit={handleValidate} className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Kode Aktivasi</label>
                        <div className="flex gap-3">
                            <input 
                                type="text" 
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value.toUpperCase());
                                    setStatus('idle');
                                    setMatchedCourse(null);
                                }}
                                placeholder="CONTOH: PMT-REACT-2024"
                                className={clsx(
                                    "flex-1 p-3 border rounded-lg text-lg font-mono uppercase tracking-wide focus:outline-none focus:ring-2 transition-all",
                                    status === 'invalid' ? "border-red-300 focus:ring-red-200" : "border-slate-300 focus:ring-blue-500"
                                )}
                                disabled={status === 'valid'}
                            />
                            {status === 'idle' || status === 'invalid' ? (
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    disabled={!code}
                                >
                                    Cek Kode <ArrowRight size={20} />
                                </button>
                            ) : null}
                        </div>
                        
                        {status === 'invalid' && (
                            <p className="mt-2 text-red-600 text-sm flex items-center gap-1">
                                <AlertCircle size={16} /> {errorMsg}
                            </p>
                        )}
                    </form>

                    {status === 'validating' && (
                        <div className="mt-8 text-center text-slate-500">
                            Sedang memvalidasi kode...
                        </div>
                    )}

                    {status === 'valid' && matchedCourse && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-4 mb-6">
                                <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                                <div>
                                    <h3 className="font-bold text-green-900">Kode Valid!</h3>
                                    <p className="text-green-700 text-sm">Kode ini memberikan akses ke course berikut:</p>
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-xl p-4 flex gap-4 bg-slate-50/50">
                                <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                    <BookOpen size={32} className="text-blue-500" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase">{matchedCourse.category}</span>
                                    <h3 className="font-bold text-slate-900 mt-1 text-lg">{matchedCourse.title}</h3>
                                    <p className="text-slate-500 text-sm mt-1">Instructor: {matchedCourse.instructor}</p>
                                </div>
                            </div>

                            <button 
                                onClick={handleRedeem}
                                className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-900/10 transition-all active:scale-[0.98]"
                            >
                                Simpan & Mulai Belajar
                            </button>
                            <button 
                                onClick={() => {
                                    setStatus('idle');
                                    setMatchedCourse(null);
                                    setCode('');
                                }}
                                className="w-full mt-3 text-slate-500 hover:text-slate-700 py-2 text-sm"
                            >
                                Batalkan & Cek Kode Lain
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Aktivasi Berhasil!</h2>
                    <p className="text-slate-600 mt-2">Selamat, Anda sekarang memiliki akses ke course ini.</p>
                    <p className="text-slate-500 text-sm mt-8">Mengalihkan ke course saya...</p>
                </div>
            )}
        </div>
    );
}
