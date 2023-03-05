import React from 'react'
import { Link, useParams } from 'react-router-dom'

// Student Charts for frequency, duration?? eloping/aggression/other?, observation form, abc data   
export default function StudentCharts() {
  return (
    <div>
      <div>
        <button><Link to ={`/`}>Provide more Information on this student</Link></button>
        {/* this button should be similar to a bip or the questionairre for student behavior such as a FBA */}
      <h2>Data</h2>
      <div>Frequency</div>
      <div>Duration</div>
      <div>Contract</div>
      <div>ABC???</div>
        </div>
      <div>
        Intervention Suggestions:
      </div>
      <div> <Link className="link-to-page logout" to ={`/teacherdata`}> ← Back to Student List</Link></div>
    </div>
  )
}
