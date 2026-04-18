const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Recruiter only routes
router.post('/', protect, authorizeRoles('recruiter', 'admin'), createJob);
router.put('/:id', protect, authorizeRoles('recruiter', 'admin'), updateJob);
router.delete('/:id', protect, authorizeRoles('recruiter', 'admin'), deleteJob);

module.exports = router;