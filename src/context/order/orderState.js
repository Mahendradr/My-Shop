import React, { useState } from "react";
import axios from "axios";
import OrderContext from "./orderContext";

const OrderState = (props)=>{

    const makeOrder = []
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(makeOrder);
    const [products, setProducts] = useState([]);
    const [orderExists, setOrderExist] = useState(true);

    const getOrders = async(id)=>{
        const API_URL=`https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${id}/orders`;
              try {
                const response = await axios.get(API_URL);
                  if (response.data.length > 0) {
                    setOrders(response.data);
                    setOrderExist(true)
                  } else{
                    setOrderExist(false);
                  }
                } catch (error) {
                  console.log(error)
                  setOrderExist(false);
                }
                
      setLoading(false);
    }

    const getProduct = async()=>{
      const API_URL = "https://67a31cd8409de5ed52576fba.mockapi.io/product";
            try {
              const response = await axios.get(API_URL);
                if (response.data.length > 0) {
                  setProducts(response.data);
                } 
              } catch (error) {
                alert("Some Error Occur");
              }
  }

  const deleteOrder = async(user_id, order_id)=>{
    setLoading(true);
    try {    
      const API_URL=`https://67a4b5dbc0ac39787a1c367e.mockapi.io/users/${user_id}/orders/${order_id}`;   
      // Make an API call to the mock API endpoint
      const response = await axios.delete(API_URL);  

      if (response) {
        const newOrders = orders.filter(item => item.order_id !== order_id);
        if(newOrders.length>0){
          setOrderExist(true)
        }else{setOrderExist(false)}
        setOrders(newOrders);
        setLoading(false);
      }
    } catch (error) {
        console.error('Error deleting user:', error.response || error.message);
        setLoading(false);
    }
  }
  
    return(
        <OrderContext.Provider value={{ loading, orderExists, orders, products,deleteOrder, getOrders, getProduct }}>
            {props.children}
        </OrderContext.Provider>
      )
}
export default OrderState