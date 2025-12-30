import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, MapPin, Camera } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-600"></div>
        <div className="px-6 pb-6">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-bold">
                        {user?.name?.charAt(0)}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow border border-gray-200 text-gray-600 hover:text-indigo-600">
                        <Camera size={16} />
                    </button>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                    Edit Profile
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Contact Information</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Mail size={18} />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Phone size={18} />
                            <span>+62 812 3456 7890</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPin size={18} />
                            <span>Jakarta, Indonesia</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Account Settings</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-1">
                            <span className="text-gray-600">Language</span>
                            <span className="font-medium text-gray-900">Bahasa Indonesia</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="text-gray-600">Timezone</span>
                            <span className="font-medium text-gray-900">WIB (GMT+7)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
