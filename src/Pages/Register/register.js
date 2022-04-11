import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Register (){
    const [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();
    const [isLoading , setIsLoading] = useState('');
    const [err , setErr] = useState('');
    const [user , setUser] = useState({
        first_name: '',
        last_name: '',
        age:0,
        password: '',
        email: ''
    });

    function getUser(e){
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(user)
    } ;

    
   async function submitForm(e){
        e.preventDefault();
        setIsLoading(true)
        let validateResult =  validateRegisterForm(user)
        if(validateResult.error){
        setErrorList(validateResult.error.details)
        
        }
       
        else{
          let response = await axios.post("https://routeegypt.herokuapp.com/signup" , user)
          console.log(response.data)
         
          if(response.data.message === 'success'){
           setIsLoading(false)
           navigate('/login')
          }
        
          else{
            setErr(response.data.message)
            setIsLoading(false)

         }
           }
        
    };
 
    function validateRegisterForm(user){
      let schema = Joi.object({
        first_name:Joi.string().alphanum().min(3).max(8).required(),
        last_name:Joi.string().alphanum().min(3).max(8).required(),
        age:Joi.number().min(16).max(80).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
 
      })
      return schema.validate(user, {abortEarly:false})
     }
 

    return <>
    <h2 className=' my-3'> Register Now</h2>
    {errorList.map( (error, index) => {
     
     if(index === 4 ){
       return <div key={index} className='alert alert-danger'> password invalid </div>
      }
      else{
       return <div key={index} className='alert alert-danger'> {error.message} </div>
      }
      
    }
    )}


      {err?  <div className='alert alert-danger'>{err} </div> : ''} 
    <form className='py-4' onSubmit={ submitForm}>
     <label htmlFor='first_name'>First name:</label>
     <input onChange={getUser} type='text' className='form-control my-3' name='first_name' id='first_name' />
       
      
       <label htmlFor='last_name'>Last name:</label>
        <input onChange={getUser} type='text' className='form-control my-3' name='last_name' id='last_name' />
       
      
       <label htmlFor='age'>Age:</label>
        <input onChange={getUser} type='number' className='form-control my-3' name='age' id='age' />
       
      
       <label htmlFor='email'>Email:</label>
        <input onChange={getUser} type='email' className='form-control my-3' name='email' id='email' />
       
      
       <label htmlFor='password'>Password:</label>
        <input onChange={getUser} type='password' className='form-control my-3' name='password' id='password' />
       
       <button className='btn btn-outline-info mx-end'> 
       {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Register'}</button>

     </form>

    </>
}

export default Register