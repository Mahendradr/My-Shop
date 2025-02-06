import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import axios from 'axios';

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  let navigate = useNavigate();
  const API_URL = "https://67a31cd8409de5ed52576fba.mockapi.io/user";

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(API_URL, {
            params: { email }, // query parameter to search by email
          });     
      if (response) {
        return response.data.length > 0;
      }else{
        return false;
      }  
    } catch (error) {
      return false; // or handle the error as needed
    }
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        alert("user already exists")
      }else{     
        const response = await axios.post(API_URL, { name, email, password });
        if(response){  
          navigate("/login");           
        }
      }} catch (error) {
        throw error;
      }
    
  }

  // const onChange =(e)=>{
  //   setEmail({...email, [e.target.name]: e.target.value});
  //   setName({...name, [e.target.name]: e.target.value});
  //   setPassword({...password, [e.target.name]: e.target.value});
  // }

  return (
    <div className="signup-body">
      <div className="signup-main">
      <h2>Signup</h2>
        <div className="signup-form">       
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control"  id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" />
              </div>  
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name='password' autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Signup
