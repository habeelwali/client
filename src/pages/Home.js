import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid, } from '@material-ui/core';
import Leftbar from './Leftbar';
import Feed from './Feed';
import RightBar from './RightBar';
import { useSelector } from 'react-redux';


const stylesheet = makeStyles((theme) => ({
  containerwhole: {
    background: '#82EEED',
  },

  feed: {
    background: '#82EEED',
    paddingTop: theme.spacing(12),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(10),
    },
  },
  right: {
    borderLeft: "1px solid #ece7e7",
    marginLeft: theme.spacing(10),
    position:'sticky',
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  checkout: {
    marginTop: theme.spacing(70),
  },
  login: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",

  },
  input: {
    width: "50vh",
    padding: "10px",
    marginBottom: "20px"
  },

  button: {
    width: "15%",
    padding: "10px",
    backgroundColor: "lightblue",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }

}));
function Home() {
const {homePost} = useSelector(state => state)


  const classes = stylesheet();
  return (
    <div className={classes.containerwhole}>
      <Grid container>


        <Grid item sm={2} xs={2}>

          <Leftbar className={classes.left} />



        </Grid>
        <Grid item sm={5} xs={10} className={classes.feed}>

        { homePost.loading 
      ? <img style={{display: 'block', margin: 'auto'}} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loading"/>
       :homePost.results===0
       ?<h2>NO POSTS</h2>
       : <Feed />
      }
         


        </Grid>
        <Grid item sm={3} className={classes.right}>
          <RightBar />

        </Grid>


      </Grid>

    </div>
  )
}

export default Home
