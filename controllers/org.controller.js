import Org from '../models/Org.js';

const registerOrg = async (req, res) => {
  const { name, address, contactEmail } = req.body;
  if (!name || !address || !contactEmail) {
    return res.status(400).json({ message: 'Name, address, and contact email are required' });
  }
  try {
    const existingOrg = await Org.findOne({ where: { name } });
    if (existingOrg) {
      return res.status(409).json({ message: 'Organization already exists' });
    }
    const newOrg = await Org.create({ name, address, contactEmail, status: 'pending' });
    res.status(201).json({ message: 'Organization registered successfully', orgId: newOrg.id });
  } catch (error) {
    console.error('Register organization error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllOrgs = async (req, res) => {
  try {
    const orgs = await Org.findAll();
    res.json(orgs);
  } catch (error) {
    console.error('Get all organizations error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrgById = async (req, res) => {
  try {
    const org = await Org.findByPk(req.params.id);
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(org);
  } catch (error) {
    console.error('Get organization by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateOrgStatus = async (req, res) => {
  try {
    const org = await Org.findByPk(req.params.id);
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    org.status = status;
    await org.save();
    res.json({ message: 'Organization status updated', status: org.status });
  } catch (error) {
    console.error('Update organization status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrgEmployees = async (req, res) => {
  try {
    const org = await Org.findByPk(req.params.id, { include: ['employees'] });
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(org.employees);
  } catch (error) {
    console.error('Get organization employees error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  registerOrg,
  getAllOrgs,
  getOrgById,
  updateOrgStatus,
  getOrgEmployees,
};
