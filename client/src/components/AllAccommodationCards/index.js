import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecommendIcon from '@mui/icons-material/Recommend';
import thumb from '../../assets/images/thumbs-up-solid.svg';

const AllAccommodationCards = ({ accommodations, accommodationClicked, clickedAccommodations }) => {
  const [style, setStyle] = useState('single_accom');

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
