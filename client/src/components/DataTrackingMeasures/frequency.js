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

  const [frequencyCount, setFrequencyCount] = useState(user.outOfSeatCount);

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
        <button>Reset Frequencies Before 12 hours?</button>
        </div>
  
        
      </div>
    )
}

export default Frequency

