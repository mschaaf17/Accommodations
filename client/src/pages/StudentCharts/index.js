import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function StudentCharts() {
  return (
    <div>
      Student Charts for frequency, duration?? eloping/aggression/other?, observation form, abc data   
      <div> <Link className="link-to-page logout" to ={`/teacherdata`}> ← Back to Student List</Link></div>
    </div>
  )
}
