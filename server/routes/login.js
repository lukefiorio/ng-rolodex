'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.route('/').get((req, res) => {
  const loggedIn = req.hasOwnProperty('user');
  return res.send('Log-in Form');
});

// router.post(
//   '/',
//   passport.authenticate('local', {
//     failureRedirect: '/login',
//   }),
//   function(req, res) {
//     return res.redirect(`/users/${req.user.id}`);
//   },
// );

// not working... xhr always false
router.post('/', passport.authenticate('local', { failWithError: true }), function(req, res) {
  console.log('xhr:', req.xhr);
  if (req.xhr) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

module.exports = router;
