import React from 'react';
import {BrowerRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <BrowerRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyDetails />}/>
          <Route path="aboutMe" element={<AboutMe />}/>
          <Route path="skills" element={<Skills />}/>
          <Route path="workExp" element={<WorkExp />}/>
        </Route>
      </Routes>
    </BrowerRouter>
  );
}

export default App;
