import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Paper, Typography } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import {useDispatch, useSelector} from 'react-redux'
import {deleteBundle} from '../state/reducer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#eceff1',
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    width: '100%',
    margin: 20,
  },
}))

const ReleasedBundles = () => {
  const classes = useStyles()

  
  const bundles = useSelector(state => state.bundles.bundles)

  const dispatch = useDispatch()

  
  
  return (
    <div className={classes.root}>
      <Grid item xs={12} container>
         <Paper className={classes.paper}>       
              <Typography>Currently Bundled</Typography>
             <Grid>
               {bundles.map((item, index) => {                  
          return <ItemCard key={index} data={item.item} deleteItem={() => dispatch(deleteBundle(index))}   />
           })}
            </Grid> 
          </Paper>
          
        </Grid> 
    </div>
  )
}

export default ReleasedBundles
