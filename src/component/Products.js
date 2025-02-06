import React, { useState } from 'react'
import ProductItem from './ProductItem'

const Products = (props) => {
  const { products } = props;
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentItems);

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
        <div className='container'>
            <div className='row'>
                {currentProducts.map( (element)=>{
                    return(
                    <div className="col-md-4" key={element.p_id}>
                        <ProductItem p_name={element.p_name}
                                     description={element.description}
                                     stock={element.stock}
                                     price={element.price}
                        />                                           
                    </div>
                    )
                })}
            </div>
          </div>
      </div>
      <div className='container d-flex justify-content-between'>
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>Prev</button>
            <div className="d-flex justify-content-between text-light bg-dark p-2">{page}</div>
            <button disabled={page * pageSize >= products.length} type="button" className="btn btn-dark" onClick={handleNextClick}>next</button>
        </div>
    </div>
  )
}

export default Products
