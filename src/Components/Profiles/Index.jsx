import React, { useContext, useReducer } from "react";
import "./Index.css";

import StudentList from "../StudentList/Index";

import { StudentsContext } from "../../App";

const initialSearchValues = {
  searchByName: "",
  searchByTag: "",
};

const initialtagValue = {
  tagName: "",
  tagId: "",
};

let tagArray = [];

const searchReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      ...state,
      [action.id]: action.value,
    };
  }
  return state;
};

const tagReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      ...state,
      tagName: action.tagName,
      tagId: action.tagId,
    };
  }
  if (action.type === "SUBMIT") {
    return {
      ...state,
      ...action.value,
    };
  }
  return state;
};

function Profiles() {
  const [students, setStudents] = useContext(StudentsContext);

  const [searchValues, searchDispatch] = useReducer(
    searchReducer,
    initialSearchValues
  );

  const [tagState, tagDispatch] = useReducer(tagReducer, initialtagValue);

  const filteredData = students?.filter(
    (student) =>
      !searchValues.searchByName.toLowerCase() ||
      student.firstName.toLowerCase().indexOf(searchValues.searchByName) !==
        -1 ||
      !searchValues.searchByName.toLowerCase() ||
      student.lastName.toLowerCase().indexOf(searchValues.searchByName) !== -1
  );

  const onChange = (e) => {
    searchDispatch({
      type: "INPUT",
      id: e.target.id,
      value: e.target.value,
    });
  };

  const addTag = (e) => {
    e.preventDefault();
    const clickedStudentID = students.findIndex(
      (student) => student.id === tagState.tagId
    );
    const studentsWithTags = [...students];
    tagArray.push(tagState.tagName);
    studentsWithTags[clickedStudentID] = {
      ...studentsWithTags[clickedStudentID],
      tags: tagArray,
    };
    setStudents(studentsWithTags);

    tagDispatch({
      type: "SUBMIT",
      value: initialtagValue,
    });
  };

  const onChangeTag = (e) => {
    tagDispatch({
      type: "INPUT",
      tagId: e.target.id,
      tagName: e.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Students Details</h1>

      <form className="search-form">
        <input
          type="text"
          id="searchByName"
          placeholder="Search by Name"
          value={searchValues.searchByName}
          onChange={onChange}
        />
      </form>

      {/* <form className="search-form">
        <input
          type="text"
          id="filterByTag"
          placeholder="Search by Tag"
          value={filterByTag}
          onChange={(e) => setFilterByTag(e.target.value)}
          onKeyUp={(e) =>
            filterStudentsByTag(e.target.value, students, setFilterByTagResults)
          }
        />
      </form> */}

      <hr />

      {filteredData?.map((student, key) => {
        return (
          <StudentList
            key={key}
            student={student}
            tags={tagState}
            onAddTag={addTag}
            onChangeTag={onChangeTag}
          />
        );
      })}
    </div>
  );
}

export default Profiles;
