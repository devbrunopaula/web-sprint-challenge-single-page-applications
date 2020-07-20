import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Pages/Home'
import Pizza from './Pages/Pizza/Pizza'
import TopBar from './components/Header/TopNav';
import Complete from './Pages/Confirmation/Complete'

const App = () => {
  return (
    <>
      <TopBar />
      <Switch>
        <Route exact path='/confirmation' component={Complete} />
        <Route exact path='/pizza'>
          <Pizza />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>

      </Switch>

    </>

  );
};
export default App;
