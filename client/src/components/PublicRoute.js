import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  // Already logged in → redirect to their page
  if (user) {
    if (user.role === 'recruiter') {
      return <Navigate to="/recruiter/dashboard" />;
    }
    return <Navigate to="/jobs" />;
  }

  return children;
};

export default PublicRoute;