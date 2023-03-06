import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import RecommendIcon from '@mui/icons-material/Recommend';
import thumb from '../../assets/images/thumbs-up-solid.svg'



const AllAccommodationCards = ({ accommodations, accommodationClicked}) => {
    const [style, setStyle] = useState('single_accom')


//{changeStyle}
    const changeStyle = (index) => () => {
        setStyle(state => ({
            ...state, 
            [index]: !state[index]
        }))
    }

    // if (!accommodations.length) {
    //     return <div>
    //         <h3>No Accommodations Available</h3>
    //     </div>

    // }


    //NOT WORKING YET!!! STILL NEED TO ADD ACCOMMODTION CORRECTLY WHEN CLICKED
    return (
        <div>
             <div className='accom_section'>
             {accommodations && accommodations.map(accommodation => (

                <div className={style} key={accommodation._id}  onClick= {accommodationClicked}>
                     <h3>{accommodation.title}</h3>
                     <img className ="accomm_img" src={accommodation.image} alt ="Picture of accommodation" />
                     {/* <p>{accommodation.image}</p> */}
                     </div>
             ))}
             </div>
        </div>
    )
}


// <div className='accom_section'>
//             {accommodations && accommodations.map((accommodation, index) => (
//                 <div className="single_accom"> {style[index] ? <div>{' '}</div> : <img className ="thumb"src= {thumb} alt="thumbs up"/>}
//                     <div onClick={changeStyle(index)}>
//                     <h3>{accommodation.title}</h3>
//                     <img className ="accomm_img" src={accommodation.image} alt ="Picture of accommodation" />
//                     {/* <p>{accommodation.image}</p> */}
//                     </div>
//                     </div>
//             ))}
//             </div>


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

export default AllAccommodationCards