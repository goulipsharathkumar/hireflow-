import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api';

const JobApplicants = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchApplicants = useCallback(async () => {
    try {
      setLoading(true);
      const [jobRes, appRes] = await Promise.all([
        API.get(`/jobs/${jobId}`),
        API.get(`/applications/job/${jobId}`)
      ]);
      setJob(jobRes.data);
      setApplications(appRes.data.applications);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [jobId]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await API.put(`/applications/${appId}/status`, { status: newStatus });
      setMessage('✅ Status updated successfully!');
      fetchApplicants();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to update status');
      setTimeout(() => setMessage(''), 3000);
    }
  };

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
        <h1 onClick={() => navigate('/recruiter/dashboard')} className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700">⚡ HireFlow</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            className="text-blue-600 hover:underline"
          >
            ← Back to Dashboard
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

      <div className="max-w-5xl mx-auto p-6">

        {/* Message */}
        {message && (
          <div className={`p-3 rounded mb-4 text-center font-medium ${
            message.includes('✅')
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}>
            {message}
          </div>
        )}

        {/* Job Info */}
        {job && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-blue-600 font-medium">{job.company}</p>
            <div className="flex gap-3 mt-2 text-sm text-gray-500">
              <span>📍 {job.location}</span>
              <span>💼 {job.jobType}</span>
              <span>🎓 {job.experience}</span>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {['applied', 'screening', 'interview', 'offer', 'rejected'].map((status) => (
            <div key={status} className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {applications.filter((a) => a.status === status).length}
              </p>
              <p className="text-gray-500 text-xs capitalize">{status}</p>
            </div>
          ))}
        </div>

        {/* Applicants */}
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {applications.length} Applicants
        </h3>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No applicants yet for this job
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
                    <h4 className="text-lg font-bold text-gray-800">
                      {app.applicant?.name}
                    </h4>
                    <p className="text-gray-500">{app.applicant?.email}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                    {app.coverLetter && (
                      <p className="text-gray-600 mt-2 text-sm">
                        💬 {app.coverLetter}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* ATS Pipeline - Update Status */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    Update Status:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['applied', 'screening', 'interview', 'offer', 'rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(app._id, status)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${
                          app.status === status
                            ? getStatusColor(status) + ' border-transparent font-medium'
                            : 'border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
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

export default JobApplicants;