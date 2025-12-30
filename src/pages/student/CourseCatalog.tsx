import { mockCourses } from '../../data/mockData';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourseCatalog() {
  const publishedCourses = mockCourses.filter((c) => c.status === 'published');

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <h1 className="text-2xl font-bold text-gray-900">Katalog Course</h1>
           <div className="flex gap-2 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                   <input 
                    type="text" 
                    placeholder="Cari course..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                   />
                   <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
               </div>
               <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
                   <Filter size={18} />
                   <span className="hidden sm:inline">Filter</span>
               </button>
           </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {publishedCourses.map((course) => (
               <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                   <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
                       Course Image
                   </div>
                   <div className="p-4 flex-1 flex flex-col">
                       <div className="flex justify-between items-start mb-2">
                           <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                               {course.category}
                           </span>
                           <span className="text-xs text-amber-500 font-bold">★ {course.rating}</span>
                       </div>
                       <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                       <p className="text-sm text-gray-500 mb-4">by {course.instructor}</p>
                       
                       <div className="mt-auto flex justify-between items-center border-t pt-3">
                           <span className="text-sm text-gray-600">{course.students} Siswa</span>
                           <Link to={`/student/course/${course.id}`} className="text-blue-600 font-semibold text-sm hover:underline">Detail</Link>
                       </div>
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
}
