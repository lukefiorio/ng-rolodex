'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');

router.route('/').get((req, res) => {
  new User().fetchAll().then((result) => {
    const allUsers = result.toJSON();
    return res.send(allUsers);
  });
});

module.exports = router;
