import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import pizzaBg from '../../assets/pizzaBg.jpg'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import * as Yup from 'yup';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0) 8%, rgba(250,250,250,.95) 16%), url(${pizzaBg})`,
    height: '100vh',
    width: '100%'
  },
  control: {
    padding: theme.spacing(2),

  },
  root: {
    paddingTop: '.5rem'
  },
  topHeader: {
    marginTop: '2rem',
    padding: '1rem',
  },
  orderPizza: {

    width: '80%',
    margin: '2rem auto',
  },
  formControl: {
    minWidth: 230,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  topHeading: {
    padding: "4rem 0"
  },
  toppingList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontStyle: 'bold',

  },
  chip: {
    margin: '.5rem 0',

  },
  glutenToggle: {
    marginTop: '3rem'
  },
  textArea: {
    marginTop: '2rem',
    width: '280px',

    marginBottom: "2rem"
  },
  instructions: {
    margin: 'rem 0'
  },
  sauce: {
    marginTop: "3rem"
  },

  test: {
    width: '500px',
    height: '100px',
    display: 'inline'
  },

  total: {
    width: '30px'
  },
  orderBtn: {
    marginTop: '3rem'
  },
  sidebar: {
    paddingTop: "2rem"
  }
}))


function Pizza() {
  const initialState = {
    name: '',
    size: '',
    gluten: false,
    sauce: '',
    instructions: '',
    quantity: 0,
    price: 0,
    total: 0,
    toppings: []

  }
  const [stateForms, setSateForms] = React.useState(initialState)
  const [errors, setErrors] = React.useState(initialState)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [alert, setAlert] = React.useState(false)

  const classes = useStyles()
  const history = useHistory()


  const handleGluten = (event) => {
    setSateForms({ ...stateForms, [event.target.name]: event.target.checked })

    if (event.target.checked) {
      // setTotal(prev => prev + 1)
      setSateForms({
        ...stateForms,
        total: stateForms.total + 1,
        gluten: true
      })
    }
    else {

      setSateForms({
        ...stateForms,
        total: stateForms.total - 1,
        gluten: false
      })
    }
  }


  const handleQuantity = (event) => {

    if (stateForms.gluten === true) {

      setSateForms({
        ...stateForms,
        [event.target.name]: event.target.value,
        total: (event.target.value * stateForms.price) + 1
      })
    } else {

      setSateForms({
        ...stateForms,
        [event.target.name]: event.target.value,
        total: event.target.value * stateForms.price
      })
    }

  }


  const handleChange = (event) => {
    event.persist()
    Yup.reach(formSchema, event.target.name)
      .validate(event.target.value)

      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: '',
        })
      })

      .catch(err => {

        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        })
      })

    setSateForms({ ...stateForms, [event.target.name]: event.target.value })
    switch (event.target.value) {

      case 'Small':
        setSateForms({
          ...stateForms,
          [event.target.name]: event.target.value,
          price: 2,
          total: 2,
          quantity: 1

        })
        break
      case 'Large':
        setSateForms({
          ...stateForms,
          [event.target.name]: event.target.value,
          price: 4,
          total: 4,
          quantity: 1

        })
        break
      case 'x-Large':
        setSateForms({
          ...stateForms,
          [event.target.name]: event.target.value,
          price: 8,
          total: 8,
          quantity: 1

        })
        break
      default: return "nothing"
    }

  }


  const handleToppings = event => {

    if (event.target.checked === false) {
      const index = stateForms.toppings.indexOf(event.target.name)
      stateForms.toppings.splice(index, 1)
    } else {
      setSateForms({
        ...stateForms,
        [event.target.value]: [...stateForms.toppings, event.target.name],


      })

    }

  }


  const handleSubmit = (e) => {
    console.log('submit')
    e.preventDefault()
    axios.post('https://reqres.in/api/users', { stateForms })
      .then(res => {
        console.log(res.data)

        setSateForms(initialState)
        history.push('/confirmation', res.data)


      })

      .catch(err => {
        setAlert(true)
        console.log(err)
      })
  }


  useEffect(() => {
    formSchema.isValid(stateForms).then(valid => {
      setButtonDisabled(!valid)
    })
  }, [stateForms, errors])


  // Validation
  const formSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required.').min(2, 'Name must be at least 2 characters long.'),
    size: Yup.string(),
    sauce: Yup.string(),
    gulten: Yup.boolean(),
    instructions: Yup.string(),
    quantity: Yup.number(),
    price: Yup.number(),
    total: Yup.number(),
    toppings: Yup.array()

  })
  console.log('state', stateForms)
  return (
    <div className={classes.main}>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="lg"  >
          {alert && <Alert severity="error">This is an error  — please refresh your Page or Call the Store!</Alert>}
          <Grid container className={classes.root}>
            <Grid item xs={12} lg={8}>
              <Grid item container >
                <Grid item xs={12} lg={6}>
                  <h1>Your Information</h1>
                  <TextField id="name" label="Enter Your Name" onChange={handleChange} name="name" value={stateForms.name} variant="outlined" helperText={errors.name} />

                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl className={classes.orderPizza}>
                    <InputLabel id="chooseSize">Pizza Size</InputLabel>
                    <Select
                      name="size"
                      labelId="chooseSize"
                      id="pizzaSize"
                      value={stateForms.size}
                      onChange={handleChange}
                      label="Size"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      <MenuItem value="Small">Small</MenuItem>
                      <MenuItem value="Large">Large</MenuItem>
                      <MenuItem value="x-Large">x-Large</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>

                </Grid>

              </Grid>
              <Grid item container direction="row">

                <Grid item container lg={6} direction="column">
                  <h1>Choose a Topping</h1>
                  <FormControlLabel

                    control={<Checkbox type="checkbox" id="pepperoni" value='toppings' onChange={handleToppings} name='Pepperoni' className='toppings' />}
                    label="Pepperoni"
                  />

                  <FormControlLabel

                    control={<Checkbox value='toppings' id="Sausage" onChange={handleToppings} name='Sausage' className='toppings' />}
                    label="Sausage"
                  />
                  <FormControlLabel

                    control={<Checkbox value='toppings' onChange={handleToppings} name='Canadian Bacon' className='toppings' />}
                    label="Canadian Bacon"
                  />
                  <FormControlLabel
                    control={<Checkbox value='toppings' onChange={handleToppings} name='Spice Italian Sausage' className='toppings' />}
                    label="Spice Italian Sausage"
                  />
                  <FormControlLabel
                    control={<Checkbox value='toppings' onChange={handleToppings} name='Chicken' className='toppings' />}
                    label="Chicken"
                  />


                  <FormControlLabel

                    control={<Checkbox value='toppings' onChange={handleToppings} name="Diced Tomato" className='toppings' />}
                    label='Diced Tomato'
                  />
                  <FormControlLabel

                    control={<Checkbox value='toppings' onChange={handleToppings} name="Black Olives" className='toppings' />}
                    label='Black Olives'
                  />
                  <FormControlLabel

                    control={<Checkbox value='toppings' onChange={handleToppings} name="Roasted Garlic" className='toppings' />}
                    label='Roasted Garlic'
                  />
                  <FormControlLabel
                    control={<Checkbox value='toppings' onChange={handleToppings} name="Three Cheese" className='toppings' />}
                    label='Three Cheese'
                  />
                  <FormControlLabel
                    control={<Checkbox value='toppings' onChange={handleToppings} name="Extra Cheese" className='toppings' />}
                    label='Extra Cheese'
                  />
                  <FormControlLabel
                    control={<Checkbox value='toppings' onChange={handleToppings} name="Green Pepper" className='toppings' />}
                    label='Green Peper'
                  />
                  <FormControlLabel
                    control={<Checkbox value='toppings' onChange={handleToppings} name="Bacon" className='toppings' />}
                    label='Bacon'
                  />

                </Grid>
                <Grid item className={classes.sauce}>


                  <FormControl component="fieldset">
                    <FormLabel component="legend"> Choice of Sauce</FormLabel>
                    <RadioGroup aria-label="sauce" name="sauce" value={stateForms.sauce} onChange={handleChange}>
                      <FormControlLabel value="Original Red" control={<Radio />} label="Original Red" />
                      <FormControlLabel value="Garlic Ranch" control={<Radio />} label="Garlic Ranch" />
                      <FormControlLabel value="BBQ Sauce" control={<Radio />} label="BBQ Sauce" />
                      <FormControlLabel value="Spinach Alfredo" control={<Radio />} label="Spinach Alfredo" />
                    </RadioGroup>
                  </FormControl>
                  <Grid item className={classes.glutenToggle}>
                    <FormControlLabel
                      control={<Switch value={stateForms.gluten} onChange={handleGluten} name="gluten" />}
                      label="Gluten Free Crust (+ $1.00)"
                    />
                  </Grid>
                  <Grid item md={8} >

                    <TextField
                      id="standard-multiline-static"
                      label="Special Instructions"
                      className={classes.textArea}
                      name='instructions'
                      multiline
                      placeholder="Anything else you would like to add?"
                      onChange={handleChange}
                      rows={4}
                      value={stateForms.instructions}

                    />

                  </Grid>

                </Grid>
              </Grid>


            </Grid>

            <Grid item lg={4} className={classes.sidebar}>
              <Typography varinat='h2'>My Pizza</Typography>
              <List component="nav" className={classes.root} aria-label="mailbox folders">
                Quantity: <input type='number' min="0" name='quantity' onChange={handleQuantity} className={classes.total} value={stateForms.quantity} />
                <ListItem button>
                  {stateForms.gluten ? <Chip color="secondary" size="small" deleteIcon={<DoneIcon />} avatar={<Avatar>i</Avatar>} label="Gluten Free" /> : null}
                </ListItem>

                <ListItem button>

                  <Typography variant='h5'>
                    {stateForms.size ? stateForms.size + ' Pizza' : null}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem button divider>
                  {stateForms.sauce ? stateForms.sauce + ' Sauce' : null}
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Your Toppings" />
                </ListItem>
                <Divider light />
                <ListItem button className={classes.toppingList}>


                  {stateForms.toppings.map((el, i) => <Chip key={i} className={classes.chip} color='secondary' label={el} />)}
                </ListItem>
                <Divider light />
                <ListItem >
                  {stateForms.instructions ? <p>*** Special Intructions Saved</p> : null}
                </ListItem>

              </List>
              <Divider light />
              <ListItem>


              </ListItem>


              <Divider light />
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={stateForms.total}
                  // onChange={handleTotal}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  labelWidth={60}
                />
              </FormControl>
              <Button id='formSubmitBtn' className={classes.orderBtn} disabled={buttonDisabled} variant='contained' color='secondary' type='submit'>
                Add To Order
           </Button>
            </Grid>
          </Grid>
        </Container >
      </form>
    </div >
  )
}

export default Pizza

