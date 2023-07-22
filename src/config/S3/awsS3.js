const {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetBucketCorsCommand,
  GetObjectCommand,
  PutBucketCorsCommand,
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");
require("dotenv").config(); // Possível resolver o processamento do .env de outra maneira. Pode checar o IZT, no package.json
const randomFileName = require("../../utils/general/nomeAleatoriodeArquivo.js");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function pegarAquivo(key) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  return s3.send(new GetObjectCommand(params));
}

async function enviarArquivo({ file, ACL }) {
  const key = randomFileName("") + ".json";
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: JSON.stringify({ imagem: file }),
    Key: key,
    ContentType: "json",
    //ACL,
  };

  await s3.send(new PutObjectCommand(params));
  return { key, ...file };
}

async function enviarArquivos({ files, ACL }) {
  return Promise.all(files.map(async (file) => enviarArquivo({ file, ACL })));
}

async function apagarArquivo(key) {
  if (!key) return;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  await s3.send(new DeleteObjectCommand(params));
}

async function apagarArquivos(keys) {
  if (!keys.length) return;

  const objects = keys.map((key) => ({
    Key: key,
  }));

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: objects,
    },
  };

  await s3.send(new DeleteObjectsCommand(params));
}

async function getCors() {
  const bucketParams = { Bucket: process.env.AWS_BUCKET_NAME };
  return s3.send(new GetBucketCorsCommand(bucketParams));
}

async function configCors({
  allowedOrigins = ["*"],
  allowedMethods = ["POST", "GET", "PUT", "DELETE", "HEAD"],
  exposeHeaders = [],
  maxAgeSeconds = 3000,
} = {}) {
  const config = {
    AllowedHeaders: ["Authorization", "Content-Type"],
    AllowedMethods: allowedMethods,
    AllowedOrigins: allowedOrigins,
    ExposeHeaders: exposeHeaders,
    MaxAgeSeconds: maxAgeSeconds,
  };

  const corsParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    CORSConfiguration: { CORSRules: new Array(config) },
  };

  return s3.send(new PutBucketCorsCommand(corsParams));
}

module.exports = {
  pegarAquivo,
  enviarArquivo,
  enviarArquivos,
  apagarArquivo,
  apagarArquivos,
  getCors,
  configCors,
  s3,
};
