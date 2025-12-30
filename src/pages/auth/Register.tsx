import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <div className="mt-8 space-y-6">
        <p>Register Form Placeholder</p>
        <div>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
