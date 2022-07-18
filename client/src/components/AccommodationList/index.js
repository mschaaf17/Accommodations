import React from 'react'
import {Link} from 'react-router-dom'

const AccommodationList = ({ accommodations, title}) => {
    if (!accommodations.length) {
        return <h3>No Accommodations Available</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            {accommodations && accommodations.map(accommodation => (
                <div key={accommodation._id}>
                    <h2>{accommodation.title}</h2>
                    <p>{accommodation.image}</p>
                    </div>
            ))}
        </div>
    )
}

export default AccommodationList