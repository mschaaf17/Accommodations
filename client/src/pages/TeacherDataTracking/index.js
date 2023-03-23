import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import {QUERY_USERS} from '../../utils/queries'
import StudentList from '../../components/StudentList'
import SearchBar from '../../components/SearchBar'




export default function TeacherDataTracking() {
  const [item, setItem] = useState(0)
    const {loading, data} = useQuery(QUERY_USERS)
    const getAllUsers = data?.users || {}
    console.log({getAllUsers})
  return (
    <div>
      {/* student exported list for profiles to take data per student */}
      {/* get mern client profile pages */}
      <button>Add a Student</button>
      <h2>Pick a student to start logging data</h2>
      
      <SearchBar placeholder={"Search Student Name"}/>
      <StudentList getAllUsers = {getAllUsers} />
      
    </div>
  )
}
