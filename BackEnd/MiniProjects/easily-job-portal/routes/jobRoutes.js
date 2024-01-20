// routes/jobRoutes.js
const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

// Display all jobs
router.get('/', jobController.getAllJobs);

// Display job details
router.get('/:id', jobController.getJobById);

// Render form to create a new job
router.get('/create', jobController.renderCreateJob);

// Handle job creation
router.post('/create', jobController.createJob);

// Render form to update a job
router.get('/:id/update', jobController.renderUpdateJob);

// Handle job update
router.post('/:id/update', jobController.updateJob);

// Render form to delete a job
router.get('/:id/delete', jobController.renderDeleteJob);

// Handle job deletion
router.post('/:id/delete', jobController.deleteJob);

// Display applicants for a job
router.get('/:id/applicants', jobController.getApplicants);

// Handle applicant addition
router.post('/:id/applicants', jobController.addApplicant);

module.exports = router;
