import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ChevronLeft, 
    Save, 
    Upload,
    X 
} from 'lucide-react';

interface CourseFormData {
    title: string;
    description: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    price: number;
    descriptionFull: string;
    thumbnail?: File | null;
}

const mockCategories = ['Programming', 'Design', 'Marketing', 'Data Science', 'Business'];

export default function CourseForm({ isEdit = false }: { isEdit?: boolean }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState<CourseFormData>({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        price: 0,
        descriptionFull: '',
        thumbnail: null
    });

    useEffect(() => {
        if (isEdit && id) {
            // Simulate fetching data
            setFormData({
                title: 'Introduction to React',
                description: 'Learn the basics of React',
                category: 'Programming',
                level: 'Beginner',
                price: 500000,
                descriptionFull: 'Complete guide to React hooks, components, and state management.',
                thumbnail: null // In real app, this would be a URL
            });
            setPreviewUrl('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
        }
    }, [isEdit, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, thumbnail: file }));
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/admin/courses');
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/admin/courses')}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isEdit ? 'Edit Course' : 'Buat Course Baru'}
                    </h1>
                    <p className="text-slate-500">
                        {isEdit ? 'Perbarui informasi course.' : 'Tambahkan course baru ke katalog.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Informasi Dasar</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Judul Course <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Contoh: Belajar React dari Nol"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Kategori <span className="text-red-500">*</span></label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {mockCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Level <span className="text-red-500">*</span></label>
                            <select 
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Harga (Rp) <span className="text-red-500">*</span></label>
                            <input 
                                type="number" 
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                min="0"
                                required
                            />
                            <p className="text-xs text-slate-500">Isi 0 untuk course gratis.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Deskripsi Singkat <span className="text-red-500">*</span></label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Ringkasan singkat tentang course ini..."
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Deskripsi Lengkap</label>
                        <textarea 
                            name="descriptionFull"
                            value={formData.descriptionFull}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Jelaskan detail materi, target audience, dan hasil pembelajaran..."
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Media */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Media & Thumbnail</h3>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Thumbnail Course</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                            {previewUrl ? (
                                <div className="relative w-full max-w-sm aspect-video rounded-lg overflow-hidden">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewUrl(null);
                                            setFormData(prev => ({ ...prev, thumbnail: null }));
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 text-indigo-600">
                                        <Upload size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">Klik untuk upload atau drag & drop</p>
                                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB (16:9 ratio recommended)</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                        type="button"
                        onClick={() => navigate('/admin/courses')}
                        className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                    >
                        Batal
                    </button>
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Save size={18} />
                        {isLoading ? 'Menyimpan...' : 'Simpan Course'}
                    </button>
                </div>
            </form>
        </div>
    );
}
