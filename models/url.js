const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
	

	shortId : {
		type : String,
		unique : true,
	},

	redirectUrl : {
		type : String,
	},


	visitHistory : [{
		timestamps : {
			type : Number
		}
	}]
}, {timestamps : true})

module .exports = mongoose.model('URL', urlSchema);