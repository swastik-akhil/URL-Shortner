const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const URL = require('./models/url');
const {PORT} = process.env;
//db connection
require('./dbConnection').dbConnection();
const morgan = require('morgan');
app.use(morgan('dev'));

//ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//routers
const urlRouter = require('./routes/url')
app.use('/u', urlRouter);
app.use('/u/:shortUrl', urlRouter);
app.get('/', async (req,res)=>{
	const allUrl = await URL.find({})
	return res.render('index', {
		allUrl : allUrl,
		PORT : PORT
	})
})


app.listen(PORT, ()=>{
	console.log(`server is running at port ${PORT}`);
})