import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Update from './Update.jsx'

export default function Display(item) {
  const displayItem = item.item;
  // console.log(displayItem);

  // const handleUpdate = () => {
  //   console.log('Update')
  //   return (
  //     <Update/>
  //   )
  // }

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
        {/* <Button size="small" onClick={handleUpdate}>Update</Button> */}
        <Button size="small">Delete From Inventory</Button>
      </CardActions>
    </Card>
  </div>
  );
}