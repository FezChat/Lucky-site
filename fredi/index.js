const fs = require('fs');

// Generates a random ID of given length (default: 4)
function frediId(length = 4) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}

// Generates a random 8-character code
function generateRandomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

// Removes a file or directory, returns a promise
async function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.rm(filePath, { recursive: true, force: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error removing file: ${filePath}`, error);
    return false;
  }
}

module.exports = { frediId, removeFile, generateRandomCode };
