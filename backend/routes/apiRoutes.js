const express = require('express');
const router = express.Router();

const { recommendCrop } = require('../controllers/cropController');
const { getMarketListings, addMarketListing } = require('../controllers/marketController');
const { getSchemes } = require('../controllers/schemesController');
const { getWeatherAdvice } = require('../controllers/weatherController');
const { getCommunityQueries, addCommunityQuery } = require('../controllers/communityController');

router.post('/recommend-crop', recommendCrop);
router.get('/market', getMarketListings);
router.post('/market', addMarketListing);
router.get('/schemes', getSchemes);
router.get('/weather-advice', getWeatherAdvice);
router.get('/community', getCommunityQueries);
router.post('/community', addCommunityQuery);

module.exports = router;
