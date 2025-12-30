import DataTable from '../../../components/common/DataTable';

const categories = [
    { id: '1', name: 'Programming', slug: 'programming', count: 12 },
    { id: '2', name: 'Design', slug: 'design', count: 5 },
    { id: '3', name: 'Marketing', slug: 'marketing', count: 3 },
    { id: '4', name: 'Data Science', slug: 'data-science', count: 8 },
];

export default function CourseCategories() {
  return (
    <div className="space-y-6">
      <DataTable 
        title="Kategori Course"
        data={categories}
        columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Slug', accessor: 'slug' },
            { header: 'Total Courses', accessor: 'count' },
        ]}
        onEdit={(cat) => console.log('Edit', cat)}
        onDelete={(cat) => console.log('Delete', cat)}
      />
    </div>
  );
}
