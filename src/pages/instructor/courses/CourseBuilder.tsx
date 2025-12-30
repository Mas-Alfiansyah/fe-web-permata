import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCourses, mockCourseContent, type Module } from '../../../data/mockData';
import { Plus, GripVertical, Video, FileText, HelpCircle, Trash2, Edit2, Save } from 'lucide-react';

export default function CourseBuilder() {
    const { courseId } = useParams();
    const course = mockCourses.find(c => c.id === courseId);
    const [modules, setModules] = useState<Module[]>(mockCourseContent[courseId!] || []);
    
    // Mock UI states
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState('');

    const handleAddModule = () => {
        if (!newModuleTitle.trim()) return;
        const newModule: Module = {
            id: `new-${Date.now()}`,
            title: newModuleTitle,
            lessons: []
        };
        setModules([...modules, newModule]);
        setNewModuleTitle('');
        setIsAddingModule(false);
    };

    const handleDeleteModule = (moduleId: string) => {
        setModules(modules.filter(m => m.id !== moduleId));
    };

    if (!course) return <div>Course not found</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <Link to="/instructor/courses" className="text-sm text-indigo-600 hover:text-indigo-800 mb-2 inline-block">
                        ← Back to My Courses
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Curriculum: {course.title}</h1>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="space-y-6">
                {modules.map((module, mIndex) => (
                    <div key={module.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center rounded-t-lg">
                            <div className="flex items-center gap-3">
                                <GripVertical className="text-gray-400 cursor-move" size={20} />
                                <h3 className="font-semibold text-gray-800">Module {mIndex + 1}: {module.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-1 text-gray-500 hover:text-indigo-600"><Edit2 size={16} /></button>
                                <button onClick={() => handleDeleteModule(module.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                            {module.lessons.length === 0 ? (
                                <p className="text-sm text-gray-400 italic text-center py-4">No specific lessons yet. Add some below!</p>
                            ) : (
                                module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-md hover:border-indigo-100 group">
                                        <div className="flex items-center gap-3">
                                            <GripVertical className="text-gray-300 group-hover:text-gray-400" size={16} />
                                            {lesson.type === 'video' && <Video size={16} className="text-blue-500" />}
                                            {lesson.type === 'text' && <FileText size={16} className="text-green-500" />}
                                            {lesson.type === 'quiz' && <HelpCircle size={16} className="text-amber-500" />}
                                            <span className="text-sm text-gray-700">{lesson.title}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {lesson.duration && <span className="text-xs text-gray-400">{lesson.duration}</span>}
                                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                                    <Video size={16} /> Add Video
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-colors">
                                    <FileText size={16} /> Add Text
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                                    <HelpCircle size={16} /> Add Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Module Section */}
                {isAddingModule ? (
                    <div className="bg-gray-50 border border-indigo-200 rounded-lg p-4 animate-in fade-in slide-in-from-top-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Module Title</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={newModuleTitle}
                                onChange={(e) => setNewModuleTitle(e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                placeholder="e.g., Advanced Hooks Patterns"
                                autoFocus
                            />
                            <button 
                                onClick={handleAddModule}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
                            >
                                Add
                            </button>
                            <button 
                                onClick={() => setIsAddingModule(false)}
                                className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsAddingModule(true)}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        <span className="font-medium">Add New Module</span>
                    </button>
                )}
            </div>
        </div>
    );
}
