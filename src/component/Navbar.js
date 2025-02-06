import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../myshop1.svg';


const Navbar = () => {

  let location = useLocation();   // for active Link
  let navigate = useNavigate();    // for navigate to another page

  const handleLogout=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem("isAuthenticated");
    navigate("/login")
    // props.showAlert("Logout Successfully","primary")
  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        {/* <Link className="navbar-brand" to="/">Navbar</Link> */}
        <Logo className="mx-2" width={40} height={40} />

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/aboutus"?"active":""}`} to="/aboutus">AboutUs</Link>
                </li>
            </ul>           
        </div>
        {!localStorage.getItem("user")?<form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
        </form>: <button onClick={handleLogout} className="btn btn-primary mx-1">Logout</button>}

        </nav>
    </div>
  )
}

export default Navbar
