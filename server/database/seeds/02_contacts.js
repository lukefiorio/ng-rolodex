exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('contacts').insert([
        {
          name: 'Ed Kim',
          address: '123 Baker St',
          mobile: '808-123-1234',
          work: '808-987-9876',
          home: '',
          email: 'ed.kim@devleague.com',
          twitter: '',
          instagram: '',
          github: 'taesup',
          created_by: 3,
        },
        {
          name: 'Ed Kim',
          address: '',
          mobile: '808-123-1234',
          work: '',
          home: '808-456-4567',
          email: '',
          twitter: 'taesup',
          instagram: '',
          github: '',
          created_by: 1,
        },
        {
          name: 'Jason Sewell',
          address: '307 Kamani St',
          mobile: '808-999-8888',
          work: '',
          home: '',
          email: 'jason.sewell@devleague.com',
          twitter: '',
          instagram: '',
          github: 'jaywon',
          created_by: 1,
        },
        {
          name: 'Brenda Flores',
          address: '1387 Alaeloa St, Honolulu, HI 96821',
          mobile: '',
          work: '',
          home: '',
          email: 'brenda@yahoo.com',
          twitter: '',
          instagram: '',
          github: 'bflores88',
          created_by: 5,
        },
        {
          name: 'Brett Matsumoto',
          address: '909 Pali Hwy, Honolulu, HI 96821',
          mobile: '808-220-8876',
          work: '',
          home: '808-555-3323',
          email: 'brett@yahoo.com',
          twitter: '',
          instagram: '',
          github: 'brett',
          created_by: 5,
        },
      ]);
    });
};
