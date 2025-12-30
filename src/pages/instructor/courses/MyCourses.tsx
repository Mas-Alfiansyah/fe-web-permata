import { mockCourses } from '../../../data/mockData';
import DataTable from '../../../components/common/DataTable';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function MyCourses() {
    const navigate = useNavigate();
    // In a real app, verify user ID matches instructor
    const myCourses = mockCourses.filter(c => c.instructor.includes('Instructor') || c.instructor.includes('Budi') || c.instructor.includes('Siti')); 

  return (
    <div className="space-y-6">
      <DataTable 
        title="Course Saya"
        data={myCourses}
        columns={[
            { header: 'Title', accessor: 'title' },
            { header: 'Category', accessor: 'category' },
            { 
                header: 'Status', 
                accessor: (course) => (
                    <span className={clsx(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        course.status === 'published' ? "bg-green-100 text-green-800" : 
                        course.status === 'draft' ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                    )}>
                        {course.status}
                    </span>
                ) 
            },
            { header: 'Students', accessor: 'students' },
            { header: 'Rating', accessor: 'rating' },
        ]}
        onEdit={(course) => navigate(`/instructor/courses/${course.id}/edit`)}
        onView={(course) => console.log('View', course)}
      />
    </div>
  );
}
