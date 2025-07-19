import Jobseeker from '../models/Jobseeker.js';

const submitApplication = async (req, res) => {
  const { name, email, phone, resumeUrl } = req.body;
  if (!name || !email || !phone || !resumeUrl) {
    return res.status(400).json({ message: 'Name, email, phone, and resume URL are required' });
  }
  try {
    const newApplication = await Jobseeker.create({ name, email, phone, resumeUrl });
    res.status(201).json({ message: 'Job seeker application submitted', application: newApplication });
  } catch (error) {
    console.error('Submit job seeker application error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Jobseeker.findAll();
    res.json(applications);
  } catch (error) {
    console.error('Get all job seeker applications error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await Jobseeker.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Get job seeker application by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  submitApplication,
  getAllApplications,
  getApplicationById,
};
