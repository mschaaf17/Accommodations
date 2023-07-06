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
      console.log("todays date " + today)
      console.log("data.createdAt is returning: " + dataDate)
      return dataDate === today; 
    });
    console.log(todayData ? todayData.count : 0);
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
     
    {showData && breakCount >= 1 && (
      <>
      <div>
       <div>
      <h4>Today's Break Count: </h4>
      <h4>Average Daily Break Count:</h4>
      <h4>Total Break Count: {breakCount}</h4>
      {/* move data out of chart and onto this page */}
      </div> 
      <WeeklyData  
      totalBreaks = {breakCount}
      userBreaks = {breaks}
      breakDates= {breakDates}
      />
      </div>
      </>
      
    )}
    {showData && outOfSeatTotalCount >= 1 && (
      <>
      <div className='flex key'>
        <div className='border_solid'>
          <h3 className='center_only '>Key</h3>
          <div className='key'>
            <button className='logout'>Add Intervention</button>
            {/* after clicking add intervention a modal with a list of all the interventions 
            should be display to click on -- once clicked it needs to add to this students user model
            of interventions.. and display in the key as a list with a specific color to match the graph line
             everytime an intervention is added a new line on the graph needs to be created-- 
             will need to add interventions for the student on the backend*/}
            <ul>
              {/* intevention will need to be dynamic */}
              <li>Intervention name: will be better to click the intervention from this key</li>
              <li>Once clicked the graph line needs to match the color of this text</li>
            </ul>
          </div>
        </div>
      <OutOfSeatData
       outOfSeatByDay = {outOfSeatByDay}
      />
      <div>
        <h3>Out of Seat Information:</h3>
      <h4>Today's Count: {getTodayCount()}</h4>
      <h4>Average Daily Count: </h4>
      <h4>Total Count: {outOfSeatTotalCount}</h4>
      <h4>Dates/Times: </h4>
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
      {/* duration data should be a pie chart with off or on task comparted to class time
      and a bar chart */}
      <button className='logout'>Contract</button>
      {/* line graph */}
      <button className='logout'>ABC</button>
      {/* will be a comprized list of 
       function of behavior, targeted struggle times, frequency consequences, and
       antecendent behaviors-- all based on abc logging */}
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
        {/* if data point is three points above the aimline offer differnt intervention suggestion?? */}
      </div>
      <div className="view-other-pages"> <Link className="link-to-page logout" to ={`/teacherdata/${userParam}`}> ← Back to Student List</Link></div>
    </div>
    </>
  )
}
