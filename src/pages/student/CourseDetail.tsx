import { useParams, Link } from 'react-router-dom';
import { mockCourses, mockCourseContent } from '../../data/mockData';
import { PlayCircle, Clock, CheckCircle, Star } from 'lucide-react';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = mockCourses.find(c => c.id === courseId);
  const content = mockCourseContent['1']; // Mock content, using ID 1 for all

  if (!course) return <div>Course not found</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
            <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{course.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            <p className="text-slate-300">
                Master the fundamentals and advanced concepts. Created by <span className="text-white font-semibold">{course.instructor}</span>.
            </p>
            <div className="flex gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400" /> {course.rating} Rating</span>
                <span className="flex items-center gap-1"><Clock size={16} /> 20h Total Duration</span>
                <span>{course.students} Students Enrolled</span>
            </div>
            <div className="pt-4 flex gap-3">
                <button className="bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
                    Enroll Now
                </button>
                <Link to={`/student/learning/${course.id}`} className="border border-slate-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                    Preview Course
                </Link>
            </div>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
            <PlayCircle size={64} className="text-slate-600" />
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {content?.map((module, idx) => (
                      <div key={module.id} className="bg-white">
                          <button className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 text-left">
                              <span className="font-semibold text-gray-900">Module {idx + 1}: {module.title}</span>
                              <span className="text-sm text-gray-500">{module.lessons.length} Lessons</span>
                          </button>
                          <div className="bg-gray-50 px-6 py-2 space-y-2">
                              {module.lessons.map((lesson) => (
                                  <div key={lesson.id} className="flex items-center gap-3 text-sm py-2 text-gray-600">
                                      {lesson.type === 'video' ? <PlayCircle size={16} /> : <CheckCircle size={16} />}
                                      <span>{lesson.title}</span>
                                      <span className="ml-auto text-xs text-gray-400">{lesson.duration}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          
          <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">What you'll learn</h3>
                  <ul className="space-y-3">
                      {['Build powerful apps', 'Understand Core Concepts', 'Best Practices', 'Deploy to Production'].map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-600">
                              <CheckCircle size={16} className="text-green-500 shrink-0" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
}
