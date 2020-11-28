const fs = require('fs');

const writeFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) reject(err);
    resolve(true);
  });
});

const appendFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.appendFile(filePath, data, (err) => {
    if (err) reject(err);
    resolve(true);
  });
});

const createFolder = async (dirPath) => {
  if (!fs.existsSync(dirPath)) await fs.mkdirSync(dirPath);
};

module.exports = {
  writeFile,
  appendFile,
  createFolder,
};
