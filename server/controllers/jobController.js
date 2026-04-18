const Job = require('../models/Job');

// @POST /api/jobs - Create Job (Recruiter only)
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType,
      description,
      requirements,
      salary,
      skills,
      experience
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      description,
      requirements,
      salary,
      skills,
      experience,
      postedBy: req.user.id
    });

    res.status(201).json({
      message: 'Job created successfully',
      job
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/jobs - Get All Jobs (Public)
const getAllJobs = async (req, res) => {
  try {
    const { location, jobType, experience, search } = req.query;

    let filter = { status: 'open' };

    if (location) filter.location = { $regex: location, $options: 'i' };
    if (jobType) filter.jobType = jobType;
    if (experience) filter.experience = experience;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/jobs/:id - Get Single Job (Public)
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @PUT /api/jobs/:id - Update Job (Recruiter only)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if this recruiter owns the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: 'Job updated successfully',
      job: updatedJob
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @DELETE /api/jobs/:id - Delete Job (Recruiter only)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if this recruiter owns the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Job deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };