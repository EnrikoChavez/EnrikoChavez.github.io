import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'

function App() {
  return (
    <div className="App">
      <Router>

          <Navbar className='navbar'/>

          <div className='pages'>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/about' exact component={About}/>
          </Switch>
          </div>

      </Router>
    </div>
  );
}

export default App;
