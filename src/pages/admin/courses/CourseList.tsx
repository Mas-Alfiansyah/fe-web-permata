import { mockCourses } from '../../../data/mockData';
import DataTable from '../../../components/common/DataTable';
import clsx from 'clsx';

export default function CourseList() {
  return (
    <div className="space-y-6">
      <DataTable 
        title="Semua Course"
        data={mockCourses}
        columns={[
            { header: 'Title', accessor: 'title' },
            { header: 'Instructor', accessor: 'instructor' },
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
        ]}
        onEdit={(course) => console.log('Edit', course)}
        onDelete={(course) => console.log('Delete', course)}
        onView={(course) => console.log('View', course)}
      />
    </div>
  );
}
