import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../myshop1.svg';
import { useSelector } from 'react-redux';
import userImage from '../images/user.png';
import "../App.css";

const Navbar = () => { 
  const user = useSelector(state => state.user);
  let location = useLocation();   // for active Link
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link className={`nav-link`} to="/"><Logo className="mx-3" width={30} height={30} /></Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
                </li>
            </ul>    
            <div className="float-right text-light">{user?<h2 className="m-0" >Welcome {user.name}</h2>:""}</div>       
        </div>
        {!localStorage.getItem("user")?<form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
        </form>: 
        <Link to="/userProfile" className="mx-3">
          <img src={userImage} alt="" width={30} height={30}></img>
        </Link>
        }
        </nav>
    </div>
  )
}

export default Navbar
