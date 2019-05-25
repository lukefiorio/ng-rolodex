'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Contact = require('../database/models/Contact');

router
  .route('/')
  .get((req, res) => {
    // all contacts associated with userId
    new User({ id: req.user.id })
      .fetch({
        withRelated: [
          {
            contacts: (qb) => {
              qb.orderBy('name', 'ASC');
            },
          },
        ],
      })
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
        created_by: parseInt(req.user.id),
      })
      .then((result) => {
        new Contact({ id: result.id })
          .query((qb) => {
            // sort names alphabetically
            qb.orderBy('name', 'ASC');
          })
          .fetch()
          .then((result) => {
            const contact = result.toJSON();
            // respond with newly created contact
            return res.json(contact);
          });
      })
      .catch((err) => {
        console.log('error:', err);
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    new Contact({ id: req.params.id })
      .fetch()
      .then((result) => {
        const contact = result.toJSON();
        if (contact.created_by !== req.user.id) {
          return res.status(404).send('Not authorized');
        }
        return res.send(contact);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Contact not found');
      });
  })
  .put((req, res) => {
    new Contact('id', req.params.id)
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
      })
      .then((result) => {
        new User({ id: req.user.id })
          .fetch({
            withRelated: [
              {
                contacts: (qb) => {
                  qb.orderBy('name', 'ASC');
                },
              },
            ],
          })
          .then((result) => {
            const user = result.toJSON();
            return res.send(user);
          })
          .catch((err) => {
            console.log('error:', err);
          });
      })
      .catch((err) => {
        console.log('error:', err);
      });
  })
  .delete((req, res) => {
    Contact.where({ id: req.params.id })
      .destroy()
      .then((result) => {
        new User({ id: req.user.id })
          .fetch({
            withRelated: [
              {
                contacts: (qb) => {
                  qb.orderBy('name', 'ASC');
                },
              },
            ],
          })
          .then((result) => {
            const user = result.toJSON();
            console.log('user', user);
            return res.json(user);
          })
          .catch((err) => {
            console.log('error:', err);
          });
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router.route('/search/:term').get((req, res) => {
  // all contacts associated with userId
  new User({ id: req.user.id })
    .fetch({
      withRelated: [
        {
          contacts: (qb) => {
            qb.orderBy('name', 'ASC');
          },
        },
      ],
    })
    .then((result) => {
      const userContacts = result.toJSON().contacts;
      // filter contacts whose name starts with search string
      const foundContacts = userContacts.filter((contact) => {
        return contact.name.toLowerCase().startsWith(req.params.term.toLowerCase());
      });
      return res.send(foundContacts);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

module.exports = router;
