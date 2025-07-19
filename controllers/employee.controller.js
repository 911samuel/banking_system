import Employee from '../models/Employee.js';

const addEmployee = async (req, res) => {
  const { employeeName, categoryId, employmentStatus, orgId } = req.body;
  if (!employeeName || !categoryId || !employmentStatus || !orgId) {
    return res.status(400).json({ message: 'Employee name, category ID, employment status, and organization ID are required' });
  }
  try {
    const newEmployee = await Employee.create({ employeeName, categoryId, employmentStatus, orgId });
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    console.error('Add employee error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Get all employees error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Get employee by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const { employeeName, categoryId, employmentStatus } = req.body;
    if (employeeName) employee.employeeName = employeeName;
    if (categoryId) employee.categoryId = categoryId;
    if (employmentStatus) employee.employmentStatus = employmentStatus;
    await employee.save();
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.destroy();
    res.json({ message: 'Employee removed successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
