// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_USERS, QUERY_ME, QUERY_USER } from '../../../utils/queries';
// import { Link } from 'react-router-dom';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { Modal, Button } from 'react-bootstrap';
// import { REMOVE_STUDENT_FROM_LIST } from '../../../utils/mutations';

// export default function TeacherDataTracking() {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [addedStudents, setAddedStudents] = useState({});
  
//   const { loading, data } = useQuery(QUERY_USERS);
//   const { data: user } = useQuery(QUERY_USER);
//   const getAllUsers = data?.users || {};

//   const { data: dataMe } = useQuery(QUERY_ME);
//   const getMyStudentList = dataMe?.me.students || [];

//   const [removeStudentFromList, { error }] = useMutation(REMOVE_STUDENT_FROM_LIST);

//   const removeStudent = async (userId) => {
//     setSelectedStudent(userId);
//     setShowConfirmationModal(true);
//   };

//   const handleDeleteConfirmation = async () => {
//     try {
//       await removeStudentFromList({
//         variables: { studentId: selectedStudent },
//         refetchQueries: [
//           { query: QUERY_ME },
//           { query: QUERY_USERS },
//         ],
//       });
//       setAddedStudents((prevAddedStudents) => ({
//         ...prevAddedStudents,
//         [selectedStudent]: !prevAddedStudents[selectedStudent],
//       }));
//     } catch (e) {
//       console.log(e);
//     }
//     setShowConfirmationModal(false);
//     setSelectedStudent(null);
//     console.log('Student has been removed from the list');
//   };

//   const handleCancelConfirmation = () => {
//     setShowConfirmationModal(false);
//     setSelectedStudent(null);
//   };

//   return (
//     <div>
//       <Link className='link-to-page logout center' to={`/addstudent/${dataMe?.me.username}`}>
//         Add a Student
//       </Link>

//       <h2>Pick a student to start logging data</h2>

//       <div className='user_list'>
//         {Object.values(getMyStudentList && getMyStudentList).map((student, index) => (
//           <div className='each_student' key={index}>
//             <p>
//               <Link className='link-to-page logout center' to={`/studentProfile/${student.username}`}>
//                 {student.username}
//               </Link>
//               <p onClick={() => removeStudent(student._id)} className='center'>
//                 <DeleteForeverIcon />
//               </p>
//             </p>
//           </div>
//         ))}
//       </div>

//       {showConfirmationModal && (
//         <Modal show={showConfirmationModal} onHide={handleCancelConfirmation}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirmation</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
//           <Modal.Footer>
//             <Button variant='secondary' onClick={handleCancelConfirmation}>
//               Cancel
//             </Button>
//             <Button variant='danger' onClick={handleDeleteConfirmation}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </div>
//   );
// }



















import React, {useState, useEffect} from 'react'
import { Modal, Button } from "react-bootstrap"
import "./index.css"

export default function Duration() {
  const [showModal, setShow] = useState(false)
  const handleClose = ()=> setShow(false)
  const handleShow =() =>setShow(true)

  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)

  const handleClickStop = () => {
      setTimerOn(false)
  }

  useEffect(()=> {
      let interval = null

      if(timerOn) {
          interval = setInterval(() => {
              setTime(prevTime => prevTime + 1000)
          }, 1000)
      } else {
          clearInterval(interval)
      }
      return () => clearInterval(interval)
  }, [timerOn])

     
  return (
    <div className="data-logging-container">
      <h2 >Duration Data</h2>
      <p>Start timer when behavior occurs/Stop when behavior is over</p>
      <div className="timer">  
            <span>{('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
              <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
              <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
              {/* <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}

              <div className="timer-button-container">
              {!timerOn && time === 0 && (
                <button className="green time-btn" onClick={()=> setTimerOn(true)}>
                  Start
                </button>
              )}
              {timerOn && (
                <button className="red time-btn" onClick={handleClickStop}>
                  Stop
                </button>
              )}

              {!timerOn && time !== 0 && (
                <button className="green time-btn" onClick={() => setTimerOn(true)}>
                  Resume
                </button>
              )}

              {!timerOn && time > 0 && (
                <button className="yellow time-btn" onClick={() => setTime(0)}>
                  Reset
                </button>
              )}

{!timerOn && time !== 0 && (
                <button className="blue time-btn" onClick={()=>{handleClickStop(); handleShow()}}>
                  Save
                </button>
              )}
              <div className="entire-modal">
              <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Type of Behavior</Modal.Title>
        </Modal.Header>
        <Modal.Body>
               <form>
                <input list="typelist" type="text" name="behavior" autoComplete="off" placeholder="Add/Select Behavior"
                />
                <datalist>
                  <option>elopement</option>
                </datalist>

               </form>
              </Modal.Body>
        <Modal.Footer>
          <button className="modal-btn-close" variant="secondary" onClick={handleClose}>
            Close
          </button>
          {/*  handle submit function for form*/}
          <button className="modal-btn-save" variant="primary" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
      </div>
              {/* <button onClick = {submitTime}>Save</button> */}
  {/*need to be able to save type of behavior for duration quickly  */}
              
            </div>
      </div>


    
    </div>
  )
}
