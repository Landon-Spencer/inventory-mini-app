const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('App server is running!')
})

app.get('/items{/:id}', (req, res) => {
  const itemId = req.params.id;
  knex('items')
    .join('departments', 'items.department_id', '=', 'departments.id')
    .select(
      'items.id',
      'items.name',
      'items.department_id',
      'departments.name as department',
      'items.inventory as inventory',
      'items.created_at',
      'items.updated_at'
    )
    .modify(itemsTable => {
      if (itemId) {
          itemsTable.where('items.id', '=', itemId)
      }
    })
    .orderBy('items.id')
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(`Error:`, err)
      res.status(404).json({
        message:
          'The items you are looking for could not be found. Please try again'
      })
    });
})

app.patch(`/items/:id`, (req, res) => {
  const itemId = req.params.id;
  const updates = req.body;
  const fieldsToUpdate = {};

  if (updates.inventory !== undefined) fieldsToUpdate.inventory = updates.inventory;

  knex('items')
   .where({id: itemId})
   .update(fieldsToUpdate)
   .returning('*')
   .then(records => {
    if (records.length === 0) {
      return res.status(404).json({
        message: 'Test not found.'
      })
    }
    res.status(200).json(records[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: 'Could not update item inventory.'
      })
    })
})

app.post('/items', (req, res) => {
  const { name, department_id, inventory } = req.body;

  const newItem = {
    name: name,
    department_id: department_id,
    inventory: inventory
  };

  knex('items')
   .insert(newItem)
   .then(res.status(201).json(`${newItem.name} was added to the database!`))
   .catch(err => {
    console.log(err);
    res.status(404).json(`Could not add ${newItem.name} to the database :(`)
   })
})

app.listen(port, ()=> {
  console.log(`Server listening on port:`, port);
})