import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 divide-y divide-gray-100">
          <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                      <input type="text" defaultValue="Permata Learning Platform" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                      <input type="email" defaultValue="support@permata.com" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2" />
                  </div>
              </div>
          </div>

          <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Registration & Access</h2>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="font-medium text-gray-900">Allow Student Registration</p>
                          <p className="text-sm text-gray-500">Publicly allow new students to sign up</p>
                      </div>
                      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle1" checked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-indigo-600 right-0"/>
                          <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer"></label>
                      </div>
                  </div>
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="font-medium text-gray-900">Instructor Approval Required</p>
                          <p className="text-sm text-gray-500">New instructors must be approved by admin</p>
                      </div>
                       <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle2" checked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-indigo-600 right-0"/>
                          <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer"></label>
                      </div>
                  </div>
              </div>
          </div>

           <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Notification Settings</h2>
              <div className="space-y-3">
                  {['Email on New User', 'Email on New Course', 'Weekly Report'].map((item) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                          <span className="text-gray-700">{item}</span>
                      </label>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
