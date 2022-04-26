import React from 'react';
import {Link} from 'react-router-dom';
import { VscProject } from "react-icons/vsc";
import { FaCriticalRole } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import {GrTechnology } from "react-icons/gr";
//import './Sidebar.css';

import { HiOutlineArrowCircleLeft } from "react-icons/hi";


const MasterSidebar = () => {
  return (
		<aside className="sidebar">
			<div className="barTitle">
			   <span className="sidebarHeader"><HiOutlineArrowCircleLeft /></span>
			   <span className="title">Resume</span>
			   <div className="title1">Builder</div>
			</div>
			<div className='sidelinks-p d-flex flex-column justify-content-around align-items-center'>
			    <Link className='sidebar-links'to="/projectMaster"><div><i><VscProject/></i>Project Master</div></Link>
				<Link className='sidebar-links'to="/roleMaster"><div><i><FaCriticalRole/></i>Role Master</div></Link>
				<Link className='sidebar-links'to="/skillMaster"><div><i><GiSkills/></i>Skill Master</div></Link>
				<Link className='sidebar-links'to="/techstackMaster"><div><i><GrTechnology/></i>TechStack Master</div></Link>
				
        </div>
		</aside>
	)
}

export default MasterSidebar