import React from 'react'
import { Link } from 'react-router-dom';


export default function Home() {

  return (
    <div>
        <h1>Always get the support you need</h1>
       <Link to="/login">Start</Link>
       <p>Not a member? {' '}
        <Link to ="/signup">Sign up</Link>
        </p>
      </div>
  )
}
