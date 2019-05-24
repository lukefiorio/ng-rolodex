'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const passport = require('passport');

router
  .route('/')
  .get((req, res) => {
    const loggedIn = req.hasOwnProperty('user');
    return res.send('Register Form');
  })
  .post((req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.log('error:', err);
        return res.status(500).send('Unable to generate salt');
      }

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          console.log('error:', err);
          return res.status(500).send('Unable to encrypt');
        }

        return new User({
          username: req.body.username,
          password: hash,
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
        })
          .save()
          .then((user) => {
            req.login(user, (err) => {
              if (err) {
                console.log('error:', err);
                return res.status(500).send('Unable to log-in');
              }
              return res.json({ id: req.user.id, username: req.user.username });
            });
          })
          .catch((err) => {
            console.log('error:', err);
            return res.status(500).send('Error creating account');
          });
      });
    });
  });

module.exports = router;
