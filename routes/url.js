const express = require('express');
const router = express.Router();
const {getShortId, getRedirectUrl, getAnalytics} = require('../controllers/url')

router.route('/:shortUrl')
	.get(getRedirectUrl)
router.route('/')
	.post(getShortId)

router.route('/analytics/:shortUrl')
	.get(getAnalytics)

module.exports = router;