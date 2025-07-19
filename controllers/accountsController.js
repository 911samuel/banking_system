const Account = require('../models/Account');

const createAccountByAgent = async (req, res) => {
  const {
    accountNumber,
    accountType,
    accountHolderName,
    dateOfBirth,
    socialSecurityNumber,
    homeAddress,
    emailAddress,
    phoneNumber,
  } = req.body;

  if (!accountNumber || !accountType || !accountHolderName || !dateOfBirth || !socialSecurityNumber || !homeAddress || !emailAddress || !phoneNumber) {
    return res.status(400).json({ message: 'All account fields are required' });
  }

  try {
    const existingAccount = await Account.findOne({ where: { accountNumber } });
    if (existingAccount) {
      return res.status(409).json({ message: 'Account number already exists' });
    }

    const newAccount = await Account.create({
      accountNumber,
      accountType,
      accountHolderName,
      dateOfBirth,
      socialSecurityNumber,
      homeAddress,
      emailAddress,
      phoneNumber,
      createdByAgentId: req.agent.id,
      status: 'active',
    });

    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Create account by agent error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAccountByEmployee = async (req, res) => {
  const {
    accountNumber,
    accountType,
    accountHolderName,
    dateOfBirth,
    socialSecurityNumber,
    homeAddress,
    emailAddress,
    phoneNumber,
  } = req.body;

  if (!accountNumber || !accountType || !accountHolderName || !dateOfBirth || !socialSecurityNumber || !homeAddress || !emailAddress || !phoneNumber) {
    return res.status(400).json({ message: 'All account fields are required' });
  }

  try {
    const existingAccount = await Account.findOne({ where: { accountNumber } });
    if (existingAccount) {
      return res.status(409).json({ message: 'Account number already exists' });
    }

    const newAccount = await Account.create({
      accountNumber,
      accountType,
      accountHolderName,
      dateOfBirth,
      socialSecurityNumber,
      homeAddress,
      emailAddress,
      phoneNumber,
      createdByEmployeeId: req.employee.id,
      status: 'active',
    });

    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Create account by employee error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAccountDetails = async (req, res) => {
  const { accountNumber } = req.params;
  try {
    const account = await Account.findOne({ where: { accountNumber } });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    console.error('Get account details error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAccountByAgent,
  createAccountByEmployee,
  getAccountDetails,
};
