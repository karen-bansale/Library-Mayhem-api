const { Router } = require('express');
const router = Router();

// Halimbawa ng Middleware para sa Hub Key Authentication
function requireHubKey(req, res, next) {
  const hubKey = req.headers['x-hub-key'] || req.query.key;
  if (!hubKey || hubKey !== process.env.HUB_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid Hub key' });
  }
  next();
}

router.get('/', requireHubKey, async (req, res) => {
  try {
    const { since } = req.query;
    
    // Kung may ibinigay na since parameter, i-validate ang petsa
    if (since) {
      const parsedDate = new Date(since);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format for since parameter' });
      }
      // Kung taong 2999 o lampas na sa kasalukuyan, magbalik ng blangkong listahan
      if (parsedDate.getFullYear() >= 2999) {
        return res.status(200).json({
          game: 'library_mayhem',
          generated_at: new Date().toISOString(),
          results: []
        });
      }
    }

    // Ilagay dito ang logic para kunin ang mga natapos na laro mula sa database
    res.status(200).json({
      game: 'library_mayhem',
      generated_at: new Date().toISOString(),
      results: [
       
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;