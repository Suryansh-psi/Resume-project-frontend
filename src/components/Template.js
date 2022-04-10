import React, { useState, useEffect } from 'react'
import './Template.css'
import { BiCircle } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';


const Template = (props) => {
	// const arr = Array.from(sessionStorage.mydetails)
	// const [render, setRender] = useState(0)


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
	let result = null;
	const resume_id = sessionStorage.getItem("resume_id")
	useEffect(() => {
		// if(props.term > 0) {
		result = async () => {
			try {
				const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${resume_id}`).then(res => {
					const response = res.data;
					console.log(res.data)
					// console.log(data);
					setData({
						...data,
						name: response.name,
						role: response.role,
						image: response.image,
						total_exp: response.total_exp,
						aboutMe: response.about_me,
						aboutMePoints: response.about_me_points,
						skills: response.skills,
						workExp: response.workExps

					})
				})
			}
			catch (err) {
				console.log(err);
			}
		}
		result();
		// }

		console.log(props.term);
	}, [props.term, result]);



	let name = sessionStorage.getItem("name");
	let role = sessionStorage.getItem("role");
	let total_exp = sessionStorage.getItem("total_exp");
	let image = sessionStorage.getItem("image");
	let aboutMe = sessionStorage.getItem("aboutMe");
	let aboutMePoints = sessionStorage.getItem("aboutMePoints");
	let skills = sessionStorage.getItem("skills");
	let clientDesc = sessionStorage.getItem("clientDesc");
	let country = sessionStorage.getItem("country");
	let projectName = sessionStorage.getItem("projectName");
	let role2 = sessionStorage.getItem("role2");
	let startDate = sessionStorage.getItem("startDate");
	let endDate = sessionStorage.getItem("endDate");
	let bussinessSol = sessionStorage.getItem("bussinessSol");
	let techStack = sessionStorage.getItem("techStack");
	let projResp = sessionStorage.getItem("projectResp");

	const roleMapping = () => {
		role = role.split(',');
		// if (true & data) {
			let result = role.map(rol => {
				return <span>{rol} | </span>
			});
			return result;
		// }
	}

	const skillsMapping = () => {
		skills = skills.split(',');
		// if (true & data) {
			let result = skills.map(skill => {
				return <li>{skill}</li>
			});
			return result;
		// }
	}

	const aboutMePointsMapping = () => {
		aboutMePoints = aboutMePoints.split(',');
		// if(true & data) {
			let result =  aboutMePoints.map(point => {
				return <li>{point}</li>
			})
			return result;
		// }
	}

	const projRespMapping = () => {
		projResp = projResp.split(',');
		// if(true & data) {
			let result =  projResp.map(point => {
				return <li>{point}</li>
			})
			return result;
		// }
	}


	return (

		<section className="template">
			<div className="header">
				<i><FaUserAlt /></i>
				<h2>{name}</h2>
				<h5>{roleMapping()}</h5>
				<h5>Total Exp: {total_exp}</h5>
			</div>
			<div className="row">
				<div className="column">
					<h6>ABOUT ME</h6>
					<p>{aboutMe}</p>
					<ul>
						{aboutMePointsMapping()}
					</ul>
				</div>
				<div className="column">
					<h6>WORK HISTORY</h6>
					<p>Client: {clientDesc}</p>
					<p>Project: {projectName}</p>
					<h5>Role: {role2}</h5>
					<p>Duration: {startDate} {endDate}</p>
					<p>Business Solution: {bussinessSol}</p>
					<div className='tech-stack-output'>
						{techStack}
					</div>
					<div className='project-res-output'>
						<ul>
							{projRespMapping()}
						</ul>
					</div>
				</div>
				<div className="column1">
					<h6>SKILL & PROFICIENCIES</h6>
					<ul>
						{skillsMapping()}
					</ul>
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
export default Template;