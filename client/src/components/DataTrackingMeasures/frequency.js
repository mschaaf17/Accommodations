import React from 'react'
import './index.css'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries'
import { ADD_OUT_OF_SEAT } from '../../utils/mutations'
import { useParams } from 'react-router-dom'

const Frequency = ()=> {
  // const {username: userParam} = useParams()
  // const [addOutOfSeat, {error}]= useMutation(ADD_OUT_OF_SEAT, {
  //   update(cache, {data: {addOutOfSeat}}){

  //     try {
  //       const {user} = cache.readQuery({query: QUERY_USER})
  //       cache.writeQuery({
  //         query: QUERY_USER,
  //         data: {user: {user, outOfSeatCount: [user.outOfSeatCount, {...addOutOfSeat}]}},
  //       })
  //     } catch (e)
  //     {
  //       console.log('err: ', e)
  //     }
  //   }
  // })
  // const {data} = useQuery(userParam, QUERY_USER,
  //   {
  //     variables: {username: userParam}
  //   })
  //   const user = data?.user || {}

  //   const outOfSeatClicked = async () => {
  //     try {
  //       await addOutOfSeat({
  //         variables: {username: user.username},
  //       });
  //     } catch (e)
  //     {
  //       console.log(e);
  //     }
  //     console.log('Out of seat has been clicked')
   // };
    return (
      //need to userParam && ()???
      <div className="data-logging-container">
        <h2>Click each button as behavior occurs</h2>
        <div className="frequency-button-section">
        {/* <button onClick={outOfSeatClicked}>Out of Seat</button> */}
        <button>Talk Outs/Noises</button>
        <button>Aggression Towards Others</button>
        <button>Aggression Towards Self</button>
        <button>Throwing items</button>
        <button>Refusing Command</button>
        <button>Other</button>
        </div>
  
        
      </div>
    )
}

export default Frequency

