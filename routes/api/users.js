const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.get('/test', (req, res) => res.json({msg: 'This is the users route'}));

//private auth route
router.get('/current', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	res.json({
		msg: 'Success'
	});
})

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

					//saving to db and then giving a token for an hour for the user
					newUser.save()
						.then((user) => {
							const payload = {id: user.id, username: user.username};
							jwt.sign(
								payload,
								keys.secretOrKey,
								// Sets key to expire in set amt of seconds.
								{expiresIn: 3600},
								(err, token) => {
									res.json({
										success: true,
										token: 'Bearer ' + token
									});
								}
							);
						})
						.catch(err => console.log(err));
				})
			})
		}
	})
});

router.post('/login', (req, res) => {
	// const { errors, isValid } = validateLoginInput(req.body);

	// if(!isValid) return res.status(400).json(errors);

	User.findOne({email: req.body.email})
		.then(user => {
			if(!user){
				return res.status(404).json({email: "This user does not exist"});
			}

			bcrypt.compare(req.body.password, user.password)
				.then(isMatch => {
					if(isMatch){

						//successfully logs the user in, and assigns them an hour long token.
						const payload = {id: user.id, username: user.username};
						jwt.sign(
							payload,
							keys.secretOrKey,
							// Sets key to expire in set amt of seconds.	
							{expiresIn: 3600},
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							}
						);
					} else {
						// errors.password = "Incorrect password."
						// return res.status(400).json(errors);
						return res.status(400).json({password: 'Incorrect password.'});
					}
				})
		})
})
module.exports = router;