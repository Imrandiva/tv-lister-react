import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FavouritesCard(info) {
  console.log(info)
  return (
  
    <Card sx={{ maxWidth: 345, marginLeft:10,marginTop:10, boxShadow: 10}}>
      <CardMedia
        component="img"
        image={info.info.children[2].attributes.src}
        height="140"
      />      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.info.children[0].value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {info.info.attributes.start.substr(8,2)}:{info.info.attributes.start.substr(10,2)} 
        {' '} - {' '}
        {info.info.attributes.stop.substr(8,2)}:{info.info.attributes.stop.substr(10,2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}