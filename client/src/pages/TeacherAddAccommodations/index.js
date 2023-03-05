//should show a list of accommodations options to add for the student -- if the teacher clicks on add a module should say are you sure?
//then it should be added the the accommodations page 
//only person accessing student profile will be the teacher
import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {useQuery} from '@apollo/client'
import { QUERY_ACCOMMODATION_CARDS } from '../../utils/queries';
//import {QUERY_USER, QUERY_ACCOMMODATION_CARDS, QUERY_ME} from '../../utils/queries'
import AllAccommodationCards from '../../components/AllAccommodationCards';
import Auth from '../../utils/auth'


export default function TeacherAddAccommodations() {

  const { username: userParam } = useParams()
// const {loading, data} = useQuery(QUERY_USER, {
//   variables: {username: userParam}
// })

const {loading, data} = useQuery(QUERY_ACCOMMODATION_CARDS)
// const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//   variables: { username: userParam },
// });

const accommodationCards = data?.accommodationCards|| {};

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

  return (
    <div>
        <h2>Accommodation cards to pick</h2>
        <AllAccommodationCards accommodations = {accommodationCards}/>
        {/* if clicked it needs to add to the user! */}

        <div className="buttons">
        <button className = "profile-options logout"><Link className=" link-to-page" to ={`/studentProfile/${userParam}/dataLogging`}>Log Data</Link></button>
        <button className = "profile-options logout"><Link className=" link-to-page" to ={`/studentProfile/${userParam}/studentCharts`}>Charts</Link></button>
        </div>
        
        
        <div className="student-list-link"> <Link className="link-to-page logout" to ={`/teacherdata`}> ← Back to Student List</Link></div> 
        <div> add accommodation for student. are you sure? yes. give another option to say add this accomodation for another student? 
            or make page to add accommodations for multiple student for when the teacher is first setting things up?
        </div>

    </div>
  )
}
