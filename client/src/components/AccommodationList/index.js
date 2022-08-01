import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const AccommodationList = ({ accommodations, title}) => {
    const [style, setStyle] = useState('single_accom')
    const changeStyle = () => {
        console.log('you just clicked this accommodation')
        setStyle("button-clicked")
    }

    

    if (!accommodations.length) {
        return <h3>No Accommodations Available</h3>

    }

    return (
        <div>
            <h2>{title}</h2>
            <div className='accom_section'>
            {accommodations && accommodations.map(accommodation => (
                <div className={style} key={accommodation._id} onClick={changeStyle}>
                    <h3>{accommodation.title}</h3>
                    <img className ="accomm_img" src={accommodation.image} alt ="Picture of accommodation" />
                    {/* <p>{accommodation.image}</p> */}
                    </div>
            ))}
            </div>
        </div>
    )
}

export default AccommodationList