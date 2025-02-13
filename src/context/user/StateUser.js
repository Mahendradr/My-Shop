import React, { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const StateUser = (props)=>{

    // const API_URL = "https://67a4b5dbc0ac39787a1c367e.mockapi.io/users";
    const useUserData = []

    const [userData, setUserData] = useState(useUserData);
    const [userOrders, setUserOrders] = useState();
    // const [ userOrderExists, setUserOrderExists] = (false)
    const [userOrderExists, setUserOrderExists] = useState(false);

    const checkEmailExists = async (email) => {
      try {
        const response = await axios.get(`https://67a4b5dbc0ac39787a1c367e.mockapi.io/users`); 
        const users = response.data;       
        const userWithEmail = users.find(u => u.email === email);    
        // console.log(userWithEmail)
        if (userWithEmail) {
          return true;
        }else{
          return false;
        }  
      } catch (error) {
        return false; // or handle the error as needed
      }
    };

    const deleteUserOrders = async(userId)=>{
        try {
            userOrders.forEach(async (userOrder) => {
              const response = await axios.delete(`https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${userId}/orders/${userOrder.order_id}`);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getUserOrders = async(userId)=>{
        const API_URL=`https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${userId}/orders`;
              try {
                const response = await axios.get(API_URL);
                  if (response.data.length > 0) {
                    setUserOrders(response.data);
                    setUserOrderExists(true)
                    return true;
                  } else{
                    setUserOrderExists(false);
                    return false;
                  }
                } catch (error) {
                  console.log(error)
                }
    }


    const deleteUser = async(userId)=>{
      if(!userOrderExists){
            try {    
              const API_URL = `https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${userId}`;    
              const response = await axios.delete(API_URL);        
              if (response) {
                setUserData([]); 
              }else{
                return false;
              }
            } catch (error) {
                console.log(error)
                console.error('Error deleting user:', error.response || error.message);
            }
      }else{
        deleteUserOrders(userId);
        try {    
          const API_URL = `https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${userId}`;    
          const response = await axios.delete(API_URL);        
          if (response) {
            setUserData([]); 
          }else{
            return false;
          }
        } catch (error) {
            console.log(error)
            console.error('Error deleting user:', error.response || error.message);
        }
      }
  
      // console.log(id)
      // try {    
      //   const API_URL = `https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${id}`;    
        
      //   // Make an API call to the mock API endpoint
      //   const response = await axios.delete(API_URL);  
  
      //   if (response) {
      //     // deleteUserOrders(id);
      //     setUserData([]); 
      //   }
      // } catch (error) {
      //     console.log(error)
      //     console.error('Error deleting user:', error.response || error.message);
      // }
    }

    const updateUser = async(id)=>{
      try {    
        const url = `https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${id}`;    
        // Make an API call to the mock API endpoint
        const response = await axios.delete(url);  
  
        if (response) {
          console.log('User deleted successfully');
          setUserData([]); 
          localStorage.removeItem('user');
          localStorage.removeItem("isAuthenticated");   
        }
      } catch (error) {
          console.log(error)
          console.error('Error deleting user:', error.response || error.message);
      }
    }
    // console.log(user); 
    return(
      <UserContext.Provider value={{ getUserOrders, checkEmailExists, userData, deleteUser, updateUser }}>
          {props.children}
      </UserContext.Provider>
  )
}

export default StateUser