const fs = require('fs');
const path = require('path');

const writeFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(path.join(filePath), data, (err) => {
    if (err) reject(err);
    resolve(true);
  });
});

const appendFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.appendFile(path.join(filePath), data, (err) => {
    if (err) reject(err);
    resolve(true);
  });
});

const createFolder = async (currentDir, dirName) => {
  const dirPath = path.join(currentDir, dirName);
  if (!fs.existsSync(dirPath)) await fs.mkdirSync(dirPath);
};

module.exports = {
  writeFile,
  appendFile,
  createFolder,
};
