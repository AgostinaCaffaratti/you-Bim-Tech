import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { withRouter, NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    // [theme.breakpoints.down('xs')]: {
    //   flexGrow: 1,
    // },
  },
  headerOptions: {
    display: 'flex',
    justifyContent: 'start',  
   
  },
  button: {
    '&.active': {
      background: '#ADD8E6',
    },
    height:'70px'

  },
}))

const Header = (props) => {
  const classes = useStyles()

  return (
    <div >
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <div className={classes.headerOptions}>
            <Button className={classes.button} component={NavLink} to="createItems">
              Create Item
            </Button>
            <Button className={classes.button} component={NavLink} to="createBundle">
              Create Bundle
            </Button>
            <Button className={classes.button} component={NavLink} to="releasedBundles">
              Released Bundles
            </Button>{' '}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Header)
