const path = require("node:path");
const S3rver = require("s3rver");
//const { InternalServerError } = require('../../errors/baseErrors.js');
const fileDirName = require("../../utils/general/fileDirName.js");
const logger = require("../logger.js");

const { _dirname } = fileDirName(getCurrentFileUrl());

const PORT = 8000;
const ADDRESS = "localhost";
const S3RVER_ENDPOINT = `http://${ADDRESS}:${PORT}`;

function getCurrentFileUrl() {
  const error = new Error();
  const stackLines = error.stack.split("\n").slice(1);
  const callerFile = stackLines.find((line) => line.match(/\S+\.\w+:\d+:\d+/));

  if (!callerFile) {
    throw new Error("Unable to determine current file URL");
  }

  const filePath = callerFile.match(/\((.*):\d+:\d+\)$/)[1];
  const absolutePath = path.resolve(filePath);
  const fileUrl = `file://${absolutePath}`;

  return fileUrl;
}

function s3rverConfig() {
  return new Promise((resolve, reject) => {
    const instance = new S3rver({
      port: PORT,
      address: ADDRESS,
      silent: false,
      directory: path.resolve(_dirname, "../../../temp/uploads"),
      configureBuckets: [
        {
          name: process.env.AWS_BUCKET_NAME,
        },
      ],
    });

    instance.run((error, { address, port } = {}) => {
      if (error) {
        reject(err);
      } else {
        logger.info(
          `✅ Established connection with S3rver at address ${address} and port ${port}`
        );
        resolve();
      }
    });
  });
}

module.exports = {
  s3rverConfig,
  S3RVER_ENDPOINT,
};