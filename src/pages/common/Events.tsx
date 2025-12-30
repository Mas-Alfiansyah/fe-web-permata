import { useState } from 'react';
import { 
    Calendar,
    MapPin,
    Clock,
    Users,
    Search,
    Plus,
    Filter,
    Edit,
    Trash,
    Eye,
    X,
    Save
} from 'lucide-react';

interface Event {
    id: string;
    title: string;
    type: 'Webinar' | 'Bootcamp' | 'Workshop';
    date: string;
    time: string;
    location: string;
    participants: number;
    status: 'Upcoming' | 'Ongoing' | 'Completed';
    description: string;
    image: string;
}

const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Fullstack Developer Bootcamp',
        type: 'Bootcamp',
        date: '2025-02-15',
        time: '09:00 - 16:00',
        location: 'Zoom Meeting',
        participants: 156,
        status: 'Upcoming',
        description: 'Intensive bootcamp for becoming a fullstack developer in 12 weeks.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '2',
        title: 'React Hooks Deep Dive',
        type: 'Webinar',
        date: '2025-01-20',
        time: '19:00 - 20:30',
        location: 'Google Meet',
        participants: 89,
        status: 'Upcoming',
        description: 'Master React Hooks in this interactive webinar session.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60'
    }
];

export default function Events() {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'create' | 'edit' | 'delete' | null>(null);

    // Handlers
    const handleAction = (event: Event | null, mode: 'view' | 'create' | 'edit' | 'delete') => {
        setSelectedEvent(event);
        setModalMode(mode);
    };

    const handleDelete = () => {
        if(selectedEvent) {
             setEvents(events.filter(e => e.id !== selectedEvent.id));
             setModalMode(null);
             setSelectedEvent(null);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, handle create/update logic
        setModalMode(null);
        setSelectedEvent(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Events & Bootcamps</h1>
                    <p className="text-slate-500">Kelola jadwal webinar, workshop, dan bootcamp.</p>
                </div>
                <button 
                    onClick={() => handleAction(null, 'create')}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    <span>Buat Event</span>
                </button>
            </div>

             {/* Filters */}
             <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Cari event..." 
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

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="h-48 relative overflow-hidden">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-indigo-600 shadow-sm uppercase">
                                {event.type}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1">{event.title}</h3>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Calendar size={16} className="text-slate-400" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Clock size={16} className="text-slate-400" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <MapPin size={16} className="text-slate-400" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                                <button 
                                    onClick={() => handleAction(event, 'view')}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Detail"
                                >
                                    <Eye size={18} />
                                </button>
                                <button 
                                    onClick={() => handleAction(event, 'edit')}
                                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button 
                                    onClick={() => handleAction(event, 'delete')}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail/View Modal */}
            {modalMode === 'view' && selectedEvent && (
                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="relative h-48">
                            <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => setModalMode(null)} 
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-xs font-bold uppercase text-indigo-600 mb-1 block">{selectedEvent.type}</span>
                                    <h2 className="text-2xl font-bold text-slate-900">{selectedEvent.title}</h2>
                                </div>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium uppercase border border-green-200">
                                    {selectedEvent.status}
                                </span>
                            </div>
                            
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {selectedEvent.description}
                            </p>

                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Calendar size={18} className="text-indigo-500" />
                                    <span className="font-medium">{selectedEvent.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Clock size={18} className="text-indigo-500" />
                                    <span className="font-medium">{selectedEvent.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <MapPin size={18} className="text-indigo-500" />
                                    <span className="font-medium">{selectedEvent.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Users size={18} className="text-indigo-500" />
                                    <span className="font-medium">{selectedEvent.participants} Peserta Terdaftar</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                            <button 
                                onClick={() => setModalMode(null)}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {(modalMode === 'create' || modalMode === 'edit') && (
                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-900">
                                {modalMode === 'create' ? 'Buat Event Baru' : 'Edit Event'}
                            </h3>
                            <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            <form id="eventForm" onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Judul Event</label>
                                    <input 
                                        type="text" 
                                        defaultValue={selectedEvent?.title}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                        required 
                                        placeholder="Contoh: Webinar React JS"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tipe</label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option>Webinar</option>
                                            <option>Bootcamp</option>
                                            <option>Workshop</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option>Upcoming</option>
                                            <option>Ongoing</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                                        <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Jam</label>
                                        <input type="text" placeholder="e.g. 09:00 - 12:00" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
                                    <input type="text" placeholder="Zoom / Jl. Sudirman No.1" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                                    <textarea rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Deskripsi singkat event..."></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button 
                                onClick={() => setModalMode(null)}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium shadow-sm"
                            >
                                Batal
                            </button>
                            <button 
                                form="eventForm"
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center gap-2"
                            >
                                <Save size={18} /> Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {modalMode === 'delete' && selectedEvent && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden text-center">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                                <Trash size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Event?</h3>
                            <p className="text-slate-500 mb-6">
                                Apakah Anda yakin ingin menghapus event <strong>{selectedEvent.title}</strong>?
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={() => setModalMode(null)}
                                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium shadow-sm"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleDelete}
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
