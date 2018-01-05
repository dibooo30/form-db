var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-Parser');
var port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/form2');
app.use(express.static(__dirname + '/public'));

// start schema
var formSchema = new mongoose.Schema({

	firstName:{
		type: String,
		textTransform: 'capitalize'
	},
	lastName:{
		type: String
	},
	email:String,
	message:String

});

var newForm = mongoose.model('newForm', formSchema);

app.use('/contact', (req, res) => {
res.sendFile(__dirname + '/contact.html');
});

// schema action
app.post('/login', (req, res) => {
	var myData = new newForm(req.body);
	myData.save()
	.then(item => { 
		res.send('very will');
	})
	.catch(err => {
      res.status(400).send("unable to save to database");
    });
		
		
});


app.listen(port, console.log('listen now to the new port'));
