import { useParams, Link } from 'react-router-dom';
import { mockCourses, mockCourseContent } from '../../data/mockData';
import { PlayCircle, CheckCircle, ChevronLeft, FileText } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function LearningPlayer() {
  const { courseId } = useParams();
  const course = mockCourses.find(c => c.id === courseId);
  const content = mockCourseContent['1']; // Mock content
  
  const [activeLessonId, setActiveLessonId] = useState('l1');

  if (!course) return <div>Course not found</div>;

  const activeLesson = content.flatMap((m) => m.lessons).find((l) => l.id === activeLessonId);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Bar */}
      <header className="bg-slate-900 text-white px-4 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
              <Link to="/student/dashboard" className="p-2 hover:bg-slate-800 rounded-full">
                  <ChevronLeft size={20} />
              </Link>
              <div>
                  <h1 className="text-sm font-bold md:text-base line-clamp-1">{course.title}</h1>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                       <span className="w-20 bg-slate-700 rounded-full h-1.5 overflow-hidden block">
                           <span className="bg-green-500 h-full block" style={{ width: '45%' }}></span>
                       </span>
                       45% Completed
                  </div>
              </div>
          </div>
          <button className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded font-medium">
              Mark Complete
          </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
          {/* Main Content (Player) */}
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8 flex flex-col">
              <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                  {activeLesson?.type === 'video' ? (
                      <div className="text-white text-center">
                          <PlayCircle size={64} className="mx-auto mb-4 opacity-50" />
                          <p>Video Player Placeholder</p>
                          <p className="text-sm text-gray-400">{activeLesson.title}</p>
                      </div>
                  ) : (
                       <div className="bg-white w-full h-full p-8 text-left text-gray-900 overflow-y-auto">
                           <h2 className="text-2xl font-bold mb-4">{activeLesson?.title}</h2>
                           <p>Text content placeholder...</p>
                       </div>
                  )}
              </div>
              
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex gap-6 border-b border-gray-200 pb-2 mb-4">
                      <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">Overview</button>
                      <button className="text-gray-500 hover:text-gray-700 pb-2 font-medium">Q&A</button>
                      <button className="text-gray-500 hover:text-gray-700 pb-2 font-medium">Notes</button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{activeLesson?.title}</h2>
                  <p className="text-gray-600">
                      Lesson description goes here. This is a placeholder for the lesson details.
                  </p>
              </div>
          </main>

          {/* Sidebar (Curriculum) */}
          <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto shrink-0 hidden md:block">
              <div className="p-4 font-bold text-gray-900 border-b border-gray-200">
                  Course Content
              </div>
              <div>
                  {content?.map((module, idx) => (
                      <div key={module.id} className="border-b border-gray-100">
                          <button className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center text-sm font-semibold text-gray-700">
                              <span>Section {idx + 1}: {module.title}</span>
                          </button>
                          <div>
                              {module.lessons.map((lesson) => (
                                  <button 
                                    key={lesson.id} 
                                    onClick={() => setActiveLessonId(lesson.id)}
                                    className={clsx(
                                        "w-full px-4 py-3 flex text-left gap-3 hover:bg-gray-50 transition-colors border-l-4",
                                        activeLessonId === lesson.id ? "bg-blue-50 border-blue-600" : "border-transparent"
                                    )}
                                  >
                                      <div className="pt-0.5">
                                        {lesson.completed ? (
                                            <CheckCircle size={16} className="text-green-500" />
                                        ) : lesson.type === 'video' ? (
                                            <PlayCircle size={16} className={activeLessonId === lesson.id ? "text-blue-600" : "text-gray-400"} />
                                        ) : (
                                            <FileText size={16} className={activeLessonId === lesson.id ? "text-blue-600" : "text-gray-400"} />
                                        )}
                                      </div>
                                      <div>
                                          <p className={clsx("text-sm", activeLessonId === lesson.id ? "font-medium text-blue-900" : "text-gray-600")}>
                                              {lesson.title}
                                          </p>
                                          <p className="text-xs text-gray-400 mt-0.5">{lesson.duration}</p>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </aside>
      </div>
    </div>
  );
}
