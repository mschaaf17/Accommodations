import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'


export default function Home() {

  return (
    <div className='container'>
      <h2>Start Getting Support</h2>
        {/* <h1><span className ="italics">Always</span><br />get the <br /><span className ="bold">Support</span> <br /><span className="you">YOU</span><br /> need</h1> */}
       <div className='start-section'>
       <Link className ="btn-home start-btn" to="/login">Start</Link>
       <p className="not-a-member">Not a member? {'  '}
        <Link className="signup" to ="/signup">Sign up</Link>
        </p>
        </div>
      </div>
  )
}
