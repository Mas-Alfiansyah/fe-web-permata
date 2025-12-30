import { mockCourses } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function StudentMyCourses() {
  // Mock enrolled courses (same as dashboard for now)
  const enrolledCourses = mockCourses.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Course Saya</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 flex flex-col">
                  <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                      Thumbnail
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                            {course.category}
                        </div>
                        <span className="text-xs text-gray-500">Last accessed 2d ago</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{course.title}</h3>
                      
                      <div className="mt-auto">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-gray-900">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        
                        <Link to={`/student/learning/${course.id}`} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                            Lanjut Belajar
                        </Link>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
