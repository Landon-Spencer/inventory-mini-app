/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('department_id');
    table.foreign('department_id').references('departments.id');
    table.integer('inventory');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('items', table => {
    table.dropForeign('department_id');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('items');
  });
};
