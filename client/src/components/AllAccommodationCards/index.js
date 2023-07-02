import React , {useState} from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_ACCOMMODATION_CARDS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import './index.css'
import AddIcon from '@mui/icons-material/Add';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';


const AllAccommodationCards = ({ addAccommodation,
  isAccommodationAdded, addedAccommodation}) => {
   
    
    const { loading, data } = useQuery(QUERY_ACCOMMODATION_CARDS);
    const accommodationCards = data?.accommodationCards || [];

    console.log(accommodationCards)
   

  return (
    <div>

<div className='accom_section'>
        { accommodationCards && accommodationCards.map((accommodation, index) => (
            <div  key={`accommodation_${accommodation._id || index}`}onClick={()=> addAccommodation(accommodation._id, accommodation.title, accommodation.image)}>
              <div>
              <h3>{accommodation.title}</h3>
              <img className='accomm_img' src={accommodation.image} alt='Picture of accommodation' />
              {isAccommodationAdded(accommodation.title) ? (
                    <BookmarkAddedIcon />
                  ) : (
                <AddIcon />
                 )}
                 </div>
            </div>
          ))}
      </div>
  
    </div>
  );
};

export default AllAccommodationCards;
