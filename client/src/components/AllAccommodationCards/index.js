import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecommendIcon from '@mui/icons-material/Recommend';
import thumb from '../../assets/images/thumbs-up-solid.svg';
import { QUERY_USER } from '../../utils/queries';
import {useQuery} from '@apollo/client'

const AllAccommodationCards = ({ accommodations, accommodationClicked, clickedAccommodations }) => {
  const [style, setStyle] = useState('single_accom');
  const {username: userParam} = useParams()
  const {loading, data} = useQuery(userParam ? QUERY_USER : {},
    {
   variables: {username: userParam}
 })
 const user = data?.user || {}


console.log(JSON.stringify(user.accommodations) + " this is the user info on all accommodation cards")

//i need to be able to set a style for the accommdations that henry already has based on his query. 

const isAccommodationOnStudentList = (accommodationId) => {
  return user.accommodations.some((accommodation) => accommodation._id === accommodationId)
}

  const changeStyle = (index) => () => {
    setStyle((state) => ({
      ...state,
      [index]: !state[index]
    }));
  };

  const isAccommodationClicked = (id) => {
    return clickedAccommodations.includes(id);
  };

  return (
    <div>
      <div className='accom_section'>
        {accommodations &&
          accommodations.map((accommodation) => (
            <div
              className={style}
              key={accommodation._id}
              onClick={() => accommodationClicked(accommodation._id, accommodation.title, accommodation.image)}
            >
              <h3>{accommodation.title}</h3>
              <img className='accomm_img' src={accommodation.image} alt='Picture of accommodation' />
              {isAccommodationClicked(accommodation._id) && <span className='accommodation-x'>x</span>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllAccommodationCards;
