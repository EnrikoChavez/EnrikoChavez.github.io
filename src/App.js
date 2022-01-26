import React from 'react'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Sandbox from './components/pages/Sandbox'
import Sorting from './components/pages/sandboxPages/Sorting'

function App() {
  return (
    <div className="App">
      <Router>

          <Navbar className='navbar'/>

          <div className='pages'>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/about' exact component={About}/>
            <Route path='/sandbox' exact component={Sandbox}/>
            <Route path='/sandbox/sorting' exact component={Sorting}/>
          </Switch>
          </div>

      </Router>
    </div>
  );
}

export default App;
