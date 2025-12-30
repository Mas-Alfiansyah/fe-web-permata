import { ThumbsUp, MessageCircle } from 'lucide-react';

export default function Discussion() {
  const discussions = [
      { id: 1, title: 'How to use useEffect properly?', author: 'Student A', replies: 5, likes: 12, tags: ['React', 'Hooks'] },
      { id: 2, title: 'Error in installing Tailwind CSS', author: 'Student B', replies: 2, likes: 3, tags: ['CSS', 'Setup'] },
      { id: 3, title: 'Best practices for State Management', author: 'Instructor Budi', replies: 15, likes: 45, tags: ['Architecture'] },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Discussion Forum</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
              New Discussion
          </button>
      </div>

      <div className="space-y-4">
          {discussions.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                      <div>
                          <h3 className="text-lg font-bold text-gray-900 hover:text-indigo-600 mb-1">{item.title}</h3>
                          <div className="flex gap-2 mb-3">
                              {item.tags.map(tag => (
                                  <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                      #{tag}
                                  </span>
                              ))}
                          </div>
                          <p className="text-sm text-gray-500">Posted by <span className="font-medium text-gray-700">{item.author}</span></p>
                      </div>
                      <div className="flex items-center gap-4 text-gray-500">
                          <div className="flex items-center gap-1">
                              <ThumbsUp size={18} />
                              <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                              <MessageCircle size={18} />
                              <span>{item.replies}</span>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
