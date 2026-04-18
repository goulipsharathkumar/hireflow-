import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const Register = () => {
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: roleFromUrl || 'candidate'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/register', formData);
      login(res.data.user, res.data.token);
      if (res.data.user.role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/jobs');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const isRecruiter = formData.role === 'recruiter';

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isRecruiter
        ? 'bg-gradient-to-br from-indigo-600 to-purple-700'
        : 'bg-gradient-to-br from-blue-600 to-indigo-700'
    }`}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">⚡ HireFlow</h1>
          <div className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${
            isRecruiter
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {isRecruiter ? '🏢 Recruiter Account' : '👤 Candidate Account'}
          </div>
        </div>

        {/* Only show toggle if no role from URL */}
        {!roleFromUrl && (
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setFormData({ ...formData, role: 'candidate' })}
              className={`flex-1 py-2 rounded-lg font-medium transition text-sm ${
                !isRecruiter
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              👤 Candidate
            </button>
            <button
              onClick={() => setFormData({ ...formData, role: 'recruiter' })}
              className={`flex-1 py-2 rounded-lg font-medium transition text-sm ${
                isRecruiter
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🏢 Recruiter
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Role Info Box */}
          <div className={`rounded-lg p-3 mb-6 text-sm ${
            isRecruiter
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {isRecruiter
              ? '🏢 As a Recruiter you can post jobs and manage applicants'
              : '👤 As a Candidate you can browse jobs and track applications'}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-bold transition ${
              isRecruiter
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading
              ? 'Creating Account...'
              : `Create ${isRecruiter ? 'Recruiter' : 'Candidate'} Account`}
          </button>
        </form>

        {/* Switch role link */}
        <p className="text-center text-gray-500 mt-3 text-sm">
          {isRecruiter ? (
            <>
              Looking for a job instead?{' '}
              <button
                onClick={() => navigate('/register?role=candidate')}
                className="text-blue-600 font-medium hover:underline"
              >
                Register as Candidate
              </button>
            </>
          ) : (
            <>
              Want to hire instead?{' '}
              <button
                onClick={() => navigate('/register?role=recruiter')}
                className="text-indigo-600 font-medium hover:underline"
              >
                Register as Recruiter
              </button>
            </>
          )}
        </p>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;