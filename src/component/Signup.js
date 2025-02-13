import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import axios from 'axios';
import Loading from './Loading';

const Signup = (props) => {

  const [credencial,setCredencial] = useState({name:"", email:"", password:""})
  const [errorMessage, setErrorMessage] = useState({validName:"",validEmail:"",validPass:"",validUser:""});
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredencial({...credencial, [e.target.name]: e.target.value});
  };

  const validateInput = () => {
    const newErrors = {};

    if (!credencial.name) {
      newErrors.validName = '*Name is required';
    }else if (credencial.name.length < 3) {
      newErrors.validName = '*Name must be at least 3 characters';
    }

    if (!credencial.email) {
      newErrors.validEmail = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credencial.email)) {
      newErrors.validEmail = '*Email is invalid';
    }

    if (!credencial.password) {
      newErrors.validPass = '*Password is required';
    } else if (credencial.password.length < 6) {
      newErrors.validPass = '*Password must be at least 6 characters';
    }
    setErrorMessage(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const API_URL = "https://67a4b5dbc0ac39787a1c367e.mockapi.io/users";

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(API_URL); 
      const users = response.data;
      const user = users.find(u => u.email === credencial.email);    
      if (user) {
        return true;
      }else{
        return false;
      }  
    } catch (error) {
      return false; // or handle the error as needed
    }
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    let errorUser={}
    validateInput();

    if(validateInput()){

      setLoading(true);
      try {
        const emailExists = await checkEmailExists(credencial.email);
        if (emailExists) {         
          errorUser.validUser="* User Already Exists";         
          setErrorMessage(errorUser);
          setLoading(false);
        }else{     
          const response = await axios.post(API_URL, 
            { name:credencial.name, email: credencial.email, password: credencial.password }
          );
          if(response){  
            props.showAlert("Acount Created Successfully","primary")
            navigate("/login");           
          }
        }} catch (error) {
          setLoading(false);
          throw error;
        }  
    }
  }

  return (
    <>
    <div className="signup-body">
      <div className="signup-main">
        <h2>Signup</h2>
        {loading && <Loading />}
        {errorMessage.validUser && <div style={{ color: 'red',textAlign:'center', marginTop: '5px' }}>{errorMessage.validUser}</div>}
          <div className="signup-form">       
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" name='name' value={credencial.name} onChange={onChange} placeholder="name" />
                  {errorMessage.validName && <div style={{ color: 'red', marginTop: '5px',fontSize:'small' }}>{errorMessage.validName}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control"  id="email" name='email' value={credencial.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                  {errorMessage.validEmail && <div style={{ color: 'red', marginTop: '5px', fontSize:'small'}}>{errorMessage.validEmail}</div>}
                </div>  
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" name='password' autoComplete="off" value={credencial.password} onChange={onChange} placeholder="Password" />
                  {errorMessage.validPass && <div style={{ color: 'red', marginTop: '5px' ,fontSize:'small'}}>{errorMessage.validPass}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
              </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup
