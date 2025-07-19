import Attendance from '../models/Attendance.js';

const clockIn = async (req, res) => {
  const { employeeId, clockInTime } = req.body;
  if (!employeeId || !clockInTime) {
    return res.status(400).json({ message: 'Employee ID and clock-in time are required' });
  }
  try {
    const newRecord = await Attendance.create({ employeeId, clockInTime });
    res.status(201).json({ message: 'Clock-in recorded', attendance: newRecord });
  } catch (error) {
    console.error('Clock-in error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const clockOut = async (req, res) => {
  const { employeeId, clockOutTime } = req.body;
  if (!employeeId || !clockOutTime) {
    return res.status(400).json({ message: 'Employee ID and clock-out time are required' });
  }
  try {
    const record = await Attendance.findOne({
      where: { employeeId, clockOutTime: null },
      order: [['clockInTime', 'DESC']],
    });
    if (!record) {
      return res.status(404).json({ message: 'No active clock-in record found' });
    }
    record.clockOutTime = clockOutTime;
    await record.save();
    res.json({ message: 'Clock-out recorded', attendance: record });
  } catch (error) {
    console.error('Clock-out error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAttendanceByEmployee = async (req, res) => {
  try {
    const records = await Attendance.findAll({ where: { employeeId: req.params.id } });
    res.json(records);
  } catch (error) {
    console.error('Get attendance by employee error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAttendanceByOrg = async (req, res) => {
  try {
    const records = await Attendance.findAll({ where: { orgId: req.params.orgId } });
    res.json(records);
  } catch (error) {
    console.error('Get attendance by organization error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  clockIn,
  clockOut,
  getAttendanceByEmployee,
  getAttendanceByOrg,
};
