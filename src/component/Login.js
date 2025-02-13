import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"
import axios from 'axios';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/action/action';


const Login = (props) => {

  // const { showAlert } = props
  const dispatch = useDispatch();

  const [credencial,setCredencial] = useState({email:"", password:""})
  const [errorMessage, setErrorMessage] = useState({validEmail:"",validPass:"",incorrectEmail:"",incorrectPass:""});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if(localStorage.getItem('user')){   
        localStorage.removeItem('user');
        localStorage.removeItem("isAuthenticated");
        dispatch(logout());
      }      
    }, 200); // Change state after 2 seconds (this is just an example)
    // eslint-disable-next-line
  }, []); 

  let navigate = useNavigate();
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
      setLoading(true);
      const API_URL = "https://67a4b5dbc0ac39787a1c367e.mockapi.io/users";
      let errorUserPass={};
      try {        
        const response = await axios.get(API_URL);
          const users = response.data;
          const user = users.find(u => u.email === credencial.email);         
          if (user) {
            if(credencial.password===user.password){
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("isAuthenticated", "true");    
              dispatch(login(user));
              props.showAlert("Login Successfully","primary")              
              navigate("/");             
            }else{             
              errorUserPass.incorrectPass="* Please Enter Correct Password";
              setErrorMessage(errorUserPass);
              setLoading(false);
            };
          }else{
            errorUserPass.incorrectPass="* Please Enter Correct Credencial";
            setErrorMessage(errorUserPass);
            setLoading(false);
          } 
        } catch (error) {
          console.log(error)        
        }
      }
    };

  return (
    <div className="login-body">
      <div className="login-main">
        <h2>Login</h2>
        {loading && <Loading/>}
        {errorMessage.incorrectEmail && <div style={{ color: 'red',textAlign:'center', marginTop: '5px'}}>{errorMessage.incorrectEmail}</div>}
        {errorMessage.incorrectPass && <div style={{ color: 'red',textAlign:'center', marginTop: '5px'}}>{errorMessage.incorrectPass}</div>}
          
          <div className="login-form">       
              <form onSubmit={handleSubmit}>

                  <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email"  className="form-control" name="email" value={credencial.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
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