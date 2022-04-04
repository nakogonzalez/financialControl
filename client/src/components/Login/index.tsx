import { useState, useEffect } from 'react'
import * as C from './styles';
import Axios from 'axios'

export const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    Axios.defaults.withCredentials = true;
    
    // http://localhost:3001/ && https://financiera-back.herokuapp.com/

    const handdleLogin = () => {
      Axios.post('https://financiera-back.herokuapp.com/', {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.auth) {
          localStorage.setItem('token', response.data.token)
        }
        console.log(response.data.token)
      })
    }

    return (
        <C.Container>
          <C.Form>
            <C.InputLabel>
              <C.InputTitle  >Usuario</C.InputTitle>
              <C.Input 
                type='text' 
                placeholder='Usuario...' 
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
              />
              <C.InputTitle>Contraseña</C.InputTitle>
              <C.Input 
                type='password' 
                placeholder='Contraseña...' 
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <C.Button onClick={handdleLogin} >Login</C.Button>
            </C.InputLabel>
          </C.Form>
         
        </C.Container>
    )
}
