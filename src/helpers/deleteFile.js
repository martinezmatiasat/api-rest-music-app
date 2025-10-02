const fs = require('fs');
const path = require('path');

function deleteFile(filename, folder = 'uploads') {
  if (!filename) return;
  const filePath = path.join(__dirname, '..', folder, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

module.exports = deleteFile;