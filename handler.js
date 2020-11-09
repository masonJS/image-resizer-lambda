const sharp = require('sharp')
const gifResize = require('@gumlet/gif-resize')
const { S3 } = require('./s3')

exports.imageResizer = async (event) => {
  const bucket = event.Records[0].s3.bucket.name
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "))
  const distKey = convertKey(srcKey)

  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log('type이 존재하지 않습니다.')
    return;
  }

  const imageType = typeMatch[1].toLowerCase();
  const allowImageType = ['jpeg', 'jpg', 'png', 'bmp', 'tiff', 'gif']
  if(!allowImageType.some(type => type === imageType)) {
    console.log(`지원하지 않은 포맷입니다, 입력 포맷: ${imageType}`);
    return;
  }

  try {
    const originImage = await S3.getImageInS3(bucket, srcKey)
    const originBuffer = await resizeImage(originImage.Body, imageType)
    await S3.uploadImageInS3(bucket, distKey, originBuffer, imageType)
    await S3.deleteImageInS3(bucket, srcKey)
  } catch (e) {
    console.log(`Error : ${e.message || e}`)
  }
}

function convertKey(key, prefix = 'resized-'){
  return `${prefix}${key}`
}

function resizeImage(buffer, imageType){
  // Declaration Standard profile image size
  const STD_WIDTH = 164
  const STD_HEIGHT = 164

  return (imageType === 'gif')
    ? gifResize({
      width: STD_WIDTH,
      height: STD_HEIGHT,
      stretch: true
    })(buffer)
    : sharp(buffer)
      .rotate()
      .resize({
        width: STD_WIDTH,
        height: STD_HEIGHT,
        fit: 'cover'
      })
      .toBuffer()
}


