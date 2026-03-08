const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/community.json');

exports.getCommunityQueries = async (req, res) => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        res.json({ success: true, queries: JSON.parse(data) });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to read community data.' });
    }
};

exports.addCommunityQuery = async (req, res) => {
    try {
        const { author, title, question } = req.body;
        const data = await fs.readFile(dataPath, 'utf8');
        const queries = JSON.parse(data);
        
        const newQuery = {
            id: Date.now(),
            author,
            title,
            question,
            answers: [],
            date: new Date().toISOString()
        };
        
        queries.push(newQuery);
        await fs.writeFile(dataPath, JSON.stringify(queries, null, 2));
        
        res.json({ success: true, query: newQuery });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to post query.' });
    }
};
