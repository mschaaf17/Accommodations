import React from 'react'
import './index.css';
import AccommodationList from '../../components/AccommodationList';

import Auth from '../../utils/auth'
import {useQuery} from '@apollo/client'
import { QUERY_ACCOMMODATIONS, QUERY_ME } from '../../utils/queries';

const Accommodations =()=> {
const {loading, data} = useQuery(QUERY_ACCOMMODATIONS)
const {data: userData} = useQuery(QUERY_ME)
const accommodations = data?.accommodations || []

const loggedIn = Auth.loggedIn()

  return (
    <div>
      {loggedIn && (
        <div>Add Accommodation?</div>
      )}
      <div> {loading ? (
        <div>Loading... </div>
      ) : (
        <AccommodationList accommodations = {accommodations}
        title = "Your Choices" 
        />
      )}
      </div>
      
    
    
    
    </div>
  )
}

export default Accommodations
