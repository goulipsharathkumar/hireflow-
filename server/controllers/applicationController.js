const Application = require('../models/Application');
const Job = require('../models/Job');

// @POST /api/applications/:jobId - Candidate applies for job
const applyJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const jobId = req.params.jobId;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job is open
    if (job.status === 'closed') {
      return res.status(400).json({ message: 'This job is closed' });
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You already applied for this job' });
    }

    // Check if resume uploaded
    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume: req.body.resume || 'resume-placeholder.pdf',
      coverLetter
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/applications/my - Candidate sees their applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company location jobType status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: applications.length,
      applications
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/applications/job/:jobId - Recruiter sees all applicants for a job
const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if this recruiter owns the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: applications.length,
      applications
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @PUT /api/applications/:id/status - Recruiter updates application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if this recruiter owns the job
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: 'Application status updated',
      application
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus
};