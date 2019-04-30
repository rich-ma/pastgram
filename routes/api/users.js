const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

router.get('/test', (req, res) => res.json({msg: 'This is the users route'}));

router.post('/register', (req, res) => {
	User.findOne({email: req.body.email})
	.then(user => {
		if(user){
			return res.status(400).json({email: "A User is already registered with that email"}); //user already registers	
		} else {
			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			})

			//creating salted pw, running 10 times
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
					newUser.save()
						.then((user) => res.json(user))
						.catch(err => console.log(err));
				})
			})
		}
	})
});

router.post('/login', (req, res) => {
	User.find({email: req.body.email})
		.then(user => {
			if(!user){
				return res.status(400).json({email: "This user does not exist"});
			}

			bcrypt.compare(req.body.password, user.password)
				.then(isMatch => {
					if(isMatch){
						res.json({msg: 'Success'})
					} else {
						return res.status(400).json({msg: 'Incorrect password'});
					}
				})
		})
})
module.exports = router;