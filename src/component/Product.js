import React, { useState } from 'react'
import myImage from '../images/productImage.JPG';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const Product = (props) => {
    const user = useSelector(state => state.user);
    const { product, loading} = props
    const [quantity, setQuantity] = useState(1);
    const status = "Pending";
    let total = product.price
    let features = product.features || []  
    const navigate = useNavigate();
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
      if(user){            
        const user_id = user.id;
        total = quantity*product.price; 
        const API_URL="https://67a4b5dbc0ac39787a1c367e.mockapi.io/orders"
        try {        
              const response = await axios.post(API_URL, 
                { userId:user_id, p_id: product.p_id, total:total, quantity:quantity, status:status }
              );
              if(response){  
                navigate("/orders");     
              }
            } catch (error) {
              throw error;
            }
          }else{
            navigate("/login");  
            props.showAlert("Please Login To Place Order","danger")         
          }
    }

  return (
    <div>     
      {loading && <Loading />}
          <div className="row">         
            {product && (!loading)?          
              <div className="col-md-5">
                <div className="card my-3" style={{width: '18 rem'}} >
                    <img className="card-img-top" src={myImage} alt="Card img cap"/> 
                    <div className="card-body">
                          <h5 className="card-title">{product.p_name}</h5>
                          <h5 className="card-title">{product.price} $</h5>
                          <form onSubmit={handleSubmit}>
                              <input type="number" id="quantity" name="quantity" min="1" max={product.stock} value={quantity}
                                  onChange={(e) => setQuantity(Number(e.target.value))}
                              />
                              <button type="submit" value="Submit" className="btn btn-primary">Place Order</button>
                          </form>
                          <Link to="/">Show more product</Link>
                          <p className="card-text"></p>              
                    </div>
                  </div>
                </div>:<></>
              }

              <div className="col-md-7">
                {product && (!loading)?
                  <div className="card my-3" style={{width: '18 rem'}} >
                      <div className="card-body">
                        <h2>Description</h2>
                        <p className="card-title">{product.description}</p>
                        <h2 className="card-text">Category</h2>
                        <p className="card-text">{product.category}</p>
                        <h2>Features</h2>
                          <ul>
                            {Object.values(features).map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                      </div>
                    </div>:<></>
                  }
              </div>
          </div>
    </div>
  )
}

export default Product
