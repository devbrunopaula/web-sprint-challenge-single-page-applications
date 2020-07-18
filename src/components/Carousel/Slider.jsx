import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PizzaSlider from '../../assets/pizza.jpg'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  slider: {
     backgroundImage: `linear-gradient(4deg, rgba(0,0,0,0.5662640056022409) 0%, rgba(64,64,64,0.4374124649859944) 100%), url(${PizzaSlider})`,
     height: '400px',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     flexDirection: 'column',
  },
  imageWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      border: 'solid red',
     

  },
  tagline: {
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  pizzaBtn: {
      background: 'white',
      color: 'red',
      padding: '.5rem 1.5rem'
  }
 
}));

function Slider() {
  const classes = useStyles();

  return (
    <div className={classes.slider}>
        <Grid className={classes.imageWrapper}>
            <Typography className={classes.tagline} variant="h4">
            Your Favorite food, delivered while coding
            </Typography>
            <Button  className={classes.pizzaBtn}   >PIZZA?</Button>
        </Grid>
       
     </div>
  );
}


export default Slider