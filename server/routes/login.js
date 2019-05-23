'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.route('/').get((req, res) => {
  const loggedIn = req.hasOwnProperty('user');
  return res.send('Log-in Form');
});

router.post('/', passport.authenticate('local'), function(req, res) {
  return res.json({ id: req.user.id, username: req.user.username });
});

module.exports = router;
