//only person accessing student profile will be the teacher
import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {QUERY_USER, QUERY_ME} from '../../utils/queries'
import Auth from '../../utils/auth'
import NavigationLinks from '../../components/NavigationLinks'
import './Interventions.css'

export default function Interventions() {

  const { username: userParam } = useParams()
// const {loading, data} = useQuery(QUERY_USER, {
//   variables: {username: userParam}
// })

const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  variables: { username: userParam },
});

const user = data?.me || data?.user || {};

// if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//   return <Navigate to={`/studentProfile:${user.username}`} />;
// }

if (loading) {
  return <div className='loader'>Loading...</div>;
}


  return (
    <div>
          <h2 className='profile-name'>Intervention Ideas</h2>
          {/* find a way to provide teacher with function of behavior based on additional studnet info */}
          <div className='flex'>
            {/* Need a search bar and possible make this page large so you can click on the 
            intervention regardless of if the teacher added it so that it more informaton 
            can be provided --teacher much add a detail and a summary of the intervention*/}

            {/* thoughts if I add an intervention for a specific student will tha tbe annoying?
            should their be an add intervention but it adds to the entire list not for a particular student */}
            
            <div className='border_solid'>
                <h3 className='center_only'>Add Intervention</h3>
                <form className='flex_column'>
                  {/* this form will be in the user schema,, otherwise 
                  i will seed in intervention ideas  */}
                <label for="languages">Pick a Function:</label>
                        <select name="" id="functions">
                        <option value="value" selected>Select</option>
                        <option value="">Escape</option>
                        <option value="">Attention</option>
                        <option value="">Sensory</option>
                        <option value="">Tangible</option>
                        <option value="">Other</option>
                        </select>
                    <label>Title: <input className='title'></input></label>
                    <label>Summary: <input className='summary'></input></label>
                    <button className="submit-btn" type="submit">
                Submit
              </button>
                    
                </form>
            </div>
            
            <div className='flex idea_section'>
            
            <div className='border_solid'>
          <h4>Interventions Ideas for Escape</h4>
          <ul className='flex'>
        {/* possible links to articles for these interventions? as well as added interventions by the teacher */}
            <li>Scheduled Breaks</li>
          </ul>
          </div>


          <div className='border_solid'>
          <h4>Interventions Ideas for Access to Attention</h4>
          <ul className='flex'>
        {/* possible links to articles for these interventions or instead just a module that gives a description? */}
            <li>Teacher Helper</li>
          </ul>
          </div>

          <div className='border_solid'>
          <h4>Interventions Ideas for Sensory Stimulation</h4>
          <ul className='flex'>
        {/* possible links to articles for these interventions? */}
            <li>Desk Velcro</li>
          </ul>
          </div>

          <div className='border_solid'>
          <h4>Interventions Ideas for Access to Tangible</h4>
          <ul className='flex'>
        {/* possible links to articles for these interventions? */}
            <li>Token Economy</li>
          </ul>
          </div>

          <div className='border_solid'>
          <h4>Other Interventions Ideas</h4>
          <ul className='flex'>
        {/* possible links to articles for these interventions? */}
            <li>Will only display if other was added</li>
          </ul>
          </div>


          </div>
          </div>
          
        
         
    </div>
  )
}
