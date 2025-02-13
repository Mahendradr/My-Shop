import React, { useState } from 'react'
import ProductList from './ProductList';

const Products = (props) => {
  const { products } = props;
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);;

  const handlePrevClick =  ()=>{
      if (page > 1) {
        setPage(page - 1); 
      }    
  }
  const handleNextClick = ()=>{
    if (page * pageSize < products.length) {
      setPage(page + 1);
    } 
  }

  return (
    <div>
      <div className="container my-2">
            <div className='row'>
                {currentProducts.map( (element)=>{
                    return(
                    <div className="product-item col-md-4" key={element.p_id} >
                        <ProductList  p_id={element.p_id}
                                      p_name={element.p_name}
                                     description={element.description}
                                     stock={element.stock}
                                     price={element.price}
                        />                                           
                    </div>
                    )
                })}
            </div>
      </div>
      <div className='container d-flex justify-content-between my-3'>
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>Prev</button>
            <div className="d-flex justify-content-between text-light bg-dark p-2">{page}</div>
            <button disabled={page * pageSize >= products.length} type="button" className="btn btn-dark" onClick={handleNextClick}>next</button>
        </div>
    </div>
  )
}

export default Products
