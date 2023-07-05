import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import NavigationLinks from '../../../components/NavigationLinks'
import { useQuery } from '@apollo/client';
import WeeklyData from '../../../components/StudentData/weekly'
import {QUERY_USER} from '../../../utils/queries'
import './index.css'
import moment from 'moment';
import OutOfSeatData from '../../../components/StudentData/outOfSeatData';

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
  const outOfSeat = user.outOfSeat
  const outOfSeatTotalCount = user.outOfSeatCount
  const outOfSeatByDay = data?.user?.outOfSeatCountByDayVirtual
 console.log(outOfSeatByDay)
 
  const breakCount = user.breakCount || {}
  console.log(breakCount)
  const breaks = user.breaks || {}
  console.log(breaks)
  const breakDates = breaks.createdAt || []
  
  const getTodayCount = () => {
    const today = new Date().toISOString().split('T')[0]; 
  
    const todayData = outOfSeatByDay.find((data) => {
      const dataDate = new Date(data.createdAt).toISOString().split('T')[0]; 
  
      return dataDate === today; 
    });
    return todayData ? todayData.count : 0;
  }

  const handlePrintClick = () => {
    setPdfGenerating(true);
    //http://localhost:3000/generate-pdf?url=http://localhost:3000/studentProfile/henry.com/studentCharts
   // http://localhost:3000/studentProfile/henry.com/studentCharts
    //const url = `/generate-pdf?url=${encodeURIComponent(window.location.href)}`;
    //const url = 'http://localhost:3001/generate-pdf?url=' + encodeURIComponent('http://localhost:3000/studentProfile/' + userParam + '/studentCharts');
    const url = 'https://inclusion-student-app-351765654f70.herokuapp.com/generate-pdf?url=' + encodeURIComponent('https://inclusion-student-app-351765654f70.herokuapp.com/studentProfile/' + userParam + '/studentCharts');
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
      {/* if statement for each type of frequenyc to only show data that is created than 1 */}
    {showData && breakCount > 1 && (
      <>
      <h4>Today's Break Count: </h4>
      <h4>Average Daily Break Count:</h4>
      <h4>Total Break Count: {breakCount}</h4>
      <WeeklyData  
      totalBreaks = {breakCount}
      userBreaks = {breaks}
      breakDates= {breakDates}
      />
      </>
      
    )}
    {showData && outOfSeatTotalCount > 1 && (
      <>
        <div className='break_table'>
        <div className='break_table'>
        <h4>Today's Out of Seat Count: {getTodayCount()}</h4>
      <h4>Average Daily Out of Seat Count:</h4>
      <h4>Total Out of Seat Count: {outOfSeatTotalCount}</h4>
      <OutOfSeatData
       outOfSeatByDay = {outOfSeatByDay}
      />

      <h4>Out Of Seat Information: </h4>

      {Object.values(outOfSeat && outOfSeat).map((amount, index) => {
  const createdAtTimestamp = parseInt(amount.createdAt);
  const createdAtDate = new Date(createdAtTimestamp);

  // Check if createdAtDate is a valid date before formatting
  const formattedDate = moment(createdAtDate).format('MMMM Do, YYYY [at] h:mma');

  return (
    <div key={index}>
      <p>{formattedDate}</p>
    </div>
  );
})}
   
              </div>
            </div>
            </>
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
