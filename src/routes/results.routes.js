const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { since } = req.query;

    if (since) {
      const parsedDate = new Date(since);
      // Kapag maling format ang petsa, sumagot ng 400 Bad Request
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      // Kapag ang petsa ay taong 2999 o lampas pa, magbalik ng blangkong listahan na may 200 OK
      if (parsedDate.getFullYear() >= 2999) {
        return res.status(200).json({
          game: 'library-mayhem', // Palitan ng eksaktong slug ng laro ninyo
          generated_at: new Date().toISOString(),
          results: []
        });
      }
    }

    // Normal response para sa ibang requests
    res.status(200).json({
      game: 'library-mayhem', // Palitan ng eksaktong slug ng laro ninyo
      generated_at: new Date().toISOString(),
      results: [
        // Dito ilalagay ang listahan ng mga natapos na laro mula sa DB
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;