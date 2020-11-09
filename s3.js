const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const S3 = {}

S3.getImageInS3 = (bucket, key) => s3.getObject({
  Bucket: bucket,
  Key: key
}).promise()

S3.uploadImageInS3 = (bucket, key, body, contentType) => s3.putObject({
  Bucket: bucket,
  Key: key,
  Body: body,
  ContentType: contentType
}).promise()

S3.deleteImageInS3 = (bucket, key) => s3.deleteObject({
  Bucket: bucket,
  Key: key
}).promise()

module.exports = { S3 }
