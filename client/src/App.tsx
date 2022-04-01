import { useState, useEffect } from 'react';
import Axios from "axios";
import { HomePage }  from './pages/Home'
import { Login } from '../src/components/Login'
import { Routes, Route, Navigate} from 'react-router-dom'

const App = () => {  
  const [loggedIn, setLoggedIn] = useState(false)

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      if (response.data.loggedIn === true ) {
        setLoggedIn(true);
      } 
    });
  }, []);

  const handleLogout = () => {
        setLoggedIn(false);
   }

  return (
    <Routes>
     {!loggedIn ? <Route path='/' element={<Login />} /> : <Route path='/' element={<Navigate replace to="/home" />} /> }
     {loggedIn  ? <Route path='/home' element={<HomePage handleLogout={handleLogout} />} /> :  <Route path='/home' element={<Navigate replace to="/" />} />}
    </Routes>
  )
}

export default App;