import React from 'react'
import myImage from '../images/productImage.JPG';

const ProductItem = (props) => {
    // console.log(props.title)
    let {price, stock, p_name, description} = props;
  return (
    <div className='my-3'>
      <div className="card" style={{width: '18 rem'}} >
        <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-${stock===0?"danger":"success"}`} style={{left:'80%',zIndex:1}} >{stock===0?"Out of stock":"Available"}</span>
          <img className="card-img-top" src={myImage} alt="Card img cap"/> 
            <div className="card-body">
                <h5 className="card-title">{p_name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">{price}</p> $ 
                {/* <small className="text-muted">By {!author?"Unknown":author} on {publishedAt}</small><br/> */}
                {/* <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a> */}
            </div>
        </div>       
      </div>
  )
}

export default ProductItem