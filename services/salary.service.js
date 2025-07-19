import SalaryPayment from '../models/SalaryPayment.js';

const processSalaryPayment = async (employeeId, amount, period) => {
  try {
    const payment = await SalaryPayment.create({ employeeId, amount, period });
    return payment;
  } catch (error) {
    console.error('Process salary payment error:', error);
    throw error;
  }
};

const getSalaryPaymentsByEmployee = async (employeeId) => {
  try {
    const payments = await SalaryPayment.findAll({ where: { employeeId } });
    return payments;
  } catch (error) {
    console.error('Get salary payments error:', error);
    throw error;
  }
};

export default {
  processSalaryPayment,
  getSalaryPaymentsByEmployee,
};
