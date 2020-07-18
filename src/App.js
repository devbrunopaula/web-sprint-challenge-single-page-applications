import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from './Pages/Home'
import Pizza from './Pages/Pizza/Pizza'

import TopBar from './components/Header/TopNav';
import Slider from './components/Carousel/Slider';

const App = () => {
  return (
    <>
    <TopBar/>
    <Switch>
      <Route path='/pizza'>
        <Pizza/>
      </Route>
      <Route path="/">
        <Home/>
      </Route>
      
    </Switch>
    
    </>
  
  );
};
export default App;
