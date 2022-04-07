import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'
function Sidebar(props) {
	return (
		<aside className="sidebar">
			<h1 className="projectName">Resume Builder</h1>
			<ul>
				<li><Link to="/">My Details</Link></li>
				<li><Link to="aboutme">About Me</Link></li>
				<li><Link to="skills">Skills & Proficiencies</Link></li>
				<li><Link to="workexp">Work Experience</Link></li>
				<li><Link to="">Educational Background</Link></li>
				<li><Link to="">Achievements</Link></li>
				<li><Link to="">Memberships</Link></li>
			</ul>
		</aside>
	)
}

export default Sidebar