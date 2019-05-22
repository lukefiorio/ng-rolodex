'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');

router.route('/').get((req, res) => {
  new User({ id: req.query.user })
    .fetch({ withRelated: ['contacts'] })
    .then((result) => {
      const user = result.toJSON();
      return res.send(user);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

module.exports = router;
