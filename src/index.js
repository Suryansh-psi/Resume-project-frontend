import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App';

//Resume info 
sessionStorage.setItem("name", "Sample Text");
sessionStorage.setItem("role", ["role1", "role2"]);
sessionStorage.setItem("total_exp", 5);
sessionStorage.setItem("image", "");
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
sessionStorage.setItem("educationName", "d.type");
sessionStorage.setItem("educationType", "d.name");
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


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


