import React, {useState} from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchBar from '../SearchBar';


export default function StudentList({getAllUsers, filteredData}) {
    // let allUsers = Object.values(getAllUsers)
    // let allUsersList = allUsers.map(el=>el.username)
  return (
    // <div className ="user_list">
    <div className ="user_list">
        {/* do a getProfile() that will have data tracking or charts for that student */}
            {/* {allUsersList} */}
            {/* {getAllUsers && getAllUsers.map(el => (
                <div key ={el._id} >
                    <p>{el.username}</p>
                    </div>
            ))} */}
            {/* filteredData for the map not working as it is passed through props for search bar? */}
            {Object.values(getAllUsers &&
        getAllUsers || filteredData).map((users, index) => (
          <div className='each_student' key={index}>
            <p>
             <Link className='link-to-page logout center' to = {`/studentProfile/${users.username}`}>{users.username}</Link> 
             <p className='center'><DeleteForeverIcon/></p>  
             {/* https://www.youtube.com/watch?v=x7niho285qs */}
            </p>

          </div>
        ))}
    
    </div>
  )
}
