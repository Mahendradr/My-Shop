import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Aboutus from './component/Aboutus';
import Signup from './component/Signup';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Alert from './component/Alert';
import { useState } from 'react';

function App() {

  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },5000) 
  }

  return (
    <div className="App">
      
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <Routes>        
          <Route exact path="/" element={<Home />} />
          <Route exact  path="aboutus" element={<Aboutus />} />
          <Route exact  path="login" element={<Login showAlert={showAlert}/>} />
          <Route exact  path="signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
