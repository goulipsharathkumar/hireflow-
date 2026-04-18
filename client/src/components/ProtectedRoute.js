import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Wrong role → go back
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'recruiter') {
      return <Navigate to="/recruiter/dashboard" />;
    }
    return <Navigate to="/jobs" />;
  }

  return children;
};

export default ProtectedRoute;