import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import {QUERY_USERS} from '../../utils/queries'
import "./index.css";
import SearchIcon from '@mui/icons-material/Search';
import StudentList from "../StudentList";
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function SearchBar({placeholder}) {
    const [style, setStyle] = useState('add_student')
    const [deleteStyle, setDeleteStyle] = useState('delete_student')
    const [filteredData, setFilteredData] = useState([]);
    const {loading, data} = useQuery(QUERY_USERS)
    const getAllUsers = data?.users || []

    const changeAddStyle = (index) => () => {
        setStyle(state => ({
            ...state,
            [index]: !state[index]
        }))
    }

    const handleFilter = (e) => {
       const searchWord = e.target.value
       const newFilter = getAllUsers.filter((user)=> {
       return (user.username.toLowerCase().includes(searchWord.toLowerCase()) &&
       !user.isAdmin);
       });
       if (searchWord === "") {
        setFilteredData([]);
       }
       else{
        setFilteredData(newFilter)

       }
    }
    return (
        <div className = "search"> 
            <div className="searchInputs">
                <input type ="text" placeholder = {placeholder} onChange={handleFilter}></input>
                <div className="searchIcon"><SearchIcon/></div>
            </div>
            <div className='user_list'> 
           {filteredData.length !=0 && (
            <div className="dataResult each_student">
                {filteredData.map((users, index)=>{
                    return (
                        <p key ={index}>
                        <Link className='link-to-page logout center' to ={`/studentProfile/${users.username}`}>{users.username}</Link>
                        <div className="logout center" onClick={changeAddStyle(index)}> {style[index] ? <div><AddIcon/></div> : <div><DeleteForeverIcon/></div>}
                    </div>
                    
                        </p>
                    )
                })}
                {/* <StudentList className="dataItem" filteredData = {filteredData} getAllUsers={getAllUsers}/> */}
                </div>
            
            )}

</div>

            </div>
    )
}

export default SearchBar