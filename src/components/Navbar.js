import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

function Navbar() {

    const location = useLocation();
    let navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <Link className= {`nav-link ${location.pathname==="/" ? "active" : " "}`}   aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about" ? "active" : " "}`}  to="/about">About</Link>
        </li>
      </ul>
    </div>
  </div>
  
  {!localStorage.getItem("token")?<div className='d-flex'>
  <Link className="btn btn-primary mx-3" style={{width:"90px"}} to="/login" role="button">Log In</Link>
  <Link className="btn btn-primary mx-2" style={{width:"100px"}} to="/signup" role="button">Sign Up</Link>    
  </div>: <button className="btn btn-primary mx-2" style={{width:"90px"}} onClick={handleLogout}>Log Out</button> }
</nav>
        </>
    )
}

export default Navbar
