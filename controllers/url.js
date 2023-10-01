const shortid = require('shortid');
const URL = require('../models/url');

async function getShortId(req, res) {
	const body = req.body;

	if (!body.url) {
		return res.status(400).json({ error: "url is missing" });
	}

	const shortId = shortid.generate();
	const newUrl = await URL.create({
		shortId: shortId,
		redirectUrl: body.url,
		visitHistory: []
	});

	return res.json({ shortIdGenerated: newUrl.shortId, redirectUrl: newUrl.redirectUrl});
}

// async function getRedirectUrl(req, res) {
// 	// const body = req.body;
// 	const reqUrl = req.params.shortUrl;
// 	const result = await URL.findOne({shortId : reqUrl});
// 	return res.status(200).redirect(result.redirectUrl);
// }
async function getRedirectUrl(req, res) {
	const reqUrl = req.params.shortUrl;
	const result = await URL.findOneAndUpdate({
		shortId : reqUrl
	}, {
		$push : {
			visitHistory : {
				timestamp : Date.now()
			},
		}
	});
	return res.status(200).redirect(result.redirectUrl);
}

async function getAnalytics(req,res){
	const reqUrl= req.params.shortUrl;
	const reqUrlData = await URL.findOne({
		shortId : reqUrl
	})
	return res.status(200).json({"number of clicks" : reqUrlData.visitHistory.length})
}


module.exports = { getShortId, getRedirectUrl, getAnalytics };

