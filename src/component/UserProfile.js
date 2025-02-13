import React, {  useContext, useEffect, useState } from 'react'
import "../App.css"
import { useDispatch } from 'react-redux';
import { logout, login } from '../redux/action/action';
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../images/user.png';
import UserContext from '../context/user/UserContext';
import Loading from './Loading';
import axios from 'axios';

const UserProfile = (props) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [originalData, setOriginalData] = useState({});
    const [user,setUser] = useState({name:"", email:"", password:""})
    const [editEnable,setEditEnable] = useState(true)
    const [errorMessage, setErrorMessage] = useState({validName:"",validEmail:"",validPass:"",validUser:""});   
    const context = useContext(UserContext);
    const { checkEmailExists, deleteUser, getUserOrders } = context;

    useEffect(()=>{
        if(localStorage.getItem('user')){ 
            let userData = JSON.parse(localStorage.getItem('user'));
            setUser(userData);
            setOriginalData(userData)
            getUserOrders(userData.id)
        }else{
            navigate("/login")
        }
        // eslint-disable-next-line
      }, []);

    const handleLogout=()=>{
        localStorage.removeItem('user');
        localStorage.removeItem("isAuthenticated");
        props.showAlert("Logout Successfully","Danger")
        dispatch(logout())
        navigate("/login")
    }
    const handleDelete=(id)=>{        
        deleteUser(id);
        localStorage.removeItem('user');
        localStorage.removeItem("isAuthenticated");       
        dispatch(logout())
        props.showAlert("Account Deleted Successfully","Danger")
        navigate("/signup")       
    }
  
    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
      };

      const handleSubmit = async(e) =>{
        e.preventDefault();
        let errorUser={}
        if(editEnable){
            setEditEnable(false);
        }else{
           validateInput();
            if(validateInput()){
                // console.log(originalData)
                if(JSON.stringify(user) === JSON.stringify(originalData)){
                    setEditEnable(true);
                }else{
                    try{
                        // console.log(user.email)
                        setLoading(true);
                        if(user.email===originalData.email){
                            // console.log(user)
                            const response = await axios.put(`https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${user.id}`,user);
                              if(response){  
                                dispatch(logout());
                                localStorage.removeItem('user')
                                dispatch(login(user));
                                localStorage.setItem("user", JSON.stringify(user));                               
                                setLoading(false);
                                setEditEnable(true);
                                props.showAlert("User Updated Successfully","primary")
                              }
                        }else{                       
                            const emailExists = await checkEmailExists(user.email);
                            // console.log(emailExists)
                            if (emailExists) {       
                                errorUser.validUser="* User Already Exists With this email";         
                                setErrorMessage(errorUser);
                                setLoading(false);
                            }else{
                                // console.log(user)
                                const response = await axios.put(`https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${user.id}`,user);
                                    if(response){  
                                        dispatch(logout());
                                        localStorage.removeItem('user')
                                        dispatch(login(user));
                                        localStorage.setItem("user", JSON.stringify(user));                               
                                        setLoading(false);
                                        setEditEnable(true);
                                        props.showAlert("User Updated Successfully","primary")
                                    }
                                }
                        }
                    }catch (error) {
                        setLoading(false);
                        throw error;
                    } 
                }
            }
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
    <>
        <div className="user-body">
            <div className="user-main">
                <div>
                    <img className="my-2" src={userIcon} alt="userIcon" width={50} height={50}></img>
                    <Link className="float-right" to="/orders">
                        <button className="btn btn-primary float-right">My Orders</button>
                    </Link>
                </div>               
                {loading && <Loading />}
                {errorMessage.validUser && <div style={{ color: 'red',textAlign:'center', marginTop: '5px' }}>{errorMessage.validUser}</div>}
                <div className="user-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input disabled={editEnable} type="text" className="form-control" id="name" name='name' value={user.name} onChange={onChange} placeholder="name" />
                            {errorMessage.validName && <div style={{ color: 'red', marginTop: '5px',fontSize:'small' }}>{errorMessage.validName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input disabled={editEnable} type="email" className="form-control"  id="email" name='email' value={user.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                            {errorMessage.validEmail && <div style={{ color: 'red', marginTop: '5px', fontSize:'small'}}>{errorMessage.validEmail}</div>}
                        </div>  
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input disabled={editEnable} type="password" className="form-control" id="password" name='password' autoComplete="off" value={user.password} onChange={onChange} placeholder="Password" />
                            {errorMessage.validPass && <div style={{ color: 'red', marginTop: '5px' ,fontSize:'small'}}>{errorMessage.validPass}</div>}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary text-center">{editEnable?"Edit User":"Update"}</button>
                        </div>
                    </form>          
                </div>
                <div style={{padding:"1px",backgroundColor: "#f0f2f5",margin: "5px"}}></div>
                <div>
                    <button onClick={handleLogout} className="btn btn-primary my-2">Logout</button>
                    <button onClick={()=>{handleDelete(user.id)}} className="btn btn-primary float-right my-2">Delete User</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfile
