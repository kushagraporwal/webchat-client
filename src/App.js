import React, {createContext, useReducer} from 'react'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Info from './components/Info'
import Chatpage from './components/Chatpage'
import Notifications from './components/Notifications'
import Logout from './components/Logout'
import 'bootstrap/dist/css/bootstrap.css'
import { initialstate, reducer } from './reducer/Usereducer'

export const Usercontext = createContext();
const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialstate)
  return (
    <>
    <Usercontext.Provider value={{state, dispatch}}>
    <Navbar/>
    <Switch>
    <Route exact path="/">
    <Home/>
    </Route>
    <Route path="/login">
    <Login/>
    </Route>
    <Route path="/register">
    <Register/>
    </Route>
    <Route path="/:userid/info">
    <Info />
    </Route>
    <Route exact path="/chatpage/:name1/:name2">
    <Chatpage />
    </Route>
    <Route exact path="/logout">
    <Logout />
    </Route>
    </Switch>
    </Usercontext.Provider>
    </>
  )
}

export default App
