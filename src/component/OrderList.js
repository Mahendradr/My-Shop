import React, { useContext } from 'react'
import myImage from '../images/productImage.JPG';
import OrderContext from '../context/order/orderContext';
import "../App.css";

const OrderList = (props) => {
    const { order } = props;
    const context = useContext(OrderContext);
    const { products, deleteOrder } = context;
    const p_id = order.p_id;   
    const productData = products.find(item => item.p_id === p_id);
    const status = order.status

  return (
    <div className="order-data">
        <div className="row">
            <div className="col-md-3">
                <img className="card-img-top border border-dark" src={myImage} alt="Card img cap"/>
            </div>
            <div className="col-md-5">
            {productData?
                <ul>                
                    <li>Name : {productData.p_name}</li>
                    <li>Price : {productData.price}</li>
                </ul>
                :<ul></ul>              
            }
            </div>
            <div className="col-md-4">
                <ul>
                    <li>quantity : {order.quantity}</li>
                    <li>Status : {status}</li>
                    <li>Total : {order.total}</li>
                </ul>
            </div>               
        </div>
        {status==="completed"?
            <div className="row text-center text-success"><h4 className="col-md-12">Order Completed</h4></div>
            : 
            <div className="row text-center">
                <div className="col-md-12">
                    <button type="submit" onClick={()=>{deleteOrder(order.userId,order.order_id)}} className="btn btn-primary">cancel order</button>
                </div>
            </div>              
        }
    </div>
  )
}

export default OrderList
