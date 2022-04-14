import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//import Example from './components/Example'
sessionStorage.setItem("name", "Sample Text");
sessionStorage.setItem("role", ["role1", "role2"]);
sessionStorage.setItem("total_exp", 5);
sessionStorage.setItem("image", "");

sessionStorage.setItem("aboutMe", "About Me Text");
sessionStorage.setItem("aboutMePoints", ['aboutList']);

sessionStorage.setItem("skills", ['d.skill']);

sessionStorage.setItem("clientDesc", "d.client_desc");
sessionStorage.setItem("country", "d.country");
sessionStorage.setItem("projectName", "d.project");
sessionStorage.setItem("role2", ['roleList']);
sessionStorage.setItem("startDate", "d.stardate");
sessionStorage.setItem("endDate", "d.enddate");
sessionStorage.setItem("bussinessSol", "d.business_sol");
sessionStorage.setItem("techStack", ['techList']);
sessionStorage.setItem("projectResp", ['projRespList']);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);


