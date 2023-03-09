//should show a list of accommodations options to add for the student -- if the teacher clicks on add a module should say are you sure?
//then it should be added the the accommodations page 
//only person accessing student profile will be the teacher
import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'
import { QUERY_ACCOMMODATION_CARDS } from '../../utils/queries';
import { ADD_ACCOMMODATION_FOR_STUDENT } from '../../utils/mutations';
//import {QUERY_USER, QUERY_ACCOMMODATION_CARDS, QUERY_ME} from '../../utils/queries'
import AllAccommodationCards from '../../components/AllAccommodationCards';
import Auth from '../../utils/auth'


export default function TeacherAddAccommodations() {

  const { username: userParam } = useParams()
// const {loading, data} = useQuery(QUERY_USER, {
//   variables: {username: userParam}
// })
const [addAccommodationForStudent, {error}] = useMutation(ADD_ACCOMMODATION_FOR_STUDENT)

const {loading, data} = useQuery(QUERY_ACCOMMODATION_CARDS)
// const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//   variables: { username: userParam },
// });

const accommodationCards = data?.accommodationCards || {};

// if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//   return <Navigate to={`/studentProfile:${user.username}`} />;
// }

if (loading) {
  return <div>Loading...</div>;
}
const accommodationClicked = async () => {
  try {
    await addAccommodationForStudent({
      //how does this know to get the title image and such where is it grabbing it
      // variables: { id: user.breaks._id },
      // variables: { username: accommodationCards.userParam, title: accommodationCards.title, image: accommodationCards.image },
      
      //this is working but it only grabbing the username and adding an id to it no image or title
      //this is specificlaly set to an accommodation so I need to somehow get that info or make the id work!
      variables: { username: userParam, title: accommodationCards.title, image: accommodationCards.image}
    });
  } catch (e) {
    console.error(e);
  }
  console.log('Accommodation has been clicked')
  // need to cache this so that it renders immediately!
 
};
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
        <h2>Which accommodations does {userParam} need?</h2>
        <AllAccommodationCards accommodations = {accommodationCards}
        accommodationClicked = {accommodationClicked}/>
        {/* if added checkmark shows -- if clicked twich the accommodation is taken off */}

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
