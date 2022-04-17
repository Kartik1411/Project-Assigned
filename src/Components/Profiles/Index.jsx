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
    const [filterByTag, setFilterByTag] = useState("");
    const [filterByTagResults, setFilterByTagResults] = useState([]);
    // console.log('filterByTagResults: ', filterByTagResults);

    const [searchValues, searchDispatch] = useReducer(
        searchReducer,
        initialSearchValues
    )

    const getStudentsWithTags = (students) => {
        let studentsWithTag = [];
    
        for (const student of students) {
            if (student.tags) {
                studentsWithTag.push(student);
            }
        }
    
        return studentsWithTag;
    };


    const filterStudentsByTag = (tag, students, setFilterByTagResults) => {
        if (tag === "") {
            setFilterByTagResults([]);
        }

        const studentsWithTag = getStudentsWithTags(students);
    
        if (tag === "" || studentsWithTag === []) return;

        const searchResult = [];
        const data = tag.toLowerCase();

        for (const student of studentsWithTag) {
            const tags = student.tags;
            for (const tag of tags) {
                if (
                    [...tag].includes(data) ||
                    tag === data ||
                    tag.split(" ").includes(data)
                ) {
                    searchResult.push(student);
                }
            }
        }
    
        // console.log('searchResult: ', searchResult);
        setFilterByTagResults(searchResult);
    };

    const filteredData = students?.filter((student) =>
        ((!searchValues.searchByName.toLowerCase() || student.firstName.toLowerCase().indexOf(searchValues.searchByName) !== -1) ||
            (!searchValues.searchByName.toLowerCase() || student.lastName.toLowerCase().indexOf(searchValues.searchByName) !== -1) 
            ) 
            && filterByTagResults 
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
                <input type="text" id="filterByTag" placeholder='Search by Tag' value={filterByTag} 
                    onChange={(e) => setFilterByTag(e.target.value)}
                    onKeyUp={(e) => filterStudentsByTag(e.target.value, students, setFilterByTagResults)}
                />
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