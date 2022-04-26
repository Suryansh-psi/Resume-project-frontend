import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import EditSidebar from './components/Master/MasterSidebar';
import RoleMaster from './components/Master/RoleMaster';
import ReactNotifications  from 'react-notifications-component'

//Resume info

sessionStorage.setItem("name", "Sample Text");
sessionStorage.setItem("role", ["role1", "role2"]);
sessionStorage.setItem("total_exp", 5);
sessionStorage.setItem("image", "userIcon.png");
// about me info
sessionStorage.setItem("aboutMe", "About Me Text");
sessionStorage.setItem("aboutMePoints", ['aboutList']);
// skills info
sessionStorage.setItem("skills", ['d.skill']);
// workexp info
sessionStorage.setItem("clientDesc", "d.client_desc");
sessionStorage.setItem("country", "d.country");
sessionStorage.setItem("projectName", "d.project");
sessionStorage.setItem("role2", ['roleList']);
sessionStorage.setItem("startDate", "d.stardate");
sessionStorage.setItem("endDate", "d.enddate");
sessionStorage.setItem("bussinessSol", "d.business_sol");
sessionStorage.setItem("techStack", ['techList']);
sessionStorage.setItem("projectResp", ['projRespList']);
// educational background info
sessionStorage.setItem("educationName", "d.name");
sessionStorage.setItem("educationType", "d.type");
sessionStorage.setItem("educationLocation", "d.location");
sessionStorage.setItem("startDate", "d.startdate");
sessionStorage.setItem("endDate", "d.enddate");
sessionStorage.setItem("percentage", "d.percentage");
// achievements info
sessionStorage.setItem("achievement", ['achievementList']);
sessionStorage.setItem("certificate", ['certificateList']);
// membership info
sessionStorage.setItem("membership", ['membershipList']);


const root = createRoot( document.getElementById('root') );

root.render(<App />);
// root.render(<RoleMaster />);


// ReactDOM.render( <App />,
//   document.getElementById('root')
// );


