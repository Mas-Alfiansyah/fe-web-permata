import { mockUsers } from '../../../data/mockData';
import DataTable from '../../../components/common/DataTable';
import clsx from 'clsx';

export default function Students() {
  const students = mockUsers.filter(u => u.role === 'student');

  return (
    <div className="space-y-6">
      <DataTable 
        title="Data Peserta"
        data={students}
        columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Join Date', accessor: 'joinDate' },
            { 
                header: 'Status', 
                accessor: (user) => (
                    <span className={clsx(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        user.status === 'active' ? "bg-green-100 text-green-800" : 
                        user.status === 'suspended' ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    )}>
                        {user.status}
                    </span>
                ) 
            }
        ]}
        onEdit={(user) => console.log('Edit', user)}
        onDelete={(user) => console.log('Delete', user)}
        onView={(user) => console.log('View', user)}
      />
    </div>
  );
}
