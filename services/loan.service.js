import Loan from '../models/Loan.js';

const approveLoan = async (loanId) => {
  try {
    const loan = await Loan.findByPk(loanId);
    if (!loan) {
      throw new Error('Loan not found');
    }
    loan.status = 'approved';
    await loan.save();
    return loan;
  } catch (error) {
    console.error('Approve loan error:', error);
    throw error;
  }
};

const rejectLoan = async (loanId) => {
  try {
    const loan = await Loan.findByPk(loanId);
    if (!loan) {
      throw new Error('Loan not found');
    }
    loan.status = 'rejected';
    await loan.save();
    return loan;
  } catch (error) {
    console.error('Reject loan error:', error);
    throw error;
  }
};

export default {
  approveLoan,
  rejectLoan,
};
