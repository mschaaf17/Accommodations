
import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {QUERY_USER, QUERY_ME} from '../../../utils/queries'
import Auth from '../../../utils/auth'
import NavigationLinks from '../../../components/NavigationLinks'

//props was taken out in StudentProfile(props)
export default function AdditionalStudentInfo() {
    const { username: userParam } = useParams()
  return (
    <div>

          <h1 className='profile-name'>{`${userParam}'s Additional Info `}</h1>
        <div>FBA Questionairre and should be printable after filling out--should have a button that says share with another? email to parent?</div>
        <form>
            <input></input>
        </form>

        <NavigationLinks/>    
      
    </div>
  )
}
