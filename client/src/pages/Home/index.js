import React from 'react'
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div>
      Hey! I am the home page!
      <div>
        <h1>Always get the support you need</h1>
       <Link to="/login">Start</Link>
       <p>Not a member? {' '}
        <Link to ="/signup">Sign up</Link>
        </p>
  
      </div>
    </div>
  )
}
