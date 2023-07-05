import React, { useEffect, useState } from 'react'
import './index.css'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries'
import { ADD_OUT_OF_SEAT } from '../../utils/mutations'
import { useParams } from 'react-router-dom'

const Frequency = ()=> {
   const {username: usernameFromUrl} = useParams();
   
   const [addOutOfSeat, {error}] = useMutation(ADD_OUT_OF_SEAT)
  // const [addOutOfSeat, {error}]= useMutation(ADD_OUT_OF_SEAT, {
  //   update(cache, {data: {addOutOfSeat}}){

  //     try {
  //       const {user} = cache.readQuery({query: QUERY_USER})
  //       cache.writeQuery({
  //         query: QUERY_USER,
  //         data: {user: {...user, outOfSeatCount: [user.outOfSeatCount, {...addOutOfSeat}]}},
  //       })
  //     } catch (e)
  //     {
  //       console.log('err: ', e)
  //     }
  //   }
  // })
  const {data} = useQuery(QUERY_USER, {
    variables: {username: usernameFromUrl}
  });
  const user = data?.user || {};
  const outOfSeatByDay = data?.user?.outOfSeatCountByDay;
console.log("out of seat by day: ", outOfSeatByDay);
//create a function that tells me date.now and returns the count that matches the date.now


  //need to save the count to cache so it saves until reset after 12 hours or button is clicked?? 
  //or query by day and report back through virtual how many clicks happened that day???
   const [frequencyCount, setFrequencyCount] = useState(user.outOfSeatCount);
 // const [frequencyCount, setFrequencyCount] = useState(0);
  const reset = () => {
    setFrequencyCount(0);
  }

  useEffect(()=> {
  }, [frequencyCount]);
  
    const outOfSeatClicked = async (e) => {
      try {
        await addOutOfSeat({
          variables: {username: user.username},
        });
        setFrequencyCount(frequencyCount + 1);
       
      } catch (e)
      {
        console.log(e);
      }
      console.log('Out of seat has been clicked')
   };
    return (
      <div className="data-logging-container">
        <h2>Click each button as behavior occurs</h2>
        <div className="frequency-button-section">
          {usernameFromUrl && (
          <button onClick={outOfSeatClicked}>
            {/* {`Out Of Seat ${frequencyCount === 0 ? '' : `: ${frequencyCount}`}`} */}
            {`Out Of Seat ${frequencyCount === 0 ? '' : `: ${frequencyCount}`}`}
            {/* front end should reset after 12 hours -- not sure how it will work if the frequency count is coming from backend? */}
          </button>
        )}
        <button>Talk Outs/Noises</button>
        <button>Aggression Towards Others</button>
        <button>Aggression Towards Self</button>
        <button>Throwing items</button>
        <button>Refusing Command</button>
        <button>Other</button>
        {/* <button>Reset Frequencies Before 12 hours?</button> */}
        </div>
        <button className = "red-button" onClick={reset}> Reset Frequency</button>
        
      </div>
    )
}

export default Frequency

