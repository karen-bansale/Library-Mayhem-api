const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    const hubKey = req.headers['x-hub-key'] || req.headers['authorization'];
    
    if (!hubKey) {
      return res.status(401).json({ error: 'Unauthorized: Hub key is required' });
    }

    const { since } = req.query;

    if (since) {
      const parsedDate = new Date(since);
      
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      
      if (parsedDate.getFullYear() >= 2999) {
        return res.status(200).json({
          game: 'library-mayhem',
          generated_at: new Date().toISOString(),
          results: []
        });
      }
    }

    
    return res.status(200).json({
      game: 'library-mayhem',
      generated_at: new Date().toISOString(),
      results: []
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;