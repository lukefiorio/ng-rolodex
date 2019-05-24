'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');

router.route('/').get((req, res) => {
  new User({ username: req.query.username })
    .fetch()
    .then((result) => {
      return res.send(Boolean(result));
    })
    .catch((err) => {
      return res.status(500).send('Server error');
    });
});

module.exports = router;
