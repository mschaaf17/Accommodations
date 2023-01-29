import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

export default function StudentList({getAllUsers}) {
    // let allUsers = Object.values(getAllUsers)
    // let allUsersList = allUsers.map(el=>el.username)
  return (
    <div className ="user_list">
        {/* do a getProfile() that will have data tracking or charts for that student */}
            {/* {allUsersList} */}
            {/* {getAllUsers && getAllUsers.map(el => (
                <div key ={el._id} >
                    <p>{el.username}</p>
                    </div>
            ))} */}
            {Object.values(getAllUsers &&
        getAllUsers).map((users, index) => (
          <div key={index}>
            <p>
             <Link className='link-to-page logout' to = {`/studentProfile:${users.username}`}>{users.username}</Link> 
               
            </p>

          </div>
        ))}
    
    </div>
  )
}
