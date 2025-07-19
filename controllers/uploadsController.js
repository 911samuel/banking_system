import path from 'path';

const uploadByAgent = (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  // Here you can save file info to DB or process as needed
  const uploadedFiles = {};
  for (const field in req.files) {
    uploadedFiles[field] = req.files[field].map(file => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    }));
  }
  res.status(200).json({ message: 'Files uploaded successfully', files: uploadedFiles });
};

const uploadByEmployee = (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  // Here you can save file info to DB or process as needed
  const uploadedFiles = {};
  for (const field in req.files) {
    uploadedFiles[field] = req.files[field].map(file => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    }));
  }
  res.status(200).json({ message: 'Files uploaded successfully', files: uploadedFiles });
};

export default {
  uploadByAgent,
  uploadByEmployee,
};
