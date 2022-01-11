import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Paper, Typography } from '@material-ui/core'
import { ItemCard } from '../components/ItemCard'
import {useDispatch, useSelector} from 'react-redux'
import {deleteBundle} from '../state/reducer'
import { width } from '@mui/system'

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

const ReleasedBundles = () => {
  const classes = useStyles()

  
  const bundles = useSelector(state => state.bundles.bundles)

  const dispatch = useDispatch()

  
  return (
    <div className={classes.root}>
      <Grid item xs={12} container>
         <Paper className={classes.paper}>       
              <Typography variant='h4'>Currently Bundled</Typography>
             <Grid>
               {bundles.map((item, index) => {   
                 return( 
                 <div className={classes.bundle}>
                   <div className={classes.bundleHeader}>
                   <Typography variant='h5'>{item.title}</Typography>
                   <div>
                   <Button> print </Button>
                   <Button variant="contained"  color='secondary' onClick={() => dispatch(deleteBundle(index))}>Delete</Button>
                   </div>

                   </div>
                   
                   {item?.items.map((item,index) => {

          return <ItemCard key={index} data={item.item} isBundle={true} />
                   })}
                 </div> 
                 )             
           })}
            </Grid> 
          </Paper>
          
        </Grid> 
    </div>
  )
}

export default ReleasedBundles
