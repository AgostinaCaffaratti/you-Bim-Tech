import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Divider, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width:'100%',
    height:240,
    marginTop:10,
    marginBottom:10
  },  
  title: {
    fontSize: 14,
  },
  content: {
    height: 70
  },
  multiplier:{
    width:'120px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  inputField:{
    width:'100px'
  }
});

export const ItemCard = ({data,  deleteItem, isAvailable, addCurrent,  isBundle, isMultiple = false}) => {


  const {code, description, price, type } = data
  
    
  const classes = useStyles();



  return (
    <Card className={classes.root} variant="outlined">
    <CardHeader title={code}
    action={
      isAvailable ? <Button onClick={addCurrent}>Add to Bundle</Button> : 
         isBundle ? <Typography variant='h4'>${price}</Typography> : <Button variant="contained"  color='secondary' onClick={deleteItem}>Delete</Button>
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
        {isMultiple ? 
        <div className={classes.multiplier} >
          <div className={classes.inputField}>
          <TextField   type='number' variant="outlined" value={0} name="multiplier"   /> 
          </div>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
        {`$${price * 1}`}
        </Typography>
        </div> 
        :
         null } 
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
