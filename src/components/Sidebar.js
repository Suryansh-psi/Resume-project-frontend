import React from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import BadgeIcon from '@mui/icons-material/Badge';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LanIcon from '@mui/icons-material/Lan';

const Sidebar = () => {
  return (
		<aside className="sidebar">
			<div className="barTitle">
			   <span className="sidebarHeader"><HiOutlineArrowCircleLeft /></span>
			   <span className="title">Resume</span>
			   <div className="title1">Builder</div>
			</div>
			<div className="barSection">
			  <i className="icons"><MdEdit /></i>
			  <i className="icons"><FaShareSquare /></i>
			  <i className="icons"><FaFileAlt /></i>
			  <i className="icons"><BiDownload /></i>
			  <i className="dots"><BsThreeDotsVertical /></i>
			</div>
			<div className='sidelinks-p d-flex flex-column justify-content-around align-items-center'>
				<div className='sidebar-links'><Link to="/"><i><BadgeIcon/></i> My Details</Link></div>
				<div className='sidebar-links'><Link to="aboutme"><i><InfoIcon/></i>About Me</Link></div>
				<div className='sidebar-links'><Link to="skills"><i><LinkIcon/></i>Skills & Proficiencies</Link></div>
				<div className='sidebar-links'><Link to="workexp"><i><WorkIcon/></i>Work Experience</Link></div>
				<div className='sidebar-links'><Link to=""><i><SchoolIcon/></i>Educational Background</Link></div>
				<div className='sidebar-links'><Link to=""><i><EmojiEventsIcon/></i>Achievements</Link></div>
				<div className='sidebar-links'><Link to=""><i><LanIcon/></i>Memberships</Link></div>
        </div>
        <div className="status">
          <div className='d-flex justify-content-between w-100 table-sidebar'><div>Last Modified</div><div>DD/MM/YYYY</div></div>
          <div className='d-flex justify-content-between w-100 table-sidebar'><div>Reviewer</div><div>Not sent for review</div></div>
          <div className='d-flex justify-content-between w-100 table-sidebar'><div>Status</div><div>Draft</div></div>
        </div>
		</aside>
	)
}

export default Sidebar