import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import NavigationLinks from '../../../components/NavigationLinks'
import { useQuery } from '@apollo/client';
import WeeklyData from '../../../components/StudentData/weekly'
import {QUERY_USER, QUERY_BREAKS} from '../../../utils/queries'

// Student Charts for frequency, duration?? eloping/aggression/other?, observation form, abc data   
export default function StudentCharts() {
  const [showData, setShowData] = useState(false);
  const { username: userParam } = useParams()
  const {data} = useQuery(QUERY_USER, {
    variables: {username: userParam}
  });
  const user = data?.user || {};
  console.log(user.username)
 
  const breakCount = user.breakCount || {}
  console.log(breakCount)
  const createdBreaks = user.breaks || {}
  const breakDates = createdBreaks.createdAt || []
  
  const handleClick = () => {
    setShowData(!showData);
  };
  
  return (
    <>
    <div>
      <div>
        <button><Link to ={`/studentProfile/${userParam}/studentCharts/additionalStudentInfo`}>Provide more Information on {userParam}</Link></button>
        {/* this button should be similar to a bip or the questionairre for student behavior such as a FBA */}
      <h2>Viewing Charts and Data for {userParam}</h2>
      <button className = 'logout'>Print Student Data</button>
      <button onClick={handleClick}>Frequency</button>
    {showData && breakCount > 1 && (
      <WeeklyData totalBreaks = {breakCount}
      dateOfBreaks = {createdBreaks}
      breakDates= {breakDates}
      />
    )}
      
      <button>Duration</button>
      <button>Contract</button>
      <button>ABC???</button>
        </div>
      <div>
        Intervention Suggestions:
      </div>
      <div> <Link className="link-to-page logout" to ={`/teacherdata`}> ← Back to Student List</Link></div>
    </div>
    </>
  )
}
