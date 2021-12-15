import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width:'95%',
    height:180,
    marginTop:10,
    marginBottom:10
  },  
  title: {
    fontSize: 14,
  },
  content: {
    height: 50
  }
});

export const ItemCard = ({data, index, deleteItem, isAvailable, addBundle, addCurrent, deleteBundle}) => {



  const {code, description, price, type } = data
  
    
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
    <CardHeader title={code}
    action={
      isAvailable ? <Button onClick={addCurrent}>Add to Bundle</Button> :
          <Button variant="contained"  color='secondary' onClick={deleteItem}>Delete</Button>
        }>
    </CardHeader>
    <Divider ></Divider>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {description}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {`$${price}`}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {type}
        </Typography>        
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
