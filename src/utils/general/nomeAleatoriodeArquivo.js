const crypto = require('node:crypto');

function randomFileName(name, bytesNumber = 16) {
  const hash = crypto.randomBytes(bytesNumber);

  return `${hash.toString('hex')}-${name}`;
}

module.exports = randomFileName;