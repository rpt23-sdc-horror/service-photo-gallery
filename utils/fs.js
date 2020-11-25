const fs = require('fs');
const path = require('path');

const writeFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(path.join(filePath), JSON.stringify(data, null, 2), (err) => {
    if (err) reject(err);
    resolve(true);
  });
});

const createFolder = async (currentDir, dirName) => {
  const dirPath = path.join(currentDir, dirName);
  if (!fs.existsSync(dirPath)) await fs.mkdirSync(dirPath);
};

module.exports = {
  createFolder,
  writeFile,
};
