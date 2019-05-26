'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');

router
  .route('/')
  .get((req, res) => {
    new User({ id: req.user.id })
      .fetch()
      .then((result) => {
        const user = result.toJSON();
        return res.send(user);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  })
  .put((req, res) => {
    new User('id', req.user.id)
      .save({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
      })
      .then((result) => {
        // make new query rather than use result to...
        // avoid passing in username as an update parameter
        new User({ id: req.user.id })
          .fetch()
          .then((result) => {
            const user = result.toJSON();
            return res.send(user);
          })
          .catch((err) => {
            console.log('error:', err);
          });
      });
  });

module.exports = router;
