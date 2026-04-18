import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const RecruiterDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showPostJob, setShowPostJob] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        jobType: 'full-time',
        description: '',
        requirements: '',
        skills: '',
        experience: 'fresher',
        salaryMin: '',
        salaryMax: ''
    });

    const fetchMyJobs = useCallback(async () => {
        try {
            setLoading(true);
            const res = await API.get('/jobs');
            const myJobs = res.data.jobs.filter(
                (job) => job.postedBy._id === user?.id
            );
            setJobs(myJobs);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchMyJobs();
    }, [fetchMyJobs]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            await API.post('/jobs', {
                title: formData.title,
                company: formData.company,
                location: formData.location,
                jobType: formData.jobType,
                description: formData.description,
                requirements: formData.requirements.split(',').map((r) => r.trim()),
                skills: formData.skills.split(',').map((s) => s.trim()),
                experience: formData.experience,
                salary: {
                    min: Number(formData.salaryMin),
                    max: Number(formData.salaryMax)
                }
            });
            setMessage('✅ Job posted successfully!');
            setShowPostJob(false);
            setFormData({
                title: '', company: '', location: '',
                jobType: 'full-time', description: '',
                requirements: '', skills: '',
                experience: 'fresher', salaryMin: '', salaryMax: ''
            });
            fetchMyJobs();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('❌ ' + (err.response?.data?.message || 'Failed to post job'));
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await API.delete(`/jobs/${jobId}`);
            setMessage('✅ Job deleted successfully!');
            fetchMyJobs();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('❌ Failed to delete job');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
                <h1 onClick={() => navigate('/recruiter/dashboard')} className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700">⚡ HireFlow</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">👤 {user?.name}</span>
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
                        {user?.role}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto p-6">

                {/* Message */}
                {message && (
                    <div className={`p-3 rounded mb-4 text-center font-medium ${message.includes('✅')
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                        {message}
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Recruiter Dashboard
                    </h2>
                    <button
                        onClick={() => setShowPostJob(!showPostJob)}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        {showPostJob ? 'Cancel' : '+ Post New Job'}
                    </button>
                </div>

                {/* Post Job Form */}
                {showPostJob && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Post a New Job
                        </h3>
                        <form onSubmit={handlePostJob}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Job Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. Frontend Developer"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. TechCorp India"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. Bengaluru"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Job Type</label>
                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="full-time">Full Time</option>
                                        <option value="part-time">Part Time</option>
                                        <option value="internship">Internship</option>
                                        <option value="remote">Remote</option>
                                        <option value="contract">Contract</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Experience</label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="fresher">Fresher</option>
                                        <option value="1-2 years">1-2 years</option>
                                        <option value="2-5 years">2-5 years</option>
                                        <option value="5+ years">5+ years</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">
                                        Salary Min (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="salaryMin"
                                        value={formData.salaryMin}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. 300000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">
                                        Salary Max (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="salaryMax"
                                        value={formData.salaryMax}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. 600000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">
                                        Skills (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. React.js, Node.js, MongoDB"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-1">
                                        Requirements (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="requirements"
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. React.js, CSS, Git"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-1">
                                        Job Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Describe the job role..."
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700"
                            >
                                Post Job
                            </button>
                        </form>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
                        <p className="text-gray-600">Total Jobs Posted</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-3xl font-bold text-green-600">
                            {jobs.filter((j) => j.status === 'open').length}
                        </p>
                        <p className="text-gray-600">Open Jobs</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-3xl font-bold text-red-500">
                            {jobs.filter((j) => j.status === 'closed').length}
                        </p>
                        <p className="text-gray-600">Closed Jobs</p>
                    </div>
                </div>

                {/* My Jobs List */}
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    My Posted Jobs
                </h3>

                {loading ? (
                    <div className="text-center text-gray-500 py-10">Loading...</div>
                ) : jobs.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No jobs posted yet. Click "Post New Job" to get started!
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-lg shadow p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800">
                                            {job.title}
                                        </h4>
                                        <p className="text-blue-600">{job.company}</p>
                                        <div className="flex gap-3 mt-2 text-sm text-gray-500">
                                            <span>📍 {job.location}</span>
                                            <span>💼 {job.jobType}</span>
                                            <span>🎓 {job.experience}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {job.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className={`px-2 py-1 rounded text-sm ${job.status === 'open'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}>
                                            {job.status}
                                        </span>
                                        <button
                                            onClick={() => navigate(`/recruiter/job/${job._id}`)}
                                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                                        >
                                            View Applicants
                                        </button>
                                        <button
                                            onClick={() => handleDeleteJob(job._id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                                        >
                                            Delete Job
                                        </button>
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

export default RecruiterDashboard;