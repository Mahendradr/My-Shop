import React, { useState } from 'react'
// import UserContext from '../context/user/UserContext';


const EditUser = (props) => {

    const [errorMessage, setErrorMessage] = useState({validName:"",validEmail:"",validPass:"",validUser:""});
    const [user,setUser] = useState({name:"", email:"", password:""})
    const{ item } = props;
    setUser(item);
    console.log(user)

    const onChange = (e) => {
        setUser({...item, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        validateInput();
        if(validateInput()){
            console.log("hiiiiiiiii")
        }

    }

    const validateInput = () => {
        const newErrors = {};
    
        if (!user.name) {
          newErrors.validName = '*Name is required';
        }else if (user.name.length < 3) {
          newErrors.validName = '*Name must be at least 3 characters';
        }
    
        if (!user.email) {
          newErrors.validEmail = '*Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
          newErrors.validEmail = '*Email is invalid';
        }
    
        if (!user.password) {
          newErrors.validPass = '*Password is required';
        } else if (user.password.length < 6) {
          newErrors.validPass = '*Password must be at least 6 characters';
        }
        setErrorMessage(newErrors);
        // Return true if no errors
        return Object.keys(newErrors).length === 0;
      };

  return (
    <div>
        <div className="user-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={user.name} onChange={onChange} placeholder="name" />
                    {errorMessage.validName && <div style={{ color: 'red', marginTop: '5px',fontSize:'small' }}>{errorMessage.validName}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control"  id="email" name='email' value={user.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                    {errorMessage.validEmail && <div style={{ color: 'red', marginTop: '5px', fontSize:'small'}}>{errorMessage.validEmail}</div>}
                </div>  
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' autoComplete="off" value={user.password} onChange={onChange} placeholder="Password" />
                    {errorMessage.validPass && <div style={{ color: 'red', marginTop: '5px' ,fontSize:'small'}}>{errorMessage.validPass}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>      
    </div>
  )
}

export default EditUser
