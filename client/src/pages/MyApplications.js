import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const MyApplications = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await API.get('/applications/my');
      setApplications(res.data.applications);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-600';
      case 'screening': return 'bg-yellow-100 text-yellow-600';
      case 'interview': return 'bg-purple-100 text-purple-600';
      case 'offer': return 'bg-green-100 text-green-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 onClick={() => navigate('/jobs')} className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700">⚡ HireFlow</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/jobs')}
            className="text-blue-600 hover:underline"
          >
            Browse Jobs
          </button>
          <span className="text-gray-600">👤 {user?.name}</span>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          My Applications
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {['applied', 'interview', 'offer', 'rejected'].map((status) => (
            <div key={status} className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {applications.filter((a) => a.status === status).length}
              </p>
              <p className="text-gray-600 capitalize text-sm">{status}</p>
            </div>
          ))}
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No applications yet.{' '}
            <button
              onClick={() => navigate('/jobs')}
              className="text-blue-600 hover:underline"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {app.job?.title}
                    </h3>
                    <p className="text-blue-600">{app.job?.company}</p>
                    <div className="flex gap-3 mt-2 text-sm text-gray-500">
                      <span>📍 {app.job?.location}</span>
                      <span>💼 {app.job?.jobType}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Applied on:{' '}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>

                {/* ATS Pipeline */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Applied</span>
                    <span>Screening</span>
                    <span>Interview</span>
                    <span>Offer</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width:
                          app.status === 'applied' ? '25%' :
                          app.status === 'screening' ? '50%' :
                          app.status === 'interview' ? '75%' :
                          app.status === 'offer' ? '100%' : '25%'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;