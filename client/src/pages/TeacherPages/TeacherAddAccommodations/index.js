import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ACCOMMODATION_CARDS } from '../../../utils/queries';
import { ADD_ACCOMMODATION_FOR_STUDENT, REMOVE_ACCOMMODATION_FROM_STUDENT } from '../../../utils/mutations';
import AllAccommodationCards from '../../../components/AllAccommodationCards';

export default function TeacherAddAccommodations() {
  const { username: userParam } = useParams();
  const [addAccommodationForStudent, { error }] = useMutation(
    ADD_ACCOMMODATION_FOR_STUDENT
  );

  const [removeAccommodationFromStudent] = useMutation(
    REMOVE_ACCOMMODATION_FROM_STUDENT
  );
  const { loading, data } = useQuery(QUERY_ACCOMMODATION_CARDS);
  const accommodationCards = data?.accommodationCards || {};

  const [clickedAccommodations, setClickedAccommodations] = useState([]);

  if (loading) {
    return <div className='loader'>Loading...</div>;
  }

  const accommodationClicked = async (id, title, image) => {
    if (clickedAccommodations.includes(id)) {
      // Accommodation already clicked, remove it
      setClickedAccommodations((prevState) =>
        prevState.filter((accommodationId) => accommodationId !== id)
      );
      //this is not working!!!!!!!!!!!!!!!!!!!!!!!!!!! only works on the backend
      try {
        // Call the mutation to remove the accommodation
        await removeAccommodationFromStudent({
          variables: { accommodationId: id, username: userParam }
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      // Accommodation not clicked, add it
      setClickedAccommodations((prevState) => [...prevState, id]);

      try {
        // Call the mutation to add the accommodation
        await addAccommodationForStudent({
          variables: { username: userParam, title: title, image: image }
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <h2>Which accommodations does {userParam} need?</h2>
      <AllAccommodationCards
        accommodations={accommodationCards}
        accommodationClicked={accommodationClicked}
        clickedAccommodations={clickedAccommodations}
      />

      {/* if added checkmark shows -- if clicked twice the accommodation is taken off */}
      <div className="buttons">
        <button className="profile-options logout">
          <Link className="link-to-page" to={`/studentProfile/${userParam}/dataLogging`}>
            Log Data
          </Link>
        </button>
        <button className="profile-options logout">
          <Link className="link-to-page" to={`/studentProfile/${userParam}/studentCharts`}>
            Charts
          </Link>
        </button>
      </div>

      <div className="student-list-link">
        <Link className="link-to-page logout" to={`/teacherdata/${userParam}`}>
          ← Back to Student List
        </Link>
      </div>
      <div>
        add accommodation for student. are you sure? yes.
 give another option to say add this
        accommodation for another student? or make page to add accommodations for multiple student
        for when the teacher is first setting things up?
      </div>
    </div>
  );
}
