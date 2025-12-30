export default function AdminReports() {

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Student Enrollment Growth</h2>
              {/* Mock Chart - Recharts is not installed, using CSS placeholder if needed, but assuming standard Recharts usage if available. 
                  Since I can't install packages, I will use a simple CSS bar chart to be safe and dependency-free.
              */}
              <div className="h-64 flex items-end gap-2 justify-between px-4 pb-4 border-b border-l border-gray-300">
                  {[40, 60, 35, 80, 50, 70, 90].map((h, i) => (
                      <div key={i} className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors relative group" style={{ height: `${h}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {h * 10} Students
                          </div>
                      </div>
                  ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Course Category Distribution</h2>
              <div className="space-y-4">
                  {[
                      { label: 'Programming', value: 45, color: 'bg-indigo-500' },
                      { label: 'Design', value: 25, color: 'bg-pink-500' },
                      { label: 'Marketing', value: 20, color: 'bg-amber-500' },
                      { label: 'Business', value: 10, color: 'bg-green-500' },
                  ].map((item) => (
                      <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">{item.label}</span>
                              <span className="font-medium">{item.value}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

       <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-100">
               <h2 className="text-lg font-bold">Top Performing Instructors</h2>
           </div>
           <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                   <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                   </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                   {[1, 2, 3].map((i) => (
                       <tr key={i}>
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Instructor Name {i}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{5 + i}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{100 * i + 50}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.{8 + i % 2}</td>
                       </tr>
                   ))}
               </tbody>
           </table>
       </div>
    </div>
  );
}
