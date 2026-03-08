const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/market.json');

exports.getMarketListings = async (req, res) => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        res.json({ success: true, listings: JSON.parse(data) });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to read market data.' });
    }
};

exports.addMarketListing = async (req, res) => {
    try {
        const { crop, quantity, expectedPrice, farmerName, location, contact } = req.body;
        const data = await fs.readFile(dataPath, 'utf8');
        const listings = JSON.parse(data);
        
        const newListing = {
            id: Date.now(),
            crop,
            quantity,
            expectedPrice,
            farmerName,
            location,
            contact
        };
        
        listings.push(newListing);
        await fs.writeFile(dataPath, JSON.stringify(listings, null, 2));
        
        res.json({ success: true, listing: newListing });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add market listing.' });
    }
};
