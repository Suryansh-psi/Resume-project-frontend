import React from 'react'
import './Template.css'
import { BiCircle } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
function Template() {
	// const arr = Array.from(sessionStorage.mydetails)
	return (
		<section className="template">
			<div className="header">
			    <i><FaUserAlt /></i>
				<h2>Virendra Singh</h2>
				<h5>Role</h5>
				<h5>Total Exp:</h5>
			</div>
			<div class="row">
			  <div class="column">
			  <h6>ABOUT ME</h6>
			  <p>Some text..</p>
			  </div>
			  <div class="column">
			  <h6>WORK HISTORY</h6>
			  <p>Some text..</p>
			  </div>
			  <div class="column1">
			  <h6>SKILL & PROFICIENCIES</h6>
			  <p>Some text..</p>
			  </div>
		    <div class="column">
			  <h6>CERTIFICATION AND VOLUNTEER WORK</h6>
			  <p>Some text..</p>
			  </div>
			  <div class="column">
			  <h6>EDUCATIONAL BACKGROUND</h6>
			  <p>Some text..</p>
		    </div>
			</div>

		</section>
		
	)
}
export default Template