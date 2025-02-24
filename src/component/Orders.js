// import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OrderContext from '../context/order/orderContext';
import OrderList from './OrderList';
import Loading from './Loading';

const Orders = (props) => {
  let showLoading = true;
  const { showAlert }= props;
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const context = useContext(OrderContext);
  const { loading, orderExists, orders, getProduct, getOrders } = context;
  if(!loading){
    showLoading = loading;
  }
  useEffect(()=>{
    setTimeout(() => {
      if(localStorage.getItem('user')){
        
        getOrders(user.id);
        getProduct();
      }else{
        navigate("/login");
      }
    }, 2000);
        // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="orders-body ">
        <div className="orders-main">
          <h2>My Orders</h2>
          {showLoading && <Loading />}
          { orderExists ? <div>{orders.map((order) => (<OrderList  key={order.order_id} showAlert={showAlert} order={order} />))}</div>
                        : <div className="text-center"><h1>No Orders Found</h1></div>
          }
            <div className="text-center">
              <Link to="/">Show more products</Link>
            </div>
        </div>       
      </div>
    </>
  )
}

export default Orders
