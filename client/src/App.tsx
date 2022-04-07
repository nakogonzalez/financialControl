import { useState, useEffect } from 'react';
import Axios from "axios";
import { HomePage }  from './pages/Home'
import { Login } from '../src/components/Login'
import { Routes, Route, Navigate} from 'react-router-dom'

const App = () => {  
  const [loggedIn, setLoggedIn] = useState(false)

  Axios.defaults.withCredentials = true;

   // http://localhost:3001/ && https://financiera-back.herokuapp.com/
   
  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      if (response.data.loggedIn === true ) {
        setLoggedIn(true);
      } 
      console.log(response.data.loggedIn)
    });
  }, []);

  return (
    <Routes>
     {!loggedIn ? <Route path='/' element={<Login />} /> : <Route path='/' element={<Navigate replace to="/home" />} /> }
     {loggedIn  ? <Route path='/home' element={<HomePage />} /> :  <Route path='/home' element={<Navigate replace to="/" />} />}
    </Routes>
  )
}

export default App;