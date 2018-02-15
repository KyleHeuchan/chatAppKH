const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/users', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/users.html'));
});

module.exports = router;
