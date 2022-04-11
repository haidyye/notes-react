import React from 'react'
import {Navigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Home from '../Home/home'
function Protected(){
 let token = localStorage.getItem("token")

try{
    jwt_decode(token)
}catch(error){
    return <Navigate to='/login'/>
}
  return <Home/>
}

export default Protected