exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.string('name', 100).notNull();
    table.string('address', 100);
    table.string('mobile', 100);
    table.string('work', 100);
    table.string('home', 100);
    table.string('email', 100);
    table.string('twitter', 100);
    table.string('instagram', 100);
    table.string('github', 100);
    table
      .integer('created_by')
      .notNull()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
