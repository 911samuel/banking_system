import Loan from '../models/Loan.js';

const applyLoan = async (req, res) => {
  const { userId, amount, reason } = req.body;
  if (!userId || !amount || !reason) {
    return res.status(400).json({ message: 'User ID, amount, and reason are required' });
  }
  try {
    const newLoan = await Loan.create({ userId, amount, reason, status: 'pending' });
    res.status(201).json({ message: 'Loan application submitted', loan: newLoan });
  } catch (error) {
    console.error('Apply loan error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (error) {
    console.error('Get all loans error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getLoansByUser = async (req, res) => {
  try {
    const loans = await Loan.findAll({ where: { userId: req.params.id } });
    res.json(loans);
  } catch (error) {
    console.error('Get loans by user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateLoanStatus = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    loan.status = status;
    await loan.save();
    res.json({ message: 'Loan status updated', status: loan.status });
  } catch (error) {
    console.error('Update loan status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  applyLoan,
  getAllLoans,
  getLoansByUser,
  updateLoanStatus,
};
