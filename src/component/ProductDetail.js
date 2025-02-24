import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Product from './Product';

const ProductDetail = (props) => {
  const { showAlert } = props 
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const getProductDetail = async (id) => {
    try {
      const response = await axios.get(`https://67a31cd8409de5ed52576fba.mockapi.io/product/${id}`);     
      if (response) {
        setProduct(response.data);
        setLoading(false);      
      }else{
        return false;
      }  
    } catch (error) {
      alert(error.message)
      console.log(error.message);
      return false;
    }
  };

  useEffect(()=>{
    getProductDetail(id);  
    // eslint-disable-next-line    
  }, []);

  return (
    <div>
      <div className="product-body">
        <div className="product-main">
          <h1 className="my-3 text-center">Product Detail</h1>
            <Product product={product} loading={loading} showAlert={showAlert} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;
