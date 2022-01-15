import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Divider, TextField } from '@material-ui/core';



export const ItemCard = ({data,  deleteItem, isAvailable, addCurrent,  isBundle, isMultiple = false ,current=[], setTotal = ()=>{}, total}) => {


  const { code, description, price, type } = data


  
  const classes = useStyles();
  
  const [multiplierValue, setMultiplierValue] = useState(1)
  
  const totalPartialPrice =  multiplierValue * parseInt(price)
  data.tPrice = totalPartialPrice
  data.multiplier = multiplierValue

  const handleMultiplierChange = async (e) => {
      const {  value } = e.target
  setMultiplierValue( value === '' ? 1 : parseInt(value))  
  const totalBundlePrice = await current.reduce((a, b) =>  a+= b.item.tPrice ,0)
setTotal(totalBundlePrice)
  
}

  return (
    <Card className={classes.root} variant="outlined">
    <CardHeader title={code}
    action={
      isAvailable ? <Button onClick={addCurrent}>Add to Bundle</Button> : 
         isBundle ? <Typography variant='h4'>${total}</Typography> : <Button variant="contained"  color='secondary' onClick={deleteItem}>Delete</Button>
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
          <TextField   type='number' variant="outlined" value={multiplierValue} onChange={handleMultiplierChange} name="multiplier"   /> 
          </div>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
        {`$${totalPartialPrice}`}
        </Typography>
        </div> 
        :
         null } 
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
const useStyles = makeStyles({
  root: {
    width:'100%',
    marginTop:10,
    marginBottom:10
  },  
  title: {
    fontSize: 14,
  },
  content: {
    height: 'auto'
  },
  multiplier:{
    width:'120px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  inputField:{
    width:'100px'
  }
});