import React from 'react'
import {Navigate, useParams} from 'react-router-dom'
import './index.css';
import AccommodationList from '../../components/AccommodationList';

import Auth from '../../utils/auth'
import {useQuery} from '@apollo/client'
import { QUERY_ACCOMMODATIONS, QUERY_ME, QUERY_USER } from '../../utils/queries';

const Accommodations =(props)=> {
  const {username: userParam} = useParams()

const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME,
   {
  variables: {username: userParam}
})
// const {data: userData} = useQuery(QUERY_ME)
const user = data?.me || data?.user || {}

if (Auth.loggedIn() && Auth.getProfile().data.username === userParam){
  return <Navigate to ="/accommodations" />
}
if (!user?.username) {
  return (
    <h4> You need to be logged in to see this.</h4>
  )
}

  return (
    <div>
    
        <AccommodationList accommodations = {user.accommodations}
        title = "Your Choices" 
        />
      
      
    
    
    
    </div>
  )
}

export default Accommodations
