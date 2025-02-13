import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Alert from './component/Alert';
import { useState } from 'react';
import ProductDetail from './component/ProductDetail';
import StateUser from './context/user/StateUser';
import Orders from './component/Orders';
import OrderState from './context/order/orderState';
import UserProfile from './component/UserProfile';

function App() {

  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },3000) 
  }

  return (
    <div className="App">
      <StateUser>
        <OrderState>
          <Router>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert}/>
            <Routes>        
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact  path="login" element={<Login showAlert={showAlert}/>} />
              <Route exact  path="signup" element={<Signup showAlert={showAlert}/>} />
              <Route exact path="product/:id" element={<ProductDetail showAlert={showAlert}/>} />
              <Route exact  path="userProfile" element={<UserProfile showAlert={showAlert}/>} />
              <Route exact  path="orders" element={<Orders showAlert={showAlert}/>} />
            </Routes>
          </Router>
        </OrderState>
      </StateUser>
    </div>
  );
}

export default App;
