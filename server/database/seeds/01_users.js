const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'luke',
          name: 'Luke Fiorio',
          email: 'luke@yahoo.com',
          address: '842 Ala Moana Blvd, Honolulu, HI 96814',
          password: bcrypt.hashSync('password', saltRounds),
        },
        {
          username: 'brett',
          name: 'Brett Matsumoto',
          email: 'brett@yahoo.com',
          address: '909 Pali Hwy, Honolulu, HI 96821',
          password: bcrypt.hashSync('17', saltRounds),
        },
        {
          username: 'frank',
          name: 'Frank Heggeness',
          email: 'frank@yahoo.com',
          address: '1204 Merchant St, Honolulu, HI 96813',
          password: bcrypt.hashSync('frank', saltRounds),
        },
        {
          username: 'brenda',
          name: 'Brenda Flores',
          email: 'brenda@yahoo.com',
          address: '1387 Alaeloa St, Honolulu, HI 96821',
          password: bcrypt.hashSync('brenda', saltRounds),
        },
        {
          username: 'ron',
          name: 'Ron Nagata',
          email: 'ron@yahoo.com',
          address: '640 King St, Honolulu, HI 96813',
          password: bcrypt.hashSync('ron', saltRounds),
        },
      ]);
    });
};
