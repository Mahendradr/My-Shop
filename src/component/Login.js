import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"
import axios from 'axios';


const Login = () => {

  const [credencial,setCredencial] = useState({email:"", password:""})
  const [errorMessage, setErrorMessage] = useState({validEmail:"",validPass:""});
  const [credencialError, setCredencialError] = useState({incorrectEmail:"",incorrectPass:""});
  let navigate = useNavigate();
  localStorage.removeItem('user');
  localStorage.removeItem("isAuthenticated");

  const onChange = (e) => {
    setCredencial({...credencial, [e.target.name]: e.target.value});
  };

  const validateInput = () => {
    const newErrors = {};

    if (!credencial.email) {
      newErrors.validEmail = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credencial.email)) {
      newErrors.validEmail = '*Email is invalid';
    }

    if (!credencial.password) {
      newErrors.validPass = '*Password is required';
    }
    setErrorMessage(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    validateInput();
    if(validateInput()){

    const API_URL = "https://67a31cd8409de5ed52576fba.mockapi.io/user";
    let error={};
    try {        
        // Make an API call to the mock API endpoint
        const response = await axios.get(API_URL, { params: { email: credencial.email }});

        // Check if user exists and credentials are correct
          if (response.data.length > 0) {
            if(credencial.password===response.data[0].password){
              localStorage.setItem("user", JSON.stringify(response.data));
              localStorage.setItem("isAuthenticated", "true");
              navigate("/");
            }else{             
              error.incorrectPass="* Please Enter Correct Password";
              setCredencialError(error);
            };
          } 
        } catch (error) {
          error.incorrectPass="* Please Enter Correct Credencial";
          setCredencialError(error);
        }
      }
    };

  return (
    <div className="login-body">
      <div className="login-main">
        <h2>Login</h2>

        {credencialError.incorrectEmail && <div style={{ color: 'red',textAlign:'center', marginTop: '5px'}}>{credencialError.incorrectEmail}</div>}
        {credencialError.incorrectPass && <div style={{ color: 'red',textAlign:'center', marginTop: '5px'}}>{credencialError.incorrectPass}</div>}
          
          <div className="login-form">       
              <form onSubmit={handleSubmit}>

                  <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control" name="email" value={credencial.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                      {errorMessage.validEmail && <div style={{ color: 'red', marginTop: '5px', fontSize:'small'}}>{errorMessage.validEmail}</div>}
                  </div>

                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" name="password" value={credencial.password} onChange={onChange} id="password" autoComplete="off" placeholder="Password" />
                      {errorMessage.validPass && <div style={{ color: 'red', marginTop: '5px', fontSize:'small'}}>{errorMessage.validPass}</div>}
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