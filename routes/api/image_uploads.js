const express = require('express');
const router = express.Router();
const upload = require('../../services/image_upload');

const singleUpload = upload.single('image');

router.post('/new', (req, res) => {
	singleUpload(req, res, function(err, data) {
		if(err){
			return res.status(422).send({errors: [{
				title: 'Image Upload Error', 
				detail: err.message
			}]
			})
		}
		console.log(data);
		console.log(res);
		return res.json({'imageUrl': req.file.location});
	})
});


module.exports = router;