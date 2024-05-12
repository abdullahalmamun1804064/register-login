const fs = require('fs');
const path = require('path');
const authDataFilePath = path.join(__dirname, '../data/auth.json');

function readAuthData() {
  try {
    const data = fs.readFileSync(authDataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

module.exports = { readAuthData };
