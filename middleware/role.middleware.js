const isAdmin = (req, res, next) => {
  if (!req.agent || req.agent.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

const isOrgAdmin = (req, res, next) => {
  if (!req.agent || req.agent.role !== 'orgAdmin') {
    return res.status(403).json({ message: 'Organization admin access required' });
  }
  next();
};

const isSystemAdmin = (req, res, next) => {
  if (!req.agent || req.agent.role !== 'systemAdmin') {
    return res.status(403).json({ message: 'System admin access required' });
  }
  next();
};

export default {
  isAdmin,
  isOrgAdmin,
  isSystemAdmin,
};
