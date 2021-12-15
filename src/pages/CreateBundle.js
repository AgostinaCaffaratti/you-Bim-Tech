import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Paper, Typography } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, addBundle} from '../state/reducer'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eceff1',
    height: '100%',

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
  }
}))

const CreateBundle = () => {
  const classes = useStyles()

  const items = useSelector((state) => state.items.items)

  const bundles = useSelector((state) => state.bundles.bundles)

  const [isAvailable, setIsAvailable] = useState(false)

  const [current, setCurrent] = useState([])

  const [price, setPrice] = useState(0)
  console.log(current)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsAvailable(true)
  }, [])

  const handleCurrent = (item) => {
    setCurrent([...current, item])
    console.log(current)
    console.log(totalCurrent(current, 'price'))
    setPrice(totalCurrent(current, 'price'))
  }

  const totalCurrent = () => {    
   const res =  current.reduce( (acc,item) => {
     return acc += parseInt(item.price)
   },0)  
setPrice(res)
   console.log(res)
    
    
  }

  const addToBundle = (item) => {
    dispatch(addBundle(item))
    console.log(item)
    setCurrent([])
    
  }

  const deleteCurrent = (index) => {
     const updatedCurrents = current.filter(({item,index}) => index !== item[index])
     setCurrent(updatedCurrents)

   

    console.log(index)
  }

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
              <Typography>$520</Typography>
              <Button variant="contained" color="primary" onClick={() => addToBundle(current)}>
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
