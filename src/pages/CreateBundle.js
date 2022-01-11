import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, addBundle} from '../state/reducer'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eceff1',
    height: '100vh',

  },

  paper: {
    margin:'20px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
minHeight:'90%',
padding:'20px'
  },
  items:{
    width:'49%',
  },

  button :{
    marginTop:20
  }
}))

const CreateBundle = () => {
  const classes = useStyles()

  const items = useSelector((state) => state.items.items)

  const bundles = useSelector((state) => state.bundles.bundles)

  const [isAvailable, setIsAvailable] = useState(false)

  const [current, setCurrent] = useState([])

  const [price, setPrice] = useState([])

  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setIsAvailable(true)
  }, [])

  const handleCurrent = (item) => {
    setCurrent([...current, item])
    const itemPrice = item.item.price
    setPrice([...price, Number(itemPrice)])
  }



  const addToBundle = (item) => {
    dispatch(addBundle({title: title, items: current, totalPrice: totalPrice}))
    setCurrent([])
    setTitle('')
    
  }

  const deleteCurrent = (index) => {
     const updatedCurrents = current.filter(({item,index}) => index !== item[index])
     setCurrent(updatedCurrents)
  }

  const handleChange = (e) => {
    const {  value } = e.target
setTitle(value)  }

  const totalPrice = price.reduce((a, b) => a + b, 0);


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
            <Grid className={classes.items}>
              <Typography variant='h4'>Available Items</Typography>
              {items.map((item, index) => {
                return (
                  <ItemCard
                    key={index}
                    data={item.item}
                    deleteItem={() => dispatch(deleteItem(index))}
                    isAvailable={isAvailable}
                    addCurrent={() => handleCurrent(item)}
                  />
                )
              })}
        </Grid>
          <Grid className={classes.items}>
              <Typography variant='h4'>Currently Bundled</Typography>
        {current.length !== 0 ? (
          <>
              <Grid>
                {current.map((item, index) => {
                  return (
                    <ItemCard
                      key={index}
                      data={item.item}
                      deleteItem={() => deleteCurrent(index)}
                    />
                  )
                })}
              </Grid>
              <Typography variant='h4'>${totalPrice}</Typography>
              <Grid className={classes.fieldContainer}>           
              <Typography>Bundle Name</Typography>           
            <TextField  required variant="outlined" value={title} name="title" onChange={handleChange} className={classes.inputField} />
          </Grid>
              <Button variant="contained" color="primary" onClick={() => addToBundle(current)} className={classes.button}>
                Accept bundle
              </Button>
              </>
        ) : null}
          </Grid>
      </Paper>
    </div>
  )
}

export default CreateBundle
