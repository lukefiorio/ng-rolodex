'use strict';

const express = require('express');
const router = express.Router();
const Contact = require('../database/models/Contact');

router.route('/').get((req, res) => {
  new Contact()
    .query((qb) => {
      qb.orderBy('id', 'ASC');
    })
    .fetchAll({ withRelated: ['created_by'] })
    .then((result) => {
      const allContacts = result.toJSON();
      return res.send(allContacts);
    });
});

module.exports = router;
