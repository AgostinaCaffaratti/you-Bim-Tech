import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, addBundle, addcurrentlyBundled, deletecurrentlyBundled} from '../state/reducer'



const CreateBundle = () => {
  const classes = useStyles()

  const items = useSelector((state) => state.items.items)


  const [isAvailable, setIsAvailable] = useState(false)

const [current, setCurrent] = useState([])


  const [total, setTotal] = useState(0)

  const [title, setTitle] = useState('')



  const dispatch = useDispatch()

  useEffect(() => {
    setIsAvailable(true)
  }, [])

  const totalBundlePrice = current.reduce((a, b) =>  a+= b.item.tPrice ,0)


  const handleCurrent = (item) => {   
    setCurrent([...current, item])
    setTotal(totalBundlePrice)
  }

  const addToBundle = useCallback(  () => {
  dispatch(addBundle({title: title, items: current}))    
  setCurrent([])

    setTitle('')
  },[current,dispatch,title,])

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
                      current={current}
                      setTotal={setTotal} 
                      // setPrices={setPrices}
                      // prices={prices}

                    />
                  )
                })}
              </Grid>
              <Typography variant='h4'>${totalBundlePrice}</Typography>
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

export default CreateBundle
