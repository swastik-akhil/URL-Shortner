const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const URL = require('./models/url');
const {PORT} = process.env;
//db connection
require('./dbConnection').dbConnection();

//ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//routers
const urlRouter = require('./routes/url')
app.use('/api/v1/url', urlRouter);
app.use('/api/v1/url/:shortUrl', urlRouter);
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