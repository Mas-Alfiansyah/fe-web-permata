import { mockCourses } from '../../../data/mockData';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

export default function CourseApproval() {
  const pendingCourses = mockCourses.filter(c => c.status === 'draft');

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Note: For this mock, "Draft" courses are considered pending approval.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Pending Approvals
              </h3>
          </div>
          <ul className="divide-y divide-gray-200">
              {pendingCourses.length === 0 ? (
                  <li className="px-4 py-4 text-center text-gray-500">No courses pending approval.</li>
              ) : pendingCourses.map((course) => (
                  <li key={course.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between">
                      <div>
                          <p className="text-sm font-medium text-blue-600 truncate">{course.title}</p>
                          <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                      </div>
                      <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-500" title="Review">
                              <Eye size={20} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-500" title="Approve">
                              <CheckCircle size={20} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500" title="Reject">
                              <XCircle size={20} />
                          </button>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
    </div>
  );
}
