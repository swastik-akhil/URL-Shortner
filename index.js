const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env;
//db connection
require('./dbConnection').dbConnection();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//routers
const urlRouter = require('./routes/url')
app.use('/api/v1/url', urlRouter);
app.use('/api/v1/:shortUrl', urlRouter);















app.listen(PORT, ()=>{
	console.log(`server is running at port ${PORT}`);
})