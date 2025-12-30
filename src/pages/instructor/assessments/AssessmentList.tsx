import { useState } from 'react';
import { mockAssessments, mockCourses } from '../../../data/mockData';
import DataTable from '../../../components/common/DataTable';
import { Plus, FileText, CheckSquare } from 'lucide-react';

export default function AssessmentList() {
  const [filter, setFilter] = useState<'all' | 'quiz' | 'assignment'>('all');

  const filteredData = mockAssessments.filter(a => filter === 'all' ? true : a.type === filter);
  const dataWithCourseName = filteredData.map(a => ({
      ...a,
      courseName: mockCourses.find(c => c.id === a.courseId)?.title || 'Unknown Course'
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              <Plus size={20} /> Create New
          </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 pb-1">
          <button 
            onClick={() => setFilter('all')}
            className={`pb-2 px-1 font-medium text-sm ${filter === 'all' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
              All
          </button>
          <button 
            onClick={() => setFilter('quiz')}
            className={`pb-2 px-1 font-medium text-sm ${filter === 'quiz' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
              Quizzes
          </button>
          <button 
            onClick={() => setFilter('assignment')}
            className={`pb-2 px-1 font-medium text-sm ${filter === 'assignment' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
              Assignments
          </button>
      </div>

      <DataTable 
        title="Assessment List"
        data={dataWithCourseName}
        columns={[
            { 
                header: 'Title', 
                accessor: (item) => (
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.type === 'quiz' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                            {item.type === 'quiz' ? <CheckSquare size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.courseName}</div>
                        </div>
                    </div>
                )
            },
            { header: 'Type', accessor: (item) => <span className="capitalize">{item.type}</span> },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Submissions', accessor: (item) => `${item.submissions} Students` },
            { 
                header: 'Status', 
                accessor: (item) => (
                    <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {item.status}
                    </span>
                ) 
            },
        ]}
        onEdit={(item) => console.log(item)}
        onView={(item) => console.log(item)}
      />
    </div>
  );
}
