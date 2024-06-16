const shortid = require('shortid');
const URL = require('../models/url');
const { PORT } = process.env;

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
    return res.render('urlGenerated', {
        shortId: newUrl.shortId,
        PORT: PORT
    });
}

async function getRedirectUrl(req, res) {
    try {
		console.log("say RADHE RADHE")
        const reqUrl = req.params.shortUrl;
        const result = await URL.findOneAndUpdate(
            { shortId: reqUrl },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // This option returns the updated document
        );

        if (!result) {
            // If no document was found, respond with a 404 status code
            return res.status(404).json({ message: 'Short URL not found' });
        }

        // Redirect to the original URL
        return res.status(200).redirect(result.redirectUrl);
    } catch (error) {
        // Handle any potential errors
        console.error('Error in getRedirectUrl:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAnalytics(req, res) {
    try {
        const reqUrl = req.params.shortUrl;
        const reqUrlData = await URL.findOne({ shortId: reqUrl });

        if (!reqUrlData) {
            // If no document was found, respond with a 404 status code
            return res.status(404).json({ message: 'Short URL not found' });
        }

        // Return the number of clicks (length of visitHistory)
        return res.status(200).json({ "number of clicks": reqUrlData.visitHistory.length });
    } catch (error) {
        // Handle any potential errors
        console.error('Error in getAnalytics:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getShortId, getRedirectUrl, getAnalytics };
