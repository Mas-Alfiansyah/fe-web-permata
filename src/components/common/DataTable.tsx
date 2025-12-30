import { Edit2, Trash2, Eye } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

export default function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  title,
  onEdit,
  onDelete,
  onView
}: DataTableProps<T>) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 white-space-nowrap text-sm text-gray-900">
                     {typeof col.accessor === 'function' 
                        ? col.accessor(item) 
                        : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                <td className="px-6 py-4 white-space-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {onView && (
                        <button onClick={() => onView(item)} className="text-gray-400 hover:text-gray-600">
                            <Eye size={18} />
                        </button>
                    )}
                    {onEdit && (
                        <button onClick={() => onEdit(item)} className="text-indigo-600 hover:text-indigo-900">
                            <Edit2 size={18} />
                        </button>
                    )}
                    {onDelete && (
                        <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                        </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
