import React from 'react'
import {Navigate, useParams, Link} from 'react-router-dom'
import './index.css';
import AccommodationList from '../../../components/Accommodation/AccommodationList';
import Messaging from '../../../components/Messaging'
// import BreakCard from '../../components/Break'
import Auth from '../../../utils/auth'
import {useQuery, useMutation} from '@apollo/client'
import { QUERY_ACCOMMODATIONS, QUERY_BREAKS, QUERY_ME, QUERY_USER } from '../../../utils/queries';
import { ADD_BREAK} from '../../../utils/mutations'


const StudentAccommodations =(props)=> {
  const {username: userParam} = useParams()

  const [addBreak, {error}] = useMutation(ADD_BREAK, {
    update(cache, {data: {addBreak}}) {


      try {
        const { me } = cache.readQuery({ query: QUERY_ME})
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: {me, breakCount: [me.breakCount, {...addBreak}]}},
        }) 
      } catch (e) {
        console.log('err: ', e)
      }

      // const {breakCount} = cache.readQuery({ query: QUERY_BREAKS})
      // cache.writeQuery({
      //   query: QUERY_BREAKS,
      //   data: {breakCount: [addBreak, ...breakCount]}
      // })
      
    }
  })

const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME,
   {
  variables: {username: userParam}
})
// const {data: userData} = useQuery(QUERY_ME)
const user = data?.me || data?.user || {}

if (Auth.loggedIn() && Auth.getProfile().data.username === userParam){
  return <Navigate to ="/studentAccommodations" />
}
if (!user?.username) {
  return (
    <h4> You need to be logged in to see this.</h4>
  )
}
 
if(loading) {
  return <div>Loading...</div>
}



const breakClicked = async () => {
  // breaks need to max out at a certain number for the day if requested by teacher!brea
  // if(addBreak === 5) {
  //   return <div>No more breaks today</div>
  // }
  try {
    await addBreak({
      
      // variables: { id: user.breaks._id },
      variables: { id: user._id },
      
    });
  } catch (e) {
    console.error(e);
  }
  console.log('Break has been clicked')
  // need to cache this so that it renders immediately!
 
};

  return (
    <div>
        <AccommodationList accommodations = {user.accommodations}
        title = {user.username} 
        />
      
      {/* {userParam && ( */}
        
          <Link className= "break-btn" to={'/breakTimer'}
      onClick= {breakClicked}>Take a break
          
          </Link>
          {/* <BreakTimer breakCount = {user.breakCount}/> */}
        
      {/* )} */}
      
    {/* <div>Use a break! once it is clicked it will take user to break page and timer starts-- needs reaction count to display how many breaks were taken! set a timeout after 24 hours-- back button to accommodations </div> */}
      <div className="break-count">
        <h3>{user.breakCount} {user.breakCount === 1 ? 'break' : 'breaks'}</h3>
      {/* <BreakCard breakCount ={user.breakCount}
       /> */}
       </div>
      <div>
      <Messaging />
    </div>
    
    </div>
   
  )
}

export default StudentAccommodations
