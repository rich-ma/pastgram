const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');


mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.get('/', (req, res) => res.send("hello world"));

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;
//starting a socket and lstening for connections
app.listen(port, () => console.log(`Server is running on port ${port}`));

