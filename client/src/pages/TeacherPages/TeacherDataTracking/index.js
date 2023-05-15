import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import {QUERY_USERS, QUERY_ME, QUERY_MY_STUDENTS} from '../../../utils/queries'
import StudentList from '../../../components/StudentList'
import SearchBar from '../../../components/SearchBar'
import { Link } from 'react-router-dom'
import Auth from '../../../utils/auth'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function TeacherDataTracking() {
  const [item, setItem] = useState(0)
    const {loading, data} = useQuery(QUERY_USERS)
    const getAllUsers = data?.users || {}
    console.log({getAllUsers})
    const {data: dataMe} = useQuery(QUERY_ME)
    const getMyStudentList = dataMe?.me.students || []
    console.log({getMyStudentList})
    console.log({dataMe})
  return (
    <div>
      {/* student exported list for profiles to take data per student */}
      {/* get mern client profile pages */}
  
      <Link className='link-to-page logout center' to = {`/addstudent`}>Add a Student</Link> 

      <h2>Pick a student to start logging data</h2>

      <div className ="user_list">
            {Object.values(getMyStudentList &&
        getMyStudentList).map((student, index) => (
          <div className='each_student' key={index}>
            <p>
             <Link className='link-to-page logout center' to = {`/studentProfile/${student.username}`}>{student.username}</Link> 
             <p className='center'><DeleteForeverIcon/></p>  
             {/* https://www.youtube.com/watch?v=x7niho285qs */}
            </p>

          </div>
        ))}
    
    </div>


      {/* <SearchBar placeholder={"Search Student Name"}/>
      <StudentList getAllUsers = {getAllUsers} /> */}
      
    </div>
  )
}
