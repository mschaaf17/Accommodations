import React from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import './index.css'

const AllAccommodationCards = ({ accommodations, accommodationClicked, clickedAccommodations }) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : {}, {
    variables: { username: userParam },
  });
  const user = data?.user || {};
  const studentAccommodations = user.accommodations || [];

  const isAccommodationOnStudentList = (accommodationId) => {
    return studentAccommodations.some((accommodation) => accommodation._id === accommodationId);
  };

  const isAccommodationClicked = (id) => {
    return clickedAccommodations.includes(id);
  };

  return (
    <div>
      <div className='accom_section'>
        {accommodations &&
          accommodations.map((accommodation, index) => (
            <div
              className={`single_accom ${isAccommodationOnStudentList(accommodation._id) ? 'purple-background' : ''}`}
              key={`accommodation_${accommodation._id || index}`} 
              onClick={() => accommodationClicked(accommodation._id, accommodation.title, accommodation.image)}
            >
              <h3>{accommodation.title}</h3>
              <img className='accomm_img' src={accommodation.image} alt='Picture of accommodation' />
              {isAccommodationClicked(accommodation._id) && <span className='accommodation-x'>x</span>}
            </div>
          ))}
      </div>

      <div className='accom_section'>
        {studentAccommodations.map((acc, index) => (
          <div className='single_accom purple-background' key={`student_accommodation_${acc._id || index}`}>
            <p>{acc.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAccommodationCards;
