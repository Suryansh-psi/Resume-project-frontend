import React from 'react';
import {Link} from 'react-router-dom';
import './EditSidebar.css';
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

const EditSidebar = () => {
  return (
		<aside className="Editsidebar">
			<div className="barTitle">
			   <Link to="/UserHome"><span className="sidebarHeader"><HiOutlineArrowCircleLeft /></span></Link>
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
			    <Link className='sidebar-links'to="editMyDetails"><div><i><BadgeIcon/></i> My Details</div></Link>
				<Link className='sidebar-links'to="editAboutMe"><div ><i><InfoIcon/></i>About Me</div></Link>
				<Link className='sidebar-links'to="editSkills"><div ><i><LinkIcon/></i>Skills & Proficiencies</div></Link>
				<Link className='sidebar-links'to="editWorkExp"><div ><i><WorkIcon/></i>Work Experience</div></Link>
				<Link className='sidebar-links'to="editEducationalBackground"><div ><i><SchoolIcon/></i>Educational Background</div></Link>
				<Link className='sidebar-links'to="editAchievements"><div><i><EmojiEventsIcon/></i>Achievements</div></Link>
				<Link className='sidebar-links'to="editMemberships"><div><i><LanIcon/></i>Memberships</div></Link>
        </div>
        <div className="status">
          <div className='d-flex justify-content-between w-100 table-sidebar'><div>Last Modified</div><div>DD/MM/YYYY</div></div>
          <div className='d-flex justify-content-between w-100 table-sidebar'><div>Reviewer</div><div>Not sent for review</div></div>
          <div className='d-flex justify-content-between w-100 table-sidebar'><div>Status</div><div>Draft</div></div>
        </div>
		</aside>
	)
}

export default EditSidebar;