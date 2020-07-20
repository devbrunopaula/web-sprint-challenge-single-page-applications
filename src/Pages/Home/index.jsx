import React from 'react'
import Slider from '../../components/Carousel/Slider'
import FoodItems from '../../components/Cards/FoodItems'
import { Container, Grid } from '@material-ui/core'
function Home() {
    return (
        <div>
            <Slider />
            <Container maxWidth="lg">
                <h1>Food Delivery in Gottam City</h1>
                <Grid container spacing={8}>
                    <Grid item>
                        <FoodItems />
                    </Grid>
                    <Grid item>
                        <FoodItems />
                    </Grid>
                    <Grid item>
                        <FoodItems />
                    </Grid>
                    <Grid item>
                        <FoodItems />
                    </Grid>
                    <Grid item>
                        <FoodItems />
                    </Grid>
                    <Grid item>
                        <FoodItems />
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default Home
