import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ACCOMMODATION_CARDS, QUERY_USER } from '../../../utils/queries';
import { ADD_ACCOMMODATION_FOR_STUDENT, REMOVE_ACCOMMODATION_FROM_STUDENT } from '../../../utils/mutations';
import AllAccommodationCards from '../../../components/AllAccommodationCards';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal, Button } from 'react-bootstrap';


export default function TeacherAddAccommodations() {
  const { username: userParam } = useParams();
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [addedAccommodation, setAddedAccommodation] = useState({});
  const { loading, data } = useQuery(userParam ? QUERY_USER : {}, {
    variables: { username: userParam },
  });
  const user = data?.user || {};
  const studentAccommodations = user.accommodations || [];
  const [addAccommodationForStudent, { error }] = useMutation(
    ADD_ACCOMMODATION_FOR_STUDENT
  );

  const [removeAccommodationFromStudent] = useMutation(
    REMOVE_ACCOMMODATION_FROM_STUDENT
  );

const removeAccommodation = async (id, username) => {
    setSelectedAccommodation(id)
    setShowConfirmationModal(true);
    return id, username
}

const handleDeleteConfirmation = async (id, username) => {
    try {
        await removeAccommodationFromStudent({
            // variables: { _id: accommodationId}
            // variables: { accommodationId: id, username: userParam },
            variables: {id: selectedAccommodation, username: userParam},
            refetchQueries: [
                {query: QUERY_ACCOMMODATION_CARDS},
                {query: QUERY_USER}
            ]
        })
    } catch (e) {
        console.loge(e)
    }
    setShowConfirmationModal(false)
    setSelectedAccommodation(null)
    console.log('accommodation has been removed')
}

const handleCancelConfirmation = () => {
    setShowConfirmationModal(false)
    setSelectedAccommodation(null)
}

const addAccommodation = async (id, title, image) => {
    try {
        await addAccommodationForStudent({
            variables: { username: userParam, title: title, image: image },
    })
    setAddedAccommodation((prevAddedAccommodations) => ({
        ...prevAddedAccommodations,
        [id]: !prevAddedAccommodations[id],
    }))
    } catch (e) {
        console.log(e)
    }
    console.log('student has been added')
}

const isAccommodationAdded = (title) => {
    const isAdded = addedAccommodation[title] || data.user.accommodations.some((accommodation) => accommodation.title === title);
    console.log(`Accommodation ID: ${title}, Is Added: ${isAdded}`);
    return isAdded;
  };
  


  if (loading) {
    return <div className='loader'>Loading...</div>;
  }



  return (
    <div>
      <h2>Which accommodations does {userParam} need?</h2>
      <AllAccommodationCards
        addAccommodation={addAccommodation}
        isAccommodationAdded = {isAccommodationAdded}
        addedAccommodation = {addedAccommodation}
        />
      
      <div className='user_list'>
        {studentAccommodations.map((accommodation, index) => (
          <div className='each_student' key={index}>
              <div className='link-to-page logout center' >
                {accommodation.title}
              </div>
              <p onClick={() => removeAccommodation(accommodation._id, accommodation.useParams)} className='center'>
                <DeleteForeverIcon />
              </p>
          </div>
        ))}
      </div>

      {showConfirmationModal && (
        <Modal show={showConfirmationModal} onHide={handleCancelConfirmation}>
          <Modal.Header closeButton>
            <Modal.Title >Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
          <Modal.Footer>
            <Button className='modal-cancel' variant='secondary' onClick={handleCancelConfirmation}>
              Cancel
            </Button>
            <Button className = 'modal-delete' variant='danger' onClick={handleDeleteConfirmation}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}




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
    
      </div>
    </div>
  );
}
