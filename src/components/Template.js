import React, { useState, useEffect } from 'react'
import './Template.css'
import { BiCircle } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';


const Template = () => {
	// const arr = Array.from(sessionStorage.mydetails)
	const [data, setData] = useState({
		name: "",
		role: "",
		image: "",
		total_exp: "",
		aboutMe: "",
		aboutMePoints: [],
		skills: [],
		workExp: []
	});

	const resume_id = sessionStorage.getItem("resume_id")
	useEffect(() => {
		axios.get(`http://localhost:8080/resume/alldetails/${resume_id}`).then(res => {
			const response = res.data;
			// console.log(data.name);
			console.log(data);
			setData({
				...data,
				name: response.name,
				role: response.role,
				image: response.image,
				total_exp: response.total_exp,
				// aboutMe: response.,
				// aboutMePoints: response.,
				// skills: response. ,
				// workExp: response.

			})
		})
	});



	return (

		<section className="template">
			<div className="header">
				<i><FaUserAlt /></i>
				<h2>{data.name}</h2>
				<h5>Role</h5>
				<h5>Total Exp:</h5>
			</div>
			<div className="row">
				<div className="column">
					<h6>ABOUT ME</h6>
					<p>Some text..</p>
				</div>
				<div className="column">
					<h6>WORK HISTORY</h6>
					<p>Some text....</p>
				</div>
				<div className="column1">
					<h6>SKILL & PROFICIENCIES</h6>
					<p>Some text...</p>
				</div>
				<div className="column">
					<h6>CERTIFICATION AND VOLUNTEER WORK</h6>
					<p>Some text..</p>
				</div>
				<div className="column">
					<h6>EDUCATIONAL BACKGROUND</h6>
					<p>Some text..</p>
				</div>
			</div>

		</section >

	)
}
export default Template