import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import {QUERY_USERS} from '../../utils/queries'
import StudentList from '../../components/StudentList'
import SearchBar from '../../components/SearchBar'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import './index.css'

//adding a studnet should only be available if the student made an account?
//if clicked adds the student to the teachers list -for the teacher logged in

export default function AddStudent() {
    const [style, setStyle] = useState('add_student')
    const [deleteStyle, setDeleteStyle] = useState('delete_student')
    
    const changeDeleteStyle= (index) => () => {
        setDeleteStyle(state => ({
            ...state,
            [index]: !state[index]
        }))
    }

    const changeAddStyle = (index) => () => {
        setStyle(state => ({
            ...state,
            [index]: !state[index]
        }))
    }

    const {loading, data} = useQuery(QUERY_USERS)
    const getAllUsers = data?.users || {}
    console.log({getAllUsers})
  return (
    <div>
      {/* student exported list for profiles to take data per student */}
      {/* get mern client profile pages */}
  
      <h2>Add Or Remove Student</h2>
      
      {/* search bar needs to only allow a add or remove instead of going to the students data */}
      <SearchBar placeholder={"Search Student Name"}/>
      {Object.values(getAllUsers &&
        getAllUsers).map((users, index) => (
            <div className = 'each_student' key={index}>
                <p>{users.username}</p>
                {/* need to add the check to the cache or the backend to display when a student is added all the time */}
                <div className="logout" onClick={changeAddStyle(index)}> {style[index] ? <div><AddIcon/></div> : <div><DeleteForeverIcon/></div>}
                    </div>
                    
                    {/* <div className="logout" onClick={changeDeleteStyle(index)}> {style[index] ? <div><DeleteForeverIcon/></div> : <div>{''}</div>}
                    </div> */}
                    {/* once add is clicked change to a checkmark */}
                    {/* <DeleteForeverIcon className = 'logout'/> */}
                    
                {/* once delete is clicked delete add icon needs to change to plus sign */}
                
            </div>
        ))}
      
    </div>
  )
}
