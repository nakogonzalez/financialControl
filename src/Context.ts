import React, { createContext, useState } from 'react'

export const Context = createContext()

function Provider({ children }) {
    const [isAuth, setIsAuth] = useState(() => {
        return window.sessionStorage.getItem('token')
    })

    const value = {
        isAuth,
        activateAuth: token => {
            setIsAuth(true)
            window.sessionStorage.setItem('token', token)
        },
        removeAuth: () => {
            setIsAuth(false)
            window.sessionStorage.removeItem('token')
        }
    }

    return (
        <Context.Provider>value) = { value } >
        { children }
        < /Context.Provider>/
}
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}
