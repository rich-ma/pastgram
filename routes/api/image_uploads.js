const express = require('express');
const router = express.Router();
const upload = require('../../services/image_upload');

const singleUpload = upload.single('image');

router.post('/new', (req, res) => {
	singleUpload(req, res, function(err, some) {
		if(err){
			console.log("error", err.message);
			console.log(this.req.httpRequest);
			console.log(this.httpResponse);
			return res.status(422).send({errors: [{
				title: 'Image Upload Error', 
				detail: err.message
			}]
			})
		}
		return res.json({'imageUrl': req.file.location});
	})
});


module.exports = router;