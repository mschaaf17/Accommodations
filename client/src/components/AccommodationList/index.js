import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import RecommendIcon from '@mui/icons-material/Recommend';
import thumb from '../../assets/images/thumbs-up-solid.svg'

const AccommodationList = ({ accommodations, title}) => {
    const [style, setStyle] = useState('single_accom')

    const changeStyle = (index) => () => {
        setStyle(state => ({
            ...state, 
            [index]: !state[index]
        }))
    }

    if (!accommodations.length) {
        return <div>
            <h3>No Accommodations Available</h3>
            <p>If testing then login as the username: kevin_12345 password: password</p>
        </div>

    }
    return (
        <div>
            <h2>Pick what you need {title}!</h2>
            <div className='accom_section'>
            {accommodations && accommodations.map((accommodation, index) => (
                <div className="single_accom"> {style[index] ? <div>{' '}</div> : <img className ="thumb"src= {thumb} alt="thumbs up"/>}
                    <div onClick={changeStyle(index)}>
                    <h3>{accommodation.title}</h3>
                    <img className ="accomm_img" src={accommodation.image} alt ="Picture of accommodation" />
                    {/* <p>{accommodation.image}</p> */}
                    </div>
                    </div>
            ))}
            </div>
        </div>
    )
}

// const AccommodationList = ({ accommodations, title}) => {
//     const [style, setStyle] = useState('single_accom')
//     const changeStyle = () => {
//         console.log('you just clicked this accommodation')
//         setStyle("button-clicked")
//     }

//     if (!accommodations.length) {
//         return <h3>No Accommodations Available</h3>

//     }
//     return (
//         <div>
//             <h2>{title}</h2>
//             <div className='accom_section'>
//             {accommodations && accommodations.map(accommodation => (
//                 <div className={style} key={accommodation._id} onClick={changeStyle}>
//                     <h3>{accommodation.title}</h3>
//                     <img className ="accomm_img" src={accommodation.image} alt ="Picture of accommodation" />
//                     {/* <p>{accommodation.image}</p> */}
//                     </div>
//             ))}
//             </div>
//         </div>
//     )
// }

export default AccommodationList