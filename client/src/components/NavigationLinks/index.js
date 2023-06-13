import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {QUERY_ME} from '../../utils/queries'

export default function NavigationLinks() {
    const { username: userParam } = useParams()
    const {loading, data} = useQuery(QUERY_ME)
  return (
    <div>

        <div className="buttons">
          <button className='profile-options logout'><Link className=" link-to-page" to ={`/studentProfile/${userParam}/addAccommodations`}> Add Accommodations</Link></button>
        <button className = "profile-options logout"><Link className=" link-to-page" to ={`/studentProfile/${userParam}/dataLogging`}>Log Data</Link></button>
        <button className = "profile-options logout"><Link className=" link-to-page" to ={`/studentProfile/${userParam}/studentCharts`}>Charts</Link></button>
        </div>
        
        
        <div className="student-list-link"> <Link className="link-to-page logout" to ={`/teacherdata/${data?.me.username}`}> ← Back to Student List</Link></div> 
  

    </div>
  )
}