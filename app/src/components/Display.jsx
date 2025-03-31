import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Update from './Update.jsx'
import ChangeContext from './ChangeContext'

export default function Display(item) {
  const displayItem = item.item;
  const {change, setChange} = useContext(ChangeContext);

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(displayItem.id);
    try {
      const response = await fetch(`http://localhost:8080/items/${displayItem.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      alert(responseData);
      setChange(!change);
    } catch (error) {
      console.error('Error:', error);
      alert('Error:' + error);
    }
  }

  return (
  <div className='display-card'>
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayItem.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`Inventory count: ${displayItem.inventory}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Update item={displayItem}/>
        <Button size="small" onClick={handleDelete}>Delete From Inventory</Button>
      </CardActions>
    </Card>
  </div>
  );
}