const Job = require('../models/jobModel');

exports.getAllJobs = (req, res) => {
  const jobs = Job.getAllJobs();
  res.render('jobs/index', { jobs });
};

exports.getJobById = (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = Job.getJobById(jobId);

  if (job) {
    res.render('jobs/details', { job });
  } else {
    res.status(404).render('errors/404');
  }
};

exports.renderCreateJob = (req, res) => {
  res.render('jobs/create');
};

exports.createJob = (req, res) => {
  const jobData = req.body;
  const newJob = Job.createJob(jobData);
  res.redirect(`/jobs/${newJob.id}`);
};

exports.renderUpdateJob = (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = Job.getJobById(jobId);

  if (job) {
    res.render('jobs/update', { job });
  } else {
    res.status(404).render('errors/404');
  }
};

exports.updateJob = (req, res) => {
  const jobId = parseInt(req.params.id);
  const updatedJobData = req.body;

  const updatedJob = Job.updateJob(jobId, updatedJobData);

  if (updatedJob) {
    res.redirect(`/jobs/${jobId}`);
  } else {
    res.status(404).render('errors/404');
  }
};

exports.renderDeleteJob = (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = Job.getJobById(jobId);

  if (job) {
    res.render('jobs/delete', { job });
  } else {
    res.status(404).render('errors/404');
  }
};

exports.deleteJob = (req, res) => {
  const jobId = parseInt(req.params.id);
  const deletedJob = Job.deleteJob(jobId);

  if (deletedJob) {
    res.redirect('/jobs');
  } else {
    res.status(404).render('errors/404');
  }
};

exports.getApplicants = (req, res) => {
  const jobId = parseInt(req.params.id);
  const applicants = Job.getApplicantsByJobId(jobId);

  if (applicants) {
    res.render('jobs/applicants', { applicants });
  } else {
    res.status(404).render('errors/404');
  }
};

exports.addApplicant = (req, res) => {
  const jobId = parseInt(req.params.id);
  const applicantData = req.body;
  Job.addApplicantToJob(jobId, applicantData);
  res.redirect(`/jobs/${jobId}/applicants`);
};
