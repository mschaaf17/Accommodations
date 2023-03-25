import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import {QUERY_ME} from '../../utils/queries'
import './index.css'
import Auth from '../../utils/auth'

const Header = () => {
  const {loading, data} = useQuery(QUERY_ME)
  const admin = data?.me.isAdmin || {}
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
          {Auth.loggedIn() && admin != true ? (
            <>
            <a  className ="logout" href ="/studentAccommodations">Accommodations</a>
            <a  className ="logout" href ="/data">Weekly Data</a>
            <a className ="logout" href="/" onClick={logout}>Logout</a>
            </>
          ) : Auth.loggedIn() && admin === true ? (
            <>
             <a  className ="logout" href ="/teacherdata">Teacher Tracking</a>
            <a className ="logout" href="/" onClick={logout}>Logout</a>
            </>
          )
            : (
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
