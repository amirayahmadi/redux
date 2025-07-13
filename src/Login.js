import React from 'react'
import { useDispatch } from 'react-redux'
import {login} from "./features/user"
const Login = () => {
    const dispatch = useDispatch();
  return (
    <div>
      <button onClick={()=>
                    dispatch
                    (
                        login({
                                name:"amira" ,
                                email:"amira@gmail.com" ,
                                role:"admin"
                            })
                    )
                }
                > se connecter !</button>
    </div>
  )
}

export default Login
