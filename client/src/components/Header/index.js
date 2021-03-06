import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css'

import Auth from '../../utils/auth'

const Header = () => {
  const location = useLocation()
  const logout = event => {
    event.preventDefault()
    Auth.logout()
  }
  if (location.pathname === "/") {
    return null
  }
  console.log(Auth.loggedIn())
  return (
    <header className="nav">
      <div className="nav-section">
        
          <h1 className="mySupport">My Support</h1>
        

        <nav className="nav-options">
          {Auth.loggedIn() ? (
            <>
            {/* <Link to ="/accommodations">Accommodations</Link> */}
            <a className ="logout" href="/" onClick={logout}>Logout</a>
            </>
          ) : (
            <>
            {}
            </>
          )}
         
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
