import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import {QUERY_USERS} from '../../utils/queries'
import "./index.css";
import SearchIcon from '@mui/icons-material/Search';
import StudentList from "../StudentList";
import { Link } from 'react-router-dom'

function SearchBar({placeholder}) {
    const [filteredData, setFilteredData] = useState([]);
    const {loading, data} = useQuery(QUERY_USERS)
    const getAllUsers = data?.users || []
    const handleFilter = (e) => {
       const searchWord = e.target.value
       const newFilter = getAllUsers.filter((value)=> {
       // return console.log("youve done it")
       //return console.log(value.username)
       return value.username.toLowerCase().includes(searchWord.toLowerCase());
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
           {filteredData.length !=0 && (
            <div className="dataResult">
                {filteredData.map((users, key)=>{
                    return (
                        <Link className='link-to-page logout' to ={`/studentProfile/${users.username}`}>{users.username}</Link>
                    )
                })}
                {/* <StudentList className="dataItem" filteredData = {filteredData} getAllUsers={getAllUsers}/> */}
                </div>
            )}
            </div>
    )
}

export default SearchBar