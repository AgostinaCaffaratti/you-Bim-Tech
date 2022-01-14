import {
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import {createItem} from '../state/reducer'
import {useDispatch} from 'react-redux'


const initializeItem = {
  id: Math.random(),
  code : '',
  description:'',
  price: 0,
  type :'single',
  order:0
}

const NewItemForm = () => {
  const [item, setItem] = useState(initializeItem) 
  const [errors, setErrors] = useState({})
  const classes = usestyle()
  const dispatch = useDispatch()
 

  const handleChange = (e) => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: value,
    })
  }

  const HandleSubmitt = (e) => {
    if (validate()){
      e.preventDefault()   
      dispatch(createItem({item}))    
      setItem(initializeItem)  
    }  
  }

  const validate = () => {
    let temp = {}
    temp.code ={
      hasError: item.code ? (item.code.length < 14 ? false : true ) : true,
      errorText: item.code ? (item.code.length < 14 ? '' : 'Up to 14 characters')  : 'This field is required'
    } 
    temp.description = {
      hasError: item.description ? false : true,
      errorText: item.description ? '' : 'This field is required'
    } 
   temp.price = {
      hasError: item.price >= 0 ? false : true ,
      errorText:item.price >= 0 ? '' : 'Number equal or greater than 0'
    } 
    temp.order = {
      hasError:  item.order >=! 0,
      errorText : item.order >= 0 ? '' : 'Number equal or greater than 0'
    } 
    
    setErrors({...temp})


    return temp.code.errorText === '' ? true : false && temp.description.errorText === '' ? true : false && temp.price.errorText === '' ? true : false && temp.order.errorText === '' ? true : false

  }
  

  return (
    <form className={classes.root}>
          <Grid className={classes.fieldContainer}>           
              <Typography>Code:</Typography>           
            <TextField error={errors.code?.hasError} helperText={errors.code?.errorText}  variant="outlined" value={item.code} name="code" onChange={handleChange}  />
          </Grid>
          <Grid className={classes.fieldContainer}>
              <Typography>Description:</Typography>
            <TextField
              variant="outlined"
              multiline
              value={item.description}
              name="description"
              onChange={handleChange}
              rows={5}
              error={errors.description?.hasError}
              helperText={errors.description?.errorText}
            />
          </Grid>
          <Grid className={classes.fieldContainer}>
              <Typography>Price:</Typography>
            <TextField  type='number' variant="outlined" name="price" value={item.price} onChange={handleChange} error={errors.price?.hasError} helperText={errors.price?.errorText} />
          </Grid>
          <Grid className={classes.fieldContainer} >
                <Typography>Type:</Typography>
              <RadioGroup row name="type" value={item.type} onChange={handleChange} className={classes.radioContainer} >
                <FormControlLabel value="single" control={<Radio />} label="Single" />
                <FormControlLabel value="multiple" control={<Radio />} label="Multiple" />
              </RadioGroup>
          </Grid>
          {/* <Grid className={classes.fieldContainer}>
              <Typography>Order:</Typography>
              <div className={classes.orderField}>
            <TextField  variant="outlined" name="order" type='number' value={item.order} onChange={handleChange} error={errors.order?.hasError} helperText={errors.order?.errorText}  />
              </div>
          </Grid> */}
            <Button className={classes.button}  variant="contained" color="primary" onClick={HandleSubmitt}>
              Create Item
            </Button>
    </form>
  )
}

const usestyle = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '70%',
      margin: theme.spacing(1),
    }, 
  },
  fieldContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  radioContainer:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'flex-start',
  width: '70%'
    },
    orderField:{
      width:'100px',
      marginRight:'58%'
    },
   button: {
    marginTop: '10px',
    marginLeft:'205px',
    background:'##00BFFF'
  },
}))

export default NewItemForm
