import { 
    Users, 
    BookOpen, 
    Clock, 
    TrendingUp,
    MoreVertical,
    Calendar
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

export default function InstructorDashboard() {
    // Mock Data
    const stats = [
        { label: 'Total Siswa', value: '1,245', icon: Users, change: '+12%', color: 'blue' },
        { label: 'Course Aktif', value: '8', icon: BookOpen, change: '+2', color: 'indigo' },
        { label: 'Jam Mengajar', value: '124h', icon: Clock, change: '+24h', color: 'orange' },
        { label: 'Pendapatan', value: 'Rp 45jt', icon: TrendingUp, change: '+15%', color: 'green' },
    ];

    const studentActivityData = [
        { name: 'Sen', students: 40 },
        { name: 'Sel', students: 65 },
        { name: 'Rab', students: 85 },
        { name: 'Kam', students: 50 },
        { name: 'Jum', students: 90 },
        { name: 'Sab', students: 120 },
        { name: 'Min', students: 75 },
    ];

    const courseDistributionData = [
        { name: 'React', value: 400 },
        { name: 'Node.js', value: 300 },
        { name: 'UI/UX', value: 300 },
        { name: 'Python', value: 200 },
    ];

    const COLORS = ['#4F46E5', '#0EA5E9', '#10B981', '#F59E0B'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Instructor</h1>
                    <p className="text-slate-500">Ringkasan aktivitas dan statistik course Anda.</p>
                </div>
                <button className="flex items-center gap-2 bg-white text-slate-600 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <Calendar size={18} />
                    <span>Filter Tanggal</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Activity Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">Aktivitas Siswa Minggu Ini</h3>
                        <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={studentActivityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                                <Tooltip 
                                    cursor={{fill: '#F1F5F9'}}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="students" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Course Distribution Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">Distribusi Course</h3>
                        <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
                    </div>
                    <div className="h-64 mb-4">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={courseDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {courseDistributionData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                        {courseDistributionData.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                    <span className="text-slate-600">{item.name}</span>
                                </div>
                                <span className="font-medium text-slate-900">{Math.round((item.value / 1200) * 100)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
