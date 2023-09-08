const path = require("node:path");
const S3rver = require("s3rver");
const fileDirName = require("../../utils/general/fileDirName.js");
const logger = require("../logger.js");

const { _dirname } = fileDirName(getCurrentFileUrl());

const PORT = 8000;
const ADDRESS = "https://clinicas-4a2g.onrender.com/";
const S3RVER_ENDPOINT = `https://clinicas-4a2g.onrender.com/`;

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
      //  port: PORT,
      address: ADDRESS,
      silent: false,
      directory: path.resolve(_dirname, "../../../temp/uploads"),
      configureBuckets: [
        {
          name: process.env.AWS_BUCKET_NAME,
        },
      ],
    });

    instance.run((error, { address } = {}) => {
      if (error) {
        reject(err);
      } else {
        logger.info(
          `✅ Established connection with S3rver at address ${address}`
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
