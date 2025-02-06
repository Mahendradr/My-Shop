import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Products from './Products';

const Home = () => {

  const [products, setProducts] = useState([]);
  let navigate = useNavigate();

  const fetchProducts = async() => {
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

  useEffect(()=>{
    if(localStorage.getItem('user')){
      fetchProducts();
    }else{
        navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Products products={products} />      
    </div>
  )
}

export default Home
