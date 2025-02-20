import React from 'react'
import myImage from '../images/productImage.JPG';
import { Link } from 'react-router-dom';

const ProductList = (props) => {
    // console.log(props.title)
    let {p_id,price, stock, p_name } = props;
  return (
    <div>
      <div className="card my-3" style={{width: '18 rem'}} >
        <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-${stock===0?"danger":"success"}`} style={{left:'80%',zIndex:1}} >{stock===0?"Out of stock":"Available"}</span>
          <img className="card-img-top" src={myImage} alt="Card img cap"/> 
          <div style={{padding:"1px",backgroundColor: "#f0f2f5",margin: "8px"}}></div>
            <div className="card-body">
                <h5 className="card-title">{p_name}</h5>
                <p className="card-text">{price} $ </p>
                <Link to={`/product/${p_id}`}>Know More</Link>
            </div>
        </div>       
      </div>
  )
}

export default ProductList;