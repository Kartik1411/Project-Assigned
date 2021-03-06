import React, { useState } from "react";
import "../Profiles/Index.css";

function StudentList(props) {
  const student = props.student;
  // console.log("student: ", student.id);

  const tag = props.tags;

  const [showPlusBtn, setShowPlusBtn] = useState(true);
  const [showMinusBtn, setShowMinusBtn] = useState(false);
  const [on, setOn] = useState(false);

  const getAverage = (grades) => {
    let sum = 0;
    let average = 0;
    let i;

    for (i = 0; i < grades.length; i++) {
      grades[i] = parseInt(grades[i]);
      sum += grades[i];
      average = sum / grades.length;
    }
    return average;
  };

  const togglePlusMinus = () => {
    setOn(!on);
    setShowPlusBtn(!showPlusBtn);
    setShowMinusBtn(!showMinusBtn);
  };

  return (
    <>
      <div className="each-student">
        <div className="student-profile">
          <img src={student.pic} alt="student avtar" />
          <div className="student-details">
            <ul>
              <li className="student-name">
                {student.firstName} {student.lastName}
              </li>
              <li>Email: {student.email}</li>
              <li>Company: {student.company}</li>
              <li>Skill: {student.skill}</li>
              <li>Average: {getAverage(student.grades)} %</li>
              <li>
                {student.tags && student.tags.length > 0
                  ? student.tags.map((tag, index) => (
                      <button key={index}>{tag}</button>
                    ))
                  : ""}
              </li>
              <li>
                <form onSubmit={props.onAddTag}>
                  <input
                    id={student.id}
                    type="text"
                    value={tag.tagName}
                    placeholder="add new tag"
                    onChange={props.onChangeTag}
                  />
                  <br />
                  <br />
                  <button className="add-tag">Add Tag</button>
                </form>
              </li>
            </ul>
            <div className="buttons">
              {showPlusBtn && (
                <button className="plus-minus-btn" onClick={togglePlusMinus}>
                  +<span style={{ fontSize: "15px" }}>Click to see grades</span>
                </button>
              )}

              {showMinusBtn && (
                <button className="plus-minus-btn" onClick={togglePlusMinus}>
                  -
                  <span style={{ fontSize: "15px" }}>Click to hide grades</span>
                </button>
              )}
            </div>
            {on &&
              student.grades.map((grade, index) => {
                return (
                  <li className="grades-li" key={index}>
                    Test {index + 1}: {grade}%
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentList;
