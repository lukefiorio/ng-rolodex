'use strict';

const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  req.logout();
  return res.send('Log-out page');
});

module.exports = router;
