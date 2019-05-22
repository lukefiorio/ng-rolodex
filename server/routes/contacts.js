'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Contact = require('../database/models/Contact');

router
  .route('/')
  .get((req, res) => {
    // all contacts associated with userId
    new User({ id: req.query.user })
      .fetch({ withRelated: ['contacts'] })
      .then((result) => {
        const user = result.toJSON();
        return res.send(user);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  })
  .post((req, res) => {
    new Contact()
      .save({
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        work: req.body.work,
        home: req.body.home,
        email: req.body.email,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        github: req.body.github,
        created_by: parseInt(req.query.user),
      })
      .then((result) => {
        new Contact({ id: result.id }).fetch().then((result) => {
          const contact = result.toJSON();
          // respond with newly created contact
          return res.json(contact);
        });
      })
      .catch((err) => {
        console.log('error:', err);
      });
  });

router.route('/search/:term').get((req, res) => {
  // all contacts associated with userId
  console.log(req.params.term);
  // use qb to filter on search term
  new User({ id: req.query.user })
    .query((qb) => {
      qb.orderBy('id', 'ASC');
    })
    .fetch({ withRelated: ['contacts'] })
    .then((result) => {
      // send back associated contacts
      const user = result.toJSON();
      console.log(user.contacts);
      return res.send(user.contacts);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

module.exports = router;
