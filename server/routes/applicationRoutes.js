const express = require('express');
const router = express.Router();
const {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Candidate routes
router.post(
  '/:jobId',
  protect,
  authorizeRoles('candidate'),
  upload.single('resume'),
  applyJob
);
router.get('/my', protect, authorizeRoles('candidate'), getMyApplications);

// Recruiter routes
router.get(
  '/job/:jobId',
  protect,
  authorizeRoles('recruiter', 'admin'),
  getJobApplications
);
router.put(
  '/:id/status',
  protect,
  authorizeRoles('recruiter', 'admin'),
  updateApplicationStatus
);

module.exports = router;