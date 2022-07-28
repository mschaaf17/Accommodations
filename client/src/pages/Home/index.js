import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'


export default function Home() {

  return (
    <div className='container'>
        <h1><span className ="italics">Always</span><br />get the <br /><span className ="bold">Support</span> <br /><span className="you">YOU</span><br /> need</h1>
       <div className='start-section'>
       <Link className ="btn signup" to="/login">Start</Link>
       <p className="not-a-member">Not a member? {'  '}
        <Link className="signup" to ="/signup">Sign up here</Link>
        </p>
        </div>
      </div>
  )
}
