import React from 'react'
import {Link} from 'react-router-dom'

const AccommodationList = ({ accommodations, title}) => {
    if (!accommodations.length) {
        return <h3>No Accommodations Available</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            <div className='accom_section'>
            {accommodations && accommodations.map(accommodation => (
                <div className="single_accom" key={accommodation._id}>
                    <h2>{accommodation.title}</h2>
                    <img className ="accomm_img" src={accommodation.image} alt ="Picture of accommodation" />
                    {/* <p>{accommodation.image}</p> */}
                    </div>
            ))}
            </div>
        </div>
    )
}

export default AccommodationList