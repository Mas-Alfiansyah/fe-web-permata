import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
        if (user.role === 'super_admin') navigate('/admin/dashboard');
        else if (user.role === 'instructor') navigate('/instructor/dashboard');
        else if (user.role === 'student') navigate('/student/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <div className="mt-8 space-y-6">
        <div className="flex flex-col gap-4">
           {/* Mock Login Buttons */}
           <button 
             onClick={() => login('super_admin')}
             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
           >
             Login as Super Admin
           </button>
           <button 
             onClick={() => login('instructor')}
             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
           >
             Login as Instructor
           </button>
           <button 
             onClick={() => login('student')}
             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
           >
             Login as Student
           </button>
        </div>
        
        <div className="text-sm text-center">
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
