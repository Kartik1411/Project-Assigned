import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Profiles from './Components/Profiles/Index';

export const StudentsContext = React.createContext([]);

function App() {

  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    await axios.get('https://api.hatchways.io/assessment/students')
    .then((response) => {
      setStudents(response.data.students);
    }).catch((err) => {
      console.log(err);
    })
  }

  
  useEffect(() => {
    fetchData();
  },[])

  return (
    <StudentsContext.Provider value={[students, setStudents]}>
      <div className="App">
        <Profiles />
      </div>
    </StudentsContext.Provider>
  );
}

export default App;
