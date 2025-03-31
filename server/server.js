const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('App server is running!')
})

app.get('/items', (req, res) => {
  knex('items')
    .join('departments', 'items.department_id', '=', 'departments.id')
    .select(
      'items.id',
      'items.name',
      'items.department_id',
      'departments.name as department',
      'items.created_at',
      'items.updated_at'
    )
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(`Error:`, err)
      res.status(404).json({
        message:
          'The items you are looking for could not be found. Please try again'
      })
    });
})

app.listen(port, ()=> {
  console.log(`Server listening on port:`, port);
})