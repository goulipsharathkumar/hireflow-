import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600">⚡ HireFlow</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-8 text-center">
        <h2 className="text-5xl font-bold mb-4 leading-tight">
          Find Your Dream Job or <br /> Hire Top Talent
        </h2>
        <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
          HireFlow connects the best candidates with top companies.
          Simple, fast, and powerful recruitment platform.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/register?role=candidate')}
            className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-lg"
          >
            🔍 Find Jobs — I'm a Candidate
          </button>
          <button
            onClick={() => navigate('/register?role=recruiter')}
            className="bg-indigo-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-400 transition shadow-lg border-2 border-white"
          >
            📝 Post Jobs — I'm a Recruiter
          </button>
        </div>
        <p className="text-blue-200 mt-6 text-sm">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-white underline font-medium"
          >
            Login here
          </button>
        </p>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-600">500+</p>
            <p className="text-gray-500 mt-1">Jobs Posted</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">1000+</p>
            <p className="text-gray-500 mt-1">Candidates</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">200+</p>
            <p className="text-gray-500 mt-1">Companies</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 px-8 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Why Choose HireFlow?
        </h3>
        <p className="text-center text-gray-500 mb-12">
          Everything you need to hire or get hired
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Smart Job Matching',
              desc: 'Find jobs that perfectly match your skills, experience, and location preferences.'
            },
            {
              icon: '📊',
              title: 'ATS Pipeline',
              desc: 'Track every application from Applied → Screening → Interview → Offer in real time.'
            },
            {
              icon: '⚡',
              title: 'Fast & Easy',
              desc: 'Apply to jobs in one click. Recruiters can post jobs and manage applicants instantly.'
            },
            {
              icon: '🔒',
              title: 'Secure & Safe',
              desc: 'JWT authentication and role-based access keeps your data safe and private.'
            },
            {
              icon: '📱',
              title: 'Mobile Friendly',
              desc: 'Access HireFlow from any device — desktop, tablet, or mobile.'
            },
            {
              icon: '🌍',
              title: 'All Job Types',
              desc: 'Full-time, part-time, remote, internship, and contract jobs all in one place.'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16 px-8">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">

          {/* Candidate */}
          <div className="bg-white rounded-xl shadow p-8">
            <h4 className="text-xl font-bold text-blue-600 mb-6">
              👤 For Candidates
            </h4>
            <div className="flex flex-col gap-5">
              {[
                { step: '1', title: 'Create Account', desc: 'Register as a candidate for free' },
                { step: '2', title: 'Browse Jobs', desc: 'Search and filter thousands of jobs' },
                { step: '3', title: 'Apply Instantly', desc: 'Apply with one click' },
                { step: '4', title: 'Track Progress', desc: 'Follow your application status live' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/register?role=candidate')}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Get Started as Candidate →
            </button>
          </div>

          {/* Recruiter */}
          <div className="bg-white rounded-xl shadow p-8">
            <h4 className="text-xl font-bold text-indigo-600 mb-6">
              🏢 For Recruiters
            </h4>
            <div className="flex flex-col gap-5">
              {[
                { step: '1', title: 'Create Account', desc: 'Register as a recruiter for free' },
                { step: '2', title: 'Post Jobs', desc: 'Post job openings in minutes' },
                { step: '3', title: 'Review Applicants', desc: 'See all candidates in one place' },
                { step: '4', title: 'Manage Pipeline', desc: 'Move candidates through hiring stages' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/register?role=recruiter')}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              Get Started as Recruiter →
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 px-8 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h3>
        <p className="text-blue-100 mb-8 text-lg">
          Join thousands of candidates and recruiters on HireFlow
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Create Free Account
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 py-8 px-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p className="text-white font-bold text-lg">⚡ HireFlow</p>
          <p className="text-gray-400 text-sm">
            © 2026 HireFlow. Built with MERN Stack
          </p>
          <div className="flex gap-4 text-gray-400 text-sm">
            <button
              onClick={() => navigate('/login')}
              className="hover:text-white"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="hover:text-white"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;