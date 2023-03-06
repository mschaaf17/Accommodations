import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'

export default function NavigationLinks() {
    const { username: userParam } = useParams()
  return (
    <div>

        <div className="buttons">
          <button className='profile-options logout'><Link className=" link-to-page" to ={`/studentProfile/${userParam}/addAccommodations`}> Add Accommodations</Link></button>
        <button className = "profile-options logout"><Link className=" link-to-page" to ={`/studentProfile/${userParam}/dataLogging`}>Log Data</Link></button>
        <button className = "profile-options logout"><Link className=" link-to-page" to ={`/studentProfile/${userParam}/studentCharts`}>Charts</Link></button>
        </div>
        
        
        <div className="student-list-link"> <Link className="link-to-page logout" to ={`/teacherdata`}> ← Back to Student List</Link></div> 
  

    </div>
  )
}