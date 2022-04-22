import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import UserHome from './UserHome';
import ManagerHome from './ManagerHome';
import AboutMe from './AboutMe';
import Skills from './Skills';
import WorkExp from './WorkExp';
import Layout from './Layout'
import MyDetails from './MyDetails'
import EducationalBackground from './EducationalBackground'
import Achievements from './Achievements'
import Memberships from './Memberships'

import RoleMaster from './Master/RoleMaster';
import ProjectMaster from './Master/ProjectMaster';
import TechStackMaster from './Master/TechStackMaster';
import SkillMaster from './Master/SkillMaster';

import EditMyDetails from './editForms/EditMyDetails';
import EditAboutMe from './editForms/EditAboutMe';
import EditSkills from './editForms/EditSkills';
import EditWorkExp from './editForms/EditWorkExp';
import EditEducationalBackground from './editForms/EditEducationalBackground';
import EditAchievements from './editForms/EditAchievements';
import EditMemberships from './editForms/EditMemberships';
// import EditTemplate from './editForms/EditTemplate';
import EditLayout from './editForms/EditLayout';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login screen */}
        <Route path="/" element={<Home />}/>


        {/* Home Screens */}
        <Route path="/userHome" element={<UserHome />}/>
        <Route path="/managerHome" element={<ManagerHome />}/>

        {/* Master Screens */}
        <Route path="/projectMaster" element={<ProjectMaster />}/>
        <Route path="/roleMaster" element={<RoleMaster />}/>
        <Route path="/skillMaster" element={<SkillMaster />}/>
        <Route path="/techstackMaster" element={<TechStackMaster />}/>

        {/* Main froms */}
        <Route path="/forms/" element={<Layout />}>  
          <Route path="myDetails" element={<MyDetails />}/>
          <Route path="aboutMe" element={<AboutMe />}/>
          <Route path="skills" element={<Skills />}/>
          <Route path="workExp" element={<WorkExp />}/>
          <Route path="educationalBackground" element={<EducationalBackground />}/>
          <Route path="achievements" element={<Achievements />}/>
          <Route path="memberships" element={<Memberships />}/>
        </Route>

        {/* Editing forms */}
        <Route path="/editforms/" element={<EditLayout />}>  
          <Route path="editMyDetails" element={<EditMyDetails />}/>
          <Route path="editAboutMe" element={<EditAboutMe />}/>
          <Route path="editSkills" element={<EditSkills />}/>
          <Route path="editWorkExp" element={<EditWorkExp />}/>
          <Route path="editEducationalBackground" element={<EditEducationalBackground />}/>
          <Route path="editAchievements" element={<EditAchievements />}/>
          <Route path="editMemberships" element={<EditMemberships />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
