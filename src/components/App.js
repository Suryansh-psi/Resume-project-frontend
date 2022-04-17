import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutMe from './AboutMe';
import Skills from './Skills';
import WorkExp from './WorkExp';
import Layout from './Layout'
import MyDetails from './MyDetails'
import EducationalBackground from './EducationalBackground'
import Achievements from './Achievements'
import Memberships from './Memberships'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyDetails />}/>
          <Route path="aboutMe" element={<AboutMe />}/>
          <Route path="skills" element={<Skills />}/>
          <Route path="workExp" element={<WorkExp />}/>
          <Route path="educationalBackground" element={<EducationalBackground />}/>
          <Route path="achievements" element={<Achievements />}/>
          <Route path="memberships" element={<Memberships />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
