import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './style.css';

//********** Pages/Components **********//
import Home from './Pages/Home';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/Home'>
            {/* component here */}
            <Home />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
