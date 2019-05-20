const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');

aws.config.update({
	secretAccessKey: keys.secretAccessKey,
	accessKeyId: keys.accessKeyId,
	region: 'us-west-1'
})

const s3 = new aws.S3();

const upload = multer({
	storage: multerS3({
		s3: s3,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		bucket: 'postgram-dev',
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, {
				fieldName: file.fieldname
			});
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString())
		}
	})
});

module.exports = upload;