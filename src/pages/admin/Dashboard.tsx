import { Users, BookOpen, TrendingUp, Award, ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

const stats = [
  { name: 'Total Peserta', value: '1,245', change: '+12%', changeType: 'increase', icon: Users, color: 'bg-blue-500' },
  { name: 'Total Instruktur', value: '84', change: '+5%', changeType: 'increase', icon: Users, color: 'bg-purple-500' },
  { name: 'Course Aktif', value: '32', change: '+2', changeType: 'increase', icon: BookOpen, color: 'bg-green-500' },
  { name: 'Completion Rate', value: '78.5%', change: '-1.2%', changeType: 'decrease', icon: Award, color: 'bg-yellow-500' },
];

const popularCourses = [
  { name: 'React Frontend Masterclass', instructor: 'Budi Santoso', students: 450, rating: 4.8 },
  { name: 'Fullstack Laravel 10', instructor: 'Siti Aminah', students: 380, rating: 4.9 },
  { name: 'UI/UX Design Fundamentals', instructor: 'Joko Anwar', students: 310, rating: 4.7 },
  { name: 'Python for Data Science', instructor: 'Rina Wati', students: 245, rating: 4.6 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex gap-2">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
            </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <dt>
              <div className={clsx("absolute rounded-md p-3", item.color)}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={clsx(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                )}
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-gray-500" />
                Grafik Pertumbuhan User
            </h3>
            <div className="h-64 flex items-end justify-between gap-2 px-2 border-b border-l border-gray-200">
                {[40, 60, 45, 70, 85, 60, 75, 50, 65, 80, 95, 100].map((h, i) => (
                    <div key={i} className="w-full bg-blue-100 hover:bg-blue-200 rounded-t transition-all group relative" style={{ height: `${h}%` }}>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                            {h * 12}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Jan</span><span>Dec</span>
            </div>
        </div>

        {/* Popular Courses */}
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Course Paling Populer</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-900">View All</button>
            </div>
            <ul className="divide-y divide-gray-200">
                {popularCourses.map((course) => (
                    <li key={course.name} className="py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-500">
                                    <BookOpen size={20} />
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {course.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {course.instructor} • {course.students} Students
                                </p>
                            </div>
                            <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {course.rating} ★
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
}
