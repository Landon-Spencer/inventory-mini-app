/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {name: 'Chicken', department_id: 1},
    {name: 'Beef', department_id: 1},
    {name: 'Pork', department_id: 1},
    {name: 'Broccoli', department_id: 2},
    {name: 'Apples', department_id: 2},
    {name: 'Avocados', department_id: 2},
    {name: 'Milk', department_id: 3},
    {name: 'Cheese', department_id: 3},
    {name: 'Yogurt', department_id: 3}
  ]);
};
