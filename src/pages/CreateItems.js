import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import NewItemForm from '../components/NewItemForm'
import { Box, Paper } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import {useDispatch, useSelector} from 'react-redux'
import {deleteItem } from '../state/reducer'



const CreateItems = () => {
  const classes = useStyles()

  const items = useSelector (state => state.items.items)  

  const dispatch = useDispatch()

  return (
          <Paper className={classes.paper}>
            <div className={classes.form}>
            <NewItemForm  />
            </div>
        <Grid item xs={6} container className={classes.cardsContainer} >
        {items.map((item, index) => {        
          return <ItemCard key={index} data={item.item} deleteItem={() => dispatch(deleteItem(index)) } />

        })}
        </Grid>
          </Paper>
        
  )
}

const useStyles = makeStyles((theme) => ({

  paper: {
    margin:'20px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding: '30px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight:'100vh'
  },

  form:{
    width:'40%',
    justifyContent:'flex-end'
  },

  cardsContainer:{
    display:'flex',
    flexDirection: 'column',
    justifyContent:'flexStart'
  }
}))

export default CreateItems
