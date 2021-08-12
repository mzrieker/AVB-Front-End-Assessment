import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "app/App.css";
import logo from "app/logo.svg";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CommentList from "components/CommentList";
import Leaderboard from "components/Leaderboard";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <Header />

      <CommentModal />

      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      {/* Familiar with bootstrap so grid layout */}
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4" className={classes.title}>
              Comment List
            </Typography>
            <Paper>
              <CommentList />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h4" className={classes.title}>
              Leaderboard
            </Typography>
            <Paper>
              <Leaderboard />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
