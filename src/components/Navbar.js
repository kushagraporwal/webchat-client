import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {Usercontext} from '../App';

const Navbar = () => {
  const {state, dispatch} = useContext(Usercontext);

  const Rendermenu = () =>{
    if(state){
      return (
        <>
          <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/${state}/info`}>User</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
        </>
      )
    }
    else{
      return (
        <>
          <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
        </>
      )
    }
  }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">Chat Website</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <Rendermenu />
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}

export default Navbar
