import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  appBar: {
    background: "#199bd8",
    color: "#ffffff"
  }
});

export default function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            BARTWatch
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
