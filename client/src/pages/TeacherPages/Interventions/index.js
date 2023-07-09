//only person accessing student profile will be the teacher
import React, {useState} from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'
import {ADD_INTERVENTION, REMOVE_INTERVENTION} from '../../../utils/mutations'
import {QUERY_USER, QUERY_ME, QUERY_INTERVENTION_LIST} from '../../../utils/queries'
import Auth from '../../../utils/auth'
import NavigationLinks from '../../../components/NavigationLinks'
import './index.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal, Button } from 'react-bootstrap';

export default function Interventions() {

  const { username: userParam } = useParams()
// const {loading, data} = useQuery(QUERY_USER, {
//   variables: {username: userParam}
// })

const [selectedIntervention, setSelectedIntervention] = useState("");
const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const [addedIntervention, setAddedIntervention] = useState([]);

const { loading, data } = useQuery(QUERY_ME)



const user = data?.me || data?.user || {};


const { loading: interventionsLoading, data: interventions } = useQuery(QUERY_INTERVENTION_LIST, {
  variables: { username: user.username },
});
const interventionList = interventions?.interventionList || []
console.log(interventionList)


console.log(user.username)
const [addInterventionToList, {error}] = useMutation(
  ADD_INTERVENTION
);

const [removeInterventionFromList] = useMutation(
  REMOVE_INTERVENTION
);


const removeIntervention = async (interventionId) => {
  setSelectedIntervention(interventionId)
  setShowConfirmationModal(true);

}


const handleDeleteConfirmation = async () => {
  try {
      await removeInterventionFromList({
          variables: {username: user.username, interventionId: selectedIntervention},
          refetchQueries: [
              {query: QUERY_INTERVENTION_LIST, variables: {username: user.username}},
              {query: QUERY_ME, variables: {username: user.username}}
          ]
      })
      
  } catch (e) {
      console.log(e)
  }
  setShowConfirmationModal(false)
  setSelectedIntervention(null)
  console.log('Intervention has been removed')
}

const handleCancelConfirmation = () => {
  setShowConfirmationModal(false)
  setSelectedIntervention(null)
}

const addIntervention = async (event) => {
  event.preventDefault();
  const title = event.target.elements.title.value;
  const summary = event.target.elements.summary.value;

  if (!selectedIntervention || !title || !summary) {
    return;
  }

  try {
    await addInterventionToList({
      variables: {
        username: user.username,
        functions: selectedIntervention,
        title: title,
        summary: summary,
      },
      refetchQueries: [
        { query: QUERY_INTERVENTION_LIST, variables: { username: user.username}},
        { query: QUERY_ME, variables: { username: user.username } },
      ],
    });
    const newIntervention = {
      type: selectedIntervention,
      title: title,
      summary: summary,
    };
    setAddedIntervention((prevAddedInterventions) => [...prevAddedInterventions, newIntervention]);
  } catch (e) {
    console.log(e);
  }

  event.target.reset();
  setSelectedIntervention('');
  console.log('Intervention has been added');
};


const isInterventionAdded = (title) => {
  const isAdded = addedIntervention[title] || interventionList.some((intervention) => intervention.functions === title);
  console.log(`Intervention title: ${title}, Is Added: ${isAdded}`);
  return isAdded;
};


if (loading) {
  return <div className='loader'>Loading...</div>;
}

  return (
    <div>
          <h2 className='profile-name'>Intervention Ideas</h2>
          {/* find a way to provide teacher with function of behavior based on additional studnet info */}
          <div className='flex_left'>
            {/* Need a search bar and possible make this page large so you can click on the 
            intervention regardless of if the teacher added it so that it more informaton 
            can be provided --teacher much add a detail and a summary of the intervention*/}
            {/* thoughts if I add an intervention for a specific student will tha tbe annoying?
            should their be an add intervention but it adds to the entire list not for a particular student */}       
            <div className='border_solid'>
                <h3 className='center_only'>Add Intervention</h3>
                <form className='flex_column' onSubmit={(e) => addIntervention(e)}>
                  {/* this form will be in the user schema,, otherwise 
                  i will seed in intervention ideas  */}
                <label htmlFor="Functions">Pick a Function:</label>
                        <select name="" id="functions" value={selectedIntervention} onChange={(e) => setSelectedIntervention(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Escape">Escape</option>
                        <option value="Attention">Attention</option>
                        <option value="Sensory">Sensory</option>
                        <option value="Tangible">Tangible</option>
                        <option value="Other">Other</option>
                        </select>
                    <label>Title: <input className='title' name ='title'></input></label>
                    <label>Summary: <input className='summary' name = 'summary'></input></label>
                    <button className="submit-btn" type="submit">
                Submit
              </button>
                </form>
            </div>
            
            <div className=' flex_right'>
            
            <div className='border_solid'>
          <h4>Interventions Ideas for Escape</h4>
          {/* if escape was selected then it needs to appear here */}
          <ul className='flex_column'>
       
        {isInterventionAdded('Escape') ? (
              interventionList
                .filter((intervention) => intervention.functions === 'Escape')
                .map((intervention) => (
                  <li key={intervention._id}>{intervention.title.charAt(0).toUpperCase() + intervention.title.slice(1)}
                 
                <DeleteForeverIcon  onClick={() => removeIntervention(intervention._id)} className='' />
           
                  </li>

                  
                ))
            ) : (
              ""
            )}
            <li>Scheduled Breaks</li>
          </ul>
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
          </div>


          <div className='border_solid'>
          <h4>Interventions Ideas for Access to Attention</h4>
          <ul className='flex_column'>
        {/* possible links to articles for these interventions or instead just a module that gives a description? */}
  
        {isInterventionAdded('Attention') ? (
              interventionList
                .filter((intervention) => intervention.functions === 'Attention')
                .map((intervention) => (
                  <li key={intervention._id}>{intervention.title.charAt(0).toUpperCase() + intervention.title.slice(1)}</li>
                ))
            ) : (
              ""
            )}
            <li>Teacher Helper</li>
          </ul>
          </div>

          <div className='border_solid'>
          <h4>Interventions Ideas for Sensory Stimulation</h4>
          <ul className='flex_column'>
              
        {isInterventionAdded('Sensory') ? (
              interventionList
                .filter((intervention) => intervention.functions === 'Sensory')
                .map((intervention) => (
                  <li key={intervention._id}>{intervention.title.charAt(0).toUpperCase() + intervention.title.slice(1)}</li>
                ))
            ) : (
              ""
            )}
            <li>Desk Velcro</li>
          </ul>
          </div>

          <div className='border_solid'>
          <h4>Interventions Ideas for Access to Tangible</h4>
          <ul className='flex_column'>
        {/* possible links to articles for these interventions? */}
        {isInterventionAdded('Tangible') ? (
              interventionList
                .filter((intervention) => intervention.functions === 'Tangible')
                .map((intervention) => (
                  <li key={intervention._id}>{intervention.title.charAt(0).toUpperCase() + intervention.title.slice(1)}</li>
                ))
            ) : (
              ""
            )}
            <li>Token Economy</li>
          </ul>
          </div>

          <div className='border_solid'>
          <h4>Other Interventions Ideas</h4>
          <ul className='flex_column'>
        {/* possible links to articles for these interventions? */}
        {isInterventionAdded('Other') ? (
              interventionList
                .filter((intervention) => intervention.functions === 'Other')
                .map((intervention) => (
                  <li key={intervention._id}>{intervention.title.charAt(0).toUpperCase() + intervention.title.slice(1)}</li>
                ))
            ) : (
              ""
            )}
           
          </ul>
          </div>


          </div>
          </div>
          
        
         
    </div>
  )
}
