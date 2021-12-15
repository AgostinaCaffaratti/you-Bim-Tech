import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CreateItems from "./pages/CreateItems";
import CreateBundle from "./pages/CreateBundle";
import ReleasedBundles from "./pages/ReleasedBundles";
import Menu from "./components/Menu";

const useStyles = makeStyles({
  root: {
    width:'100%',
    minHeight: '100%',
    background:'#eceff1',
    paddingBottom:'40px'
  }
  
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Menu />
      <Switch>
        <Route exact from="/" render={props => <CreateItems {...props} />} />
        <Route exact from="/createItems" render={props => <CreateItems {...props} />} />
        <Route exact path="/createBundle" render={props => <CreateBundle {...props} />} />
        <Route exact path="/releasedBundles" render={props => <ReleasedBundles {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
