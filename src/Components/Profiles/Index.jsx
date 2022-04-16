import React, {useContext, useReducer, useState} from 'react';
import './Index.css';

import StudentList from '../StudentList/Index';

import { StudentsContext } from '../../App';

const initialSearchValues = {
    searchByName: "",
    searchByTag: "",
} 

const searchReducer = (state, action) => {
    if(action.type === "INPUT"){
        return{
            ...state,
            [action.id]: action.value
        }
    }
    return state;
} 

function Profiles() {

    const [students] = useContext(StudentsContext);

    const [tag, setTag] = useState(""); 

    const [searchValues, searchDispatch] = useReducer(
        searchReducer,
        initialSearchValues
    )

    const filteredData = students?.filter((student) =>
        ((!searchValues.searchByName.toLowerCase() || student.firstName.toLowerCase().indexOf(searchValues.searchByName) !== -1) ||
            (!searchValues.searchByName.toLowerCase() || student.lastName.toLowerCase().indexOf(searchValues.searchByName) !== -1) 
        ) 
        && (!searchValues.searchByTag.toLowerCase() || tag.toLowerCase().indexOf(searchValues.searchByTag) !== -1) 
    );

    const onChange = (e) => {
        searchDispatch({
            type: "INPUT",
            id: e.target.id,
            value: e.target.value
        })
    }

    const addTag = (event, tag, student, setTag) => {
        event.preventDefault();

        if (tag === "") return;
    
        if (student.tags) {
            student.tags.push(tag);
        } else {
            student.tags = [tag];
        }

        setTag("");
    };

    return (
        <div className='container'>

            <h1>Students Details</h1>

            <form className='search-form'>
                <input type="text" id="searchByName" placeholder='Search by Name' value={searchValues.searchByName} onChange={onChange}/>
            </form>

            <form className='search-form'>
                <input type="text" id="searchByTag" placeholder='Search by Tag' value={searchValues.searchByTag} onChange={onChange}/>
            </form>

            <hr />

            {
                filteredData?.map((student, key) => {
                    return(
                        <StudentList key={key} student={student} tags={tag} setTag={setTag} onAddTag={addTag}/>
                    )
                })
            }
        </div>
    )
}

export default Profiles;