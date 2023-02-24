import React from 'react'
import { useQuery } from '@apollo/client'
import {QUERY_USERS} from '../../utils/queries'
import StudentList from '../../components/StudentList'




export default function TeacherDataTracking() {
    const {loading, data} = useQuery(QUERY_USERS)
    const getAllUsers = data?.users || {}
    console.log({getAllUsers})
  return (
    <div>
      {/* student exported list for profiles to take data per student */}
      {/* get mern client profile pages */}
      <h2>Pick a student to start logging data</h2>
      <StudentList getAllUsers = {getAllUsers} />
      
    </div>
  )
}
