import React from "react";
import {Link} from 'react-router-dom'
class Navbar extends React.Component{
    render(){
        return (
            <>
               <div className='navbarComponent'>

<nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
<div className="container-fluid">
<Link className="navbar-brand fw-bolder" to="home"> Notes </Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarSupportedContent">


<ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

  <li className="nav-item">
    <Link className="nav-link text-white" to="login">Login</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white"to="register"> Register </Link>
  </li>
  
</ul>
</div>
</div>
</nav>

</div>
            
            
            </>
        )
    }
}
export default Navbar