const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/contact', (req, res) => {
  logger.logIt('hit contact route')
  res.sendFile(path.resolve(__dirname, '../views/contact.html'));
});

module.exports = router;
