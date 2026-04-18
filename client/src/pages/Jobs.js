import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Jobs = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [applying, setApplying] = useState(null);
  const [message, setMessage] = useState('');

  const fetchJobs = useCallback(async (searchVal, locationVal, jobTypeVal) => {
    try {
      setLoading(true);
      const res = await API.get('/jobs', {
        params: {
          search: searchVal || '',
          location: locationVal || '',
          jobType: jobTypeVal || ''
        }
      });
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs('', '', '');
  }, [fetchJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search, location, jobType);
  };

  const handleApply = async (jobId) => {
    try {
      setApplying(jobId);
      await API.post(`/applications/${jobId}`, {
        coverLetter: 'I am interested in this role',
        resume: 'my-resume.pdf'
      });
      setMessage('✅ Applied successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Failed to apply'));
      setTimeout(() => setMessage(''), 3000);
    }
    setApplying(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1
  onClick={() => navigate('/')}
  className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700"
>
  ⚡ HireFlow
</h1>
        <div className="flex items-center gap-4">
          {user?.role === 'candidate' && (
            <button
              onClick={() => navigate('/my-applications')}
              className="text-blue-600 hover:underline font-medium"
            >
              My Applications
            </button>
          )}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <span className="text-gray-700 font-medium">👤 {user?.name}</span>
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6">

        {/* Success/Error Message */}
        {message && (
          <div className={`p-3 rounded mb-4 text-center font-medium ${message.includes('✅')
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
            }`}>
            {message}
          </div>
        )}

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search jobs, skills, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
                <option value="contract">Contract</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Jobs List */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {jobs.length} Jobs Found
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No jobs found
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                    <div className="flex gap-3 mt-2 text-sm text-gray-500">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.jobType}</span>
                      <span>🎓 {job.experience}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold">
                      ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
                    </p>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                      {job.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mt-3">{job.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-400 text-sm">
                    Posted by {job.postedBy?.name}
                  </span>
                  {user?.role === 'candidate' && (
                    <button
                      onClick={() => handleApply(job._id)}
                      disabled={applying === job._id}
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {applying === job._id ? 'Applying...' : 'Apply Now'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;