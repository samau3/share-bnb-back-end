const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const { Readable } = require('stream');

dotenv.config();

//TODO: import these into this file from config/env
const region = "us-west-1";
const bucketName = "sharebnb-photos";

//TODO: Update to environment variable
AWS.config.update({ region });

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});


/** Uploads file to S3 and returns the URL */
async function generateUploadUrl(file) {
  console.log("generateUploadUrl", { file });
  const params = ({
    Bucket: bucketName,
    Key: file.originalname,
    Body: ''
  });

  const fileStream = Readable.from(file.buffer);
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  params.Body = fileStream;

  const url = await s3.upload(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      throw new Error(err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  }).promise();

  console.log('generateUploadUrl returning', url);
  return url.Location;
}

module.exports = { generateUploadUrl };