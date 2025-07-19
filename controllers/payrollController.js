const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');
const Agent = require('../models/Agent');
const SalaryPayment = require('../models/SalaryPayment');
const { v4: uuidv4 } = require('uuid');

const getPayrollInfoByRNRS = async (req, res) => {
  const { rnrsRegistrationId } = req.body;
  if (!rnrsRegistrationId) {
    return res.status(400).json({ message: 'RNRS registration ID is required' });
  }
  try {
    // For demo, find employee by employmentAccountNumber as RNRS ID
    const employee = await Employee.findOne({ where: { employmentAccountNumber: rnrsRegistrationId } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    // Return employee payroll related info
    res.json({
      employeeDetails: {
        employeeName: employee.employeeName,
        employmentStatus: employee.employmentStatus,
        currentAccountBalance: employee.currentAccountBalance,
        accountType: employee.accountType,
      },
      // Additional payroll info can be added here
    });
  } catch (error) {
    console.error('Get payroll info error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const generateSalaryCode = async (req, res) => {
  const { employeeId, currentSalaryAmount } = req.body;
  if (!employeeId || !currentSalaryAmount) {
    return res.status(400).json({ message: 'Employee ID and current salary amount are required' });
  }
  try {
    const salaryCode = uuidv4();
    const payroll = await Payroll.create({
      salaryCode,
      employeeId,
      agentId: req.agent.id,
      salaryStatus: 'unpaid',
      currentSalaryAmount,
      weeksPaid: 0,
    });
    res.status(201).json(payroll);
  } catch (error) {
    console.error('Generate salary code error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const confirmSalaryCode = async (req, res) => {
  const { salaryCode } = req.body;
  if (!salaryCode) {
    return res.status(400).json({ message: 'Salary code is required' });
  }
  try {
    const payroll = await Payroll.findOne({ where: { salaryCode } });
    if (!payroll) {
      return res.status(404).json({ message: 'Salary code not found' });
    }
    payroll.salaryStatus = 'confirmed';
    await payroll.save();
    res.json({ message: 'Salary code confirmed', payroll });
  } catch (error) {
    console.error('Confirm salary code error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const processPayment = async (req, res) => {
  const { salaryCode, weeksToPay } = req.body;
  if (!salaryCode || !weeksToPay) {
    return res.status(400).json({ message: 'Salary code and weeks to pay are required' });
  }
  try {
    const payroll = await Payroll.findOne({ where: { salaryCode } });
    if (!payroll) {
      return res.status(404).json({ message: 'Salary code not found' });
    }
    if (payroll.salaryStatus !== 'confirmed') {
      return res.status(400).json({ message: 'Salary code not confirmed' });
    }
    payroll.weeksPaid += weeksToPay;
    payroll.salaryStatus = 'paid';
    payroll.paymentDate = new Date();
    payroll.transactionReference = `TXN-${Date.now()}`;
    await payroll.save();

    // Log payment in SalaryPayment table
    const taxDeductions = 0; // Placeholder for tax/deduction calculation
    const netAmountPaid = payroll.currentSalaryAmount - taxDeductions;
    await SalaryPayment.create({
      salaryCode: payroll.salaryCode,
      employeeId: payroll.employeeId,
      agentId: payroll.agentId,
      paymentDate: payroll.paymentDate,
      amountPaid: payroll.currentSalaryAmount,
      taxDeductions,
      netAmountPaid,
      transactionReference: payroll.transactionReference,
      status: 'success',
      errorMessage: null,
    });

    res.json({ message: 'Payment processed', payroll });
  } catch (error) {
    console.error('Process payment error:', error);
    // Log failed payment
    if (req.body.salaryCode) {
      await SalaryPayment.create({
        salaryCode: req.body.salaryCode,
        employeeId: null,
        agentId: req.agent ? req.agent.id : null,
        paymentDate: new Date(),
        amountPaid: 0,
        taxDeductions: 0,
        netAmountPaid: 0,
        transactionReference: null,
        status: 'failed',
        errorMessage: error.message,
      });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getPaymentReceipt = async (req, res) => {
  const { salaryCode } = req.params;
  try {
    const payroll = await Payroll.findOne({ where: { salaryCode } });
    if (!payroll) {
      return res.status(404).json({ message: 'Salary code not found' });
    }
    res.json(payroll);
  } catch (error) {
    console.error('Get payment receipt error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// New function for automated salary payment processing
const automateSalaryPayments = async (req, res) => {
  try {
    // Find all confirmed payrolls that are unpaid or partially paid
    const payrolls = await Payroll.findAll({
      where: {
        salaryStatus: 'confirmed',
      },
    });

    const results = [];

    for (const payroll of payrolls) {
      try {
        // Calculate weeks to pay (for demo, pay 1 week per automation)
        const weeksToPay = 1;

        // Process payment logic
        payroll.weeksPaid += weeksToPay;
        payroll.salaryStatus = 'paid';
        payroll.paymentDate = new Date();
        payroll.transactionReference = `AUTO-TXN-${Date.now()}-${payroll.salaryCode}`;
        await payroll.save();

        // Log payment in SalaryPayment table
        const taxDeductions = 0; // Placeholder for tax/deduction calculation
        const netAmountPaid = payroll.currentSalaryAmount - taxDeductions;
        await SalaryPayment.create({
          salaryCode: payroll.salaryCode,
          employeeId: payroll.employeeId,
          agentId: payroll.agentId,
          paymentDate: payroll.paymentDate,
          amountPaid: payroll.currentSalaryAmount,
          taxDeductions,
          netAmountPaid,
          transactionReference: payroll.transactionReference,
          status: 'success',
          errorMessage: null,
        });

        results.push({ salaryCode: payroll.salaryCode, status: 'success' });
      } catch (paymentError) {
        console.error('Automated payment error for salaryCode', payroll.salaryCode, paymentError);
        // Log failed payment
        await SalaryPayment.create({
          salaryCode: payroll.salaryCode,
          employeeId: payroll.employeeId,
          agentId: payroll.agentId,
          paymentDate: new Date(),
          amountPaid: 0,
          taxDeductions: 0,
          netAmountPaid: 0,
          transactionReference: null,
          status: 'failed',
          errorMessage: paymentError.message,
        });
        results.push({ salaryCode: payroll.salaryCode, status: 'failed', error: paymentError.message });
      }
    }

    res.json({ message: 'Automated salary payments processed', results });
  } catch (error) {
    console.error('Automate salary payments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getPayrollInfoByRNRS,
  generateSalaryCode,
  confirmSalaryCode,
  processPayment,
  getPaymentReceipt,
  automateSalaryPayments,
};
