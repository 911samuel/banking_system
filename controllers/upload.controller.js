import path from 'path';

const uploadCertificate = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(201).json({ message: 'File uploaded successfully', url: fileUrl });
};

export default {
  uploadCertificate,
};
