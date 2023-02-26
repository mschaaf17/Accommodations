import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'

import {useQuery} from '@apollo/client'
import {QUERY_USER, QUERY_ME} from '../../utils/queries'

import Duration from '../../components/DataTrackingMeasures/duration'
import ABC from '../../components/DataTrackingMeasures/ABC'
import Frequency from '../../components/DataTrackingMeasures/frequency'
import Observation from '../../components/DataTrackingMeasures/observation'
import Contracts from '../../components/DataTrackingMeasures/Contracts'



export default function DataLogging() {

  const { username: userParam } = useParams()
  // const {loading, data} = useQuery(QUERY_USER, {
  //   variables: {username: userParam}
  // })
  
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  
  const user = data?.me || data?.user || {};


    // use effect for on click display frequency
    const forms = {
      frequency: <Frequency/>,
      duration: <Duration />,
      abc: <ABC/>,
      observation: <Observation/>,
      contracts: <Contracts/>
    }

  
      let initalState = {
        frequency: false,
        duration: false,
        abc: false,
        observation: false,
        contracts: false
      }
    

    const [state, setState] = useState(initalState)

    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <div>
      <h2>Logging for {userParam}</h2>
      <div className="data-to-click">
      {Object.keys(state).map(el => (
        <div  key ={el}>
          <button className='logout' onClick={() => {
            initalState = {frequency: false, duration: false, abc: false, observation: false, contracts: false}
            if (state[el]) {
              setState(initalState)
            } else {
              initalState[el] = true
              setState(initalState)
            }
          }}
          >
            {el.toUpperCase()}
          </button>
          {state[el] ? (
            <div>{forms[el]}</div>
          ) : null }
          </div>
      ))}
      </div>
      {/* <button>
        ABC Form
      </button>
      <button>
        Duration Tracking
      </button>
      <button>
        Frequency Tracking
        <Frequency/>
      </button>
      <button>
        Observation Form
      </button> */}
      <div className="view-other-pages">
      {/* <a href ="/studentCharts">View student charts</a> */}
{/*need a userparam because it wont know what user to look at the charts for!  */}
     <div> <Link className="link-to-page logout" to ={`/teacherdata`}> ← Back to Student List</Link></div>
      <div ><Link  className="link-to-page logout" to ={`/studentProfile/${userParam}/studentCharts`}>Student Charts → </Link></div>
      </div>
    </div>

    
  )
}
