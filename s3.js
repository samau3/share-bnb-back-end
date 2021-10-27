const dotenv = require("dotenv");
const AWS = require("aws-sdk");
// const fsP = require("fs/promises");
const fs = require('fs');
const path = require('path')
const { Readable } = require('stream');

dotenv.config();

const region = "us-west-1";
const bucketName = "sharebnb-photos";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const IdentityPoolId = "231178717159";

AWS.config.update({ region });


const s3 = new AWS.S3({
  // region, 
  // accessKeyId,
  // secretAccessKey,
  // signatureVersion: "v4",
  apiVersion: "2006-03-01",
  // params: { Bucket: bucketName }
})



async function generateUploadUrl(file) {
  console.log("generateUploadUrl", { file })
  const params = ({
    Bucket: bucketName,
    Key: file.originalname,
    Body: ''
  })

//   const fileStream = fs.createReadStream(file.buffer);
  const fileStream = Readable.from(file.buffer.toString());
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  params.Body = fileStream;

  s3.upload(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      throw new Error(err);
    } if (data) {
      console.log("Upload Success", data.Location);
      return data;
    }
  });

  // const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  // return uploadUrl;
}

module.exports = { generateUploadUrl };