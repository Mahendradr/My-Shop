import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Products from './Products';
import Loading from './Loading';

const Home = (props) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async() => {

    // let user = localStorage.getItem('user');
    // user = JSON.parse(user);
    // console.log(user[0].id)
    const API_URL = "https://67a31cd8409de5ed52576fba.mockapi.io/product";
    try {
      const response = await axios.get(API_URL);
        if (response.data.length > 0) {
          setProducts(response.data);
          setLoading(false);
        } 
      } catch (error) {
        alert("Some Error Occur");
      }
  }
  
  useEffect(()=>{
      fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className='text-center my-3'>List of Product</h1>
      {loading && <Loading/>}
      <Products products={products} />      
    </div>
  )
}

export default Home
