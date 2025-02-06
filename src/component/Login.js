import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"
import axios from 'axios';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  localStorage.removeItem('user');
  localStorage.removeItem("isAuthenticated");

  const handleSubmit = async (e)=>{

    e.preventDefault();
    const API_URL = "https://67a31cd8409de5ed52576fba.mockapi.io/user";

    try {
        // Make an API call to the mock API endpoint
        const response = await axios.get(API_URL, { params: { email: email }});

        // Check if user exists and credentials are correct
          if (response.data.length > 0) {
            if(password===response.data[0].password){
              localStorage.setItem("user", JSON.stringify(response.data));
              localStorage.setItem("isAuthenticated", "true");
              navigate("/");
            }else{
              alert('Invalid Password');
            };
          } 
        } catch (error) {
          alert('Invalid Credencials');
        }
    };

  return (
    <div className="login-body">
      <div className="login-main">
      <h2>Login</h2>
        <div className="login-form">       
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" autoComplete="off" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary text-center" >Submit</button>
                <p className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Login