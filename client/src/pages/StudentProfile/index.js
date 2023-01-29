//only person accessing student profile will be the teacher
import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {QUERY_USER, QUERY_ME} from '../../utils/queries'
import Auth from '../../utils/auth'
import './index.css'

//props was taken out in StudentProfile(props)
export default function StudentProfile() {
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
  return <div>Loading...</div>;
}

// if (!user?.username) {
//   return (
//     <h4>
//       You need to be logged in to see this. Use the navigation links above to
//       sign up or log in!
//     </h4>
//   );
// }


//pull from student list!! on the it uses mapping to allow myself to user the usernamea again!

  return (
    <div>
        {/* student profile page */}
      
          <h1 className='profile-name'>{` Viewing ${user.username}'s Profile `}</h1>
        
        {/* log data link to = log data page */}
        
        
        <div className="buttons">
        <button className = "profile-options logout"><Link className=" link-to-page" to ={`/studentProfile:${user.username}/dataLogging`}>Log Data</Link></button>
        <button className = "logout">Charts</button>
        </div>
        
        
        <div className="student-list-link"> <Link className="link-to-page logout" to ={`/teacherdata`}> ← Back to Student List</Link></div> 
    

    {/* <h2>users</h2>
    {user.map((u) => {
      return (
        <div>{`hey ${u.username}`}</div>
      );
    })} */}

    </div>
  )
}
