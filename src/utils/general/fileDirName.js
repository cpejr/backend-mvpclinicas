const path = require('node:path');
const { fileURLToPath } = require('url');

function fileDirName(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  const _dirname = path.dirname(__filename);

  return { _dirname, __filename };
}

module.exports = fileDirName;