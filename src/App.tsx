import { useState, useEffect } from 'react';
import Axios from "axios";
import { HomePage }  from './pages/Home'
import { Login } from '../src/components/Login'
import { Routes, Route, Navigate} from 'react-router-dom'

const App = () => {  
  const [loggedIn, setLoggedIn] = useState('')

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://financiera-nako.vercel.app/").then((response) => {
      if (response.data.loggedIn === true) {
        setLoggedIn(response.data.user[0]);
      }
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