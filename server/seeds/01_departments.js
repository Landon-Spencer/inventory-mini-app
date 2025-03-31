/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('departments').del()
  await knex('departments').insert([
    {id: 1, name: 'Meat'},
    {id: 2, name: 'Produce'},
    {id: 3, name: 'Dairy'}
  ]);
};
