import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Paper, Typography } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import {useDispatch, useSelector} from 'react-redux'
import {deleteBundle} from '../state/reducer'



const ReleasedBundles = () => {
  const classes = useStyles()

  
  const bundles = useSelector(state => state.bundles.bundles)

  const dispatch = useDispatch()
  
  return (
      <Grid item xs={12} container>
         <Paper className={classes.paper}>       
              <Typography variant='h4'>Currently Bundled</Typography>
             <Grid>
               {bundles.map((item, index) => {   
                 return( 
                 <div key={index} className={classes.bundle}>
                   <div className={classes.bundleHeader}>
                   <Typography variant='h5'>{item.title}</Typography>
                   <div>
                   <Button> print </Button>
                   <Button variant="contained"  color='secondary' onClick={() => dispatch(deleteBundle(index))}>Delete</Button>
                   </div>

                   </div>
                   
                   {item?.items.map((item,index) => {

          return <ItemCard key={index} data={item.item} total={item.item.tPrice} isBundle={true} />
                   })}
                 </div> 
                 )             
           })}
            </Grid> 
          </Paper>
          
        </Grid> 
  )
}

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
    height:'100vh',
    margin: 20,
  },
  bundle:{
    marginTop:'20px',
    padding:'10px',
  },
  bundleHeader:{
    display: 'flex',
    justifyContent: 'space-between',
    width:'100%'
  }
}))

export default ReleasedBundles
