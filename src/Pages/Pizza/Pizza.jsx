import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

import orderPizzaImage from '../../assets/orderPizza.jpg'
const useStyles = makeStyles((theme) => ({
  topHeader: {
    marginTop: '3rem',
    padding: '1rem',
  },
  orderPizza: {
    height: '300px',
    width: '100%',
    margin: '0 auto',
  },
  formControl: {
    minWidth: 230,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  test: {
    border: 'solid red',
  },
}))

function Pizza() {
  const classes = useStyles()
  const [size, setSize] = React.useState('')
  const [sauce, setSauce] = React.useState('female')
  const [toppings, setToppings] = React.useState(false)

  const handleChange = (event) => {
    setSize(event.target.value)
    setSauce(event.target.value)
    setToppings(event.target.checked)
    // setState({ ...state, [event.target.name]: event.target.checked });
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Grid item lg='12'>
          <Card className={classes.topHeader}>
            <Typography align='center' variant='h5' color='Primary'>
              Build Your Own Pizza
            </Typography>
          </Card>
          <img className={classes.orderPizza} src={orderPizzaImage} alt='Pizza' />
        </Grid>
        <Typography gutterBottom variant='h4' color='Primary'>
          Build Your Own Pizza
        </Typography>
        <Typography gutterBottom variant='h5' color='Primary'>
          Choice of Size
        </Typography>

        <Grid>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>Pizza Size</InputLabel>
            <Select labelId='demo-simple-select-outlined-label' id='demo-simple-select-outlined' value={size} onChange={handleChange} label='Age'>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value='Personal'>Personal</MenuItem>
              <MenuItem value='Small'>Small</MenuItem>
              <MenuItem value='Large'>Large</MenuItem>
              <MenuItem value={'x-Large'}>x-Large</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>

        <Grid lg={12}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'> Choice of Sauce</FormLabel>
            <RadioGroup aria-label='sauce' name='sauce' value={sauce} onChange={handleChange}>
              <FormControlLabel value='Original Red' control={<Radio />} label='Original Red' />
              <FormControlLabel value='Garlic Ranch' control={<Radio />} label='Garlic Ranch' />
              <FormControlLabel value='BBQ Sauce' control={<Radio />} label='BBQ Sauce' />
              <FormControlLabel value='Spinach Alfredo' control={<Radio />} label='Spinach Alfredo' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid>
          <Grid lg={6}>
            <FormControlLabel control={<Checkbox onChange={handleChange} name='checkedA' />} label='Secondary' />
          </Grid>
          <Grid lg={6}>
            <Checkbox defaultCheck color='primary' inputProps={{ 'aria-label': 'secondary checkbox' }} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Pizza
