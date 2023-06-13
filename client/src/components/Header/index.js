import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import {QUERY_ME} from '../../utils/queries'
import './index.css'
import Auth from '../../utils/auth'

const Header = () => {

  const [activeLink, setActiveLink] = useState('')
  const {loading, data} = useQuery(QUERY_ME)
  const admin = data?.me.isAdmin || {}
  const location = useLocation()

  useEffect(()=> {
    setActiveLink(location.pathname)
  }, [location])

  const logout = event => {
    event.preventDefault()
    Auth.logout()
  }
  if (location.pathname === "/") {
    return null
  }
  
  return (
    <header className="nav">
      <div className="nav-section">
        
          <h1 className="mySupport">My Support</h1>
    
        <nav className="nav-options">
          {Auth.loggedIn() && admin != true ? (
            <>
            <a className={`logout ${activeLink === '/studentAccommodations' ? 'active' : ''}`} href="/studentAccommodations">Accommodations</a>
            <a className={`logout ${activeLink === '/data' ? 'active' : ''}`} href="/data">Weekly Data</a>
            <a className="logout" href="/" onClick={logout}>Logout</a>
          </>
        ) : Auth.loggedIn() && admin === true ? (
          <>
            <a className={`logout ${activeLink === '/teacherdata/' + data?.me.username ? 'active' : ''}`} href={"/teacherdata/" + data?.me.username}>Teacher Tracking</a>
            <a className="logout" href="/" onClick={logout}>Logout</a>
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
