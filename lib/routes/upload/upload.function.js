require('dotenv')
const AWS           = require("aws-sdk");
const multer        = require("multer");
const multerS3      = require("multer-s3");
const { v4: uuidv4 } = require('uuid');
// configure aws
AWS.config.update({
    region: 'ap-south-1'
});

// connecting to aws s3
const BucketName = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    Bucket: BucketName,
    apiVersion: '2006-03-01',
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ) {
      cb(null, true);
    } else {
        req.file_error = "Got Error";
        cb(null, false);
    }
}


module.exports.upload = multer({
    fileFilter,
    storage: multerS3({
      acl: 'public-read',
      s3:s3,
      bucket: BucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,  
      key: function (req, file, cb) {
        cb(null,uuidv4()+".jpg")
      }
    })
  })
