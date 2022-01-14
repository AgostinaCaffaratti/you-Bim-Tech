import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, addBundle} from '../state/reducer'

const useStyles = makeStyles((theme) => ({

  paper: {
    margin:'20px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    minHeight:'100vh',
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
console.log('items',items)
  const [isAvailable, setIsAvailable] = useState(false)

  const [current, setCurrent] = useState([])
console.log('currently bundled',current)

  const [prices, setPrices] = useState([])
  console.log('partialPrices', prices)


  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setIsAvailable(true)
  }, [])

  const handleCurrent = useCallback((item) => {
    setCurrent([...current, item])
    const itemPrice = parseInt(item.item.price)
    setPrices([...prices, itemPrice])
  },[current,prices]) 

  const totalPrice = useMemo(()=> prices.reduce((a, b) => a + b, 0),[prices]) ;


  const addToBundle = useCallback( (item) => {
    dispatch(addBundle({title: title, items: current, totalPrice: totalPrice}))
    setCurrent([])
    setTitle('')
    
  },[current,dispatch,title,totalPrice])

  const deleteCurrent = useCallback((code) => {
    const updatedCurrents = current.filter((item) => item.item.code !== code )
    setCurrent(updatedCurrents)
 },[current]) 

  const handleChange = useCallback((e) => {
    const {  value } = e.target
setTitle(value)  },[]) 


 

  return (
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
                      deleteItem={() => deleteCurrent(item.item.code)}
                      isMultiple={ item.item.type === 'multiple'}
                      setPrices={setPrices}
                      prices={prices}

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
  )
}

export default CreateBundle
