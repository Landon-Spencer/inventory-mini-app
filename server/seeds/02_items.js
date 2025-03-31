/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {name: 'Chicken', department_id: 1, inventory: 50},
    {name: 'Beef', department_id: 1, inventory: 20},
    {name: 'Pork', department_id: 1, inventory: 40},
    {name: 'Broccoli', department_id: 2, inventory: 30},
    {name: 'Apples', department_id: 2, inventory: 100},
    {name: 'Avocados', department_id: 2, inventory: 35},
    {name: 'Milk', department_id: 3, inventory: 25},
    {name: 'Cheese', department_id: 3, inventory: 30},
    {name: 'Yogurt', department_id: 3, inventory: 60}
  ]);
};
