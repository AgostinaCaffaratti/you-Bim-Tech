import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
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
import { Box } from '@mui/system'

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
    marginRight:'245px'
  },
  orderInput:{
    width:'100px',
    marginRight:'350px',
  },
 
  button: {
    marginTop: '50px',
    marginLeft:'180px',
    background:'##00BFFF'
  },
}))

const initializeItem = {
  code : '',
  description:'',
  price: 0,
  type :'single',
  order:''
}

const NewItemForm = () => {
  const [item, setItem] = useState(initializeItem) 
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
    e.preventDefault()   
    dispatch(createItem({item}))    
    setItem(initializeItem)    
  }

  

  return (
    <form className={classes.root}>
      <Grid >
        <Grid item xs={12}>
          <Grid className={classes.fieldContainer}>           
              <Typography>Code:</Typography>           
            <TextField  required variant="outlined" value={item.code} name="code" onChange={handleChange} className={classes.inputField} />
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
            />
          </Grid>
          <Grid className={classes.fieldContainer}>
              <Typography>Price:</Typography>
            <TextField type='number' variant="outlined" name="price" value={item.price} onChange={handleChange} />
          </Grid>
          <Grid className={classes.fieldContainer} >
                <Typography>Type:</Typography>
              <RadioGroup row name="type" value={item.type} onChange={handleChange} className={classes.radioContainer} >
                <FormControlLabel value="single" control={<Radio />} label="Simple" />
                <FormControlLabel value="multiple" control={<Radio />} label="Multiple" />
              </RadioGroup>
          </Grid>
          <Grid className={classes.fieldContainer}>
              <Typography>Order:</Typography>
              <Box className={classes.orderInput}>
            <TextField variant="outlined" name="order" value={item.order} onChange={handleChange} />
              </Box>
          </Grid>
            <Button className={classes.button}  variant="contained" color="primary" onClick={HandleSubmitt}>
              Create Item
            </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default NewItemForm
