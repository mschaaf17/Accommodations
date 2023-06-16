import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import NavigationLinks from '../../../components/NavigationLinks'
import { useQuery } from '@apollo/client';
import WeeklyData from '../../../components/StudentData/weekly'
import {QUERY_USER, QUERY_BREAKS} from '../../../utils/queries'
import './index.css'

// Student Charts for frequency, duration?? eloping/aggression/other?, observation form, abc data   
export default function StudentCharts() {
  
  const [showData, setShowData] = useState(false);
  const { username: userParam } = useParams()

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const {data} = useQuery(QUERY_USER, {
    variables: {username: userParam}
  });
  const user = data?.user || {};
  console.log(user.username)
 
  const breakCount = user.breakCount || {}
  console.log(breakCount)
  const createdBreaks = user.breaks || {}
  const breakDates = createdBreaks.createdAt || []
  
  const handlePrintClick = () => {
    setPdfGenerating(true);
    //http://localhost:3000/generate-pdf?url=http://localhost:3000/studentProfile/henry.com/studentCharts
   // http://localhost:3000/studentProfile/henry.com/studentCharts
    //const url = `/generate-pdf?url=${encodeURIComponent(window.location.href)}`;
    const url = 'http://localhost:3001/generate-pdf?url=' + encodeURIComponent('http://localhost:3000/studentProfile/' + userParam + '/studentCharts');

    console.log(url);
    const printWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        setPdfGenerating(false);
      });
    } else {
      setPdfGenerating(false);
      console.error('Error opening print window.');
    }
  };
  
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
     
        <div className = "data-to-click">
      <button className='logout' onClick={handleClick}>Frequency</button>
    {showData && breakCount > 1 && (
      <WeeklyData totalBreaks = {breakCount}
      dateOfBreaks = {createdBreaks}
      breakDates= {breakDates}
      />
    )}
     
      <button className='logout'>Duration</button>
      <button className='logout'>Contract</button>
      <button className='logout'>ABC???</button>
      </div>
        </div>

        <div className='print_data'>
        <button
      className="logout"
      disabled={pdfGenerating}
      onClick={handlePrintClick}
    >
        Print Student Data</button>

        </div>


      <div>
        Intervention Suggestions:
      </div>
      <div className="view-other-pages"> <Link className="link-to-page logout" to ={`/teacherdata/${userParam}`}> ← Back to Student List</Link></div>
    </div>
    </>
  )
}
