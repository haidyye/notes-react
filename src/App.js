import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import Register from './Pages/Register/register';
import Login from './Pages/Login/login';
import Protected from './Pages/Protected/protected';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Login/> } />
      <Route path='login' element={ <div className='container'> <Login/> </div>  } />

      <Route path='home' element={ <Protected> <Home/> </Protected> } />
      <Route path='register' element={<div className='container'> <Register/></div> } />

    </Routes>
    
    </>
  )
}

export default App;
