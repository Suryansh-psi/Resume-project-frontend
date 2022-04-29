import React, { useState, useEffect } from 'react'
import './EditTemplate.css'
import { BiSquare} from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const EditTemplate = (props) => {

	const [resumeInfo, setResumeInfo] = useState({});
	const params = useParams();

	let result = null;
	useEffect(() => {
		result = async () => {
			try {
				const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${params.id}`).then(res => {
					const response = res.data;
					// console.log(res.data)
					setResumeInfo(res.data);
				})
			}
			catch (err) {
				console.log(err);
			}
		}
		result();
	}, [props.term, result]);

	
	const roleMapping = () => {
		let result = resumeInfo.role.map(rol => {
			return <span>{rol} | </span>
		});
		return result;
	}

	const skillsMapping = (skill) => {
		let result = skill.map(skill => {
			skill = skill.split("#");
			return <li>{`${skill[0]} : ${skill[1]}`}</li>
		});
		return result;
	}

	const aboutMePointsMapping = () => {
		let result = resumeInfo.about_me_points.map(point => {
			return <li>{point}</li>
		})
		return result;
	}

	const projRespMapping = (resp) => {
		let result = resp.map(point => {
			return <li>{point}</li>
		})
		return result;
	}


	const techStackMapping = (techstack) => {
		let result = techstack.map(point => {
			return <input type="text" name="technology[]" value={point} />
		})
		return result;
	}

	const achievementMapping = () => {
		let achievemetns = resumeInfo.achievement;
		let result = achievemetns.map(point => {
			return <li>{point}</li>
		})
		return result;
	}

	const certificateMapping = () => {
		let certificates = resumeInfo.certificate;
		let result = certificates.map(point => {
			return <li>{point}</li>
		})
		return result;
	}

	const membershipMapping = () => {
		let membership = resumeInfo.membership;
		let result = membership.map(point => {
			return <li>{point}</li>
		})
		return result;
	}

	const workExpMapping = () => {
		let result = [];
		result = resumeInfo.workExps.map((data, index) => {
			return (
				<>
					<p>Client: {data.clientDesc}</p>
					<p>Project: {data.projectName}</p>
					<p>Role: {data.role.toString()}</p>
					<p>Duration: {data.startDate} {data.endDate}</p>
					<p>Business Solution: {data.bussinessSol}</p>
					<div className='tech-stack-output'>
						{techStackMapping(data.techStack)}
					</div>
					<div className='project-res-output'>
						<ul>
							{projRespMapping(data.projectResp)}
						</ul>
					</div>
				</>
			)
		})
		return result;
	}

	const educationMapping = () => {
		let result = [];
		result = resumeInfo.educations.map((data, index) => {
			return (
				<>
					<p>{data.educationType}</p>
					<p>{data.educationName}</p>
					<p>{data.educationLocation}</p>
					<p>{data.startDate} - {data.endDate}</p>
					<p>{`Percentage : ${data.percentage}`}</p>
				</>
			)
		})
		return result;
	}


	return (

		<section className="template">
			<div className="header">
				<i><img className='imageTemplate' src={(resumeInfo.image) ? `data:image/jpeg;base64,${resumeInfo.image}` : ""}/></i>
				<h2>{(resumeInfo.name) ? resumeInfo.name : "Name"}</h2>
				<h5>{(resumeInfo.role) ? roleMapping() : null}</h5>
				<h5>Total Exp: {resumeInfo.total_exp}</h5>
			</div>
			<div className="row">
				<div className="column">
					<h6>ABOUT ME</h6>
					<p>{resumeInfo.about_me}</p>
					<ul>
					{(resumeInfo.about_me_points) ? aboutMePointsMapping() : null}
					</ul>
				</div>
				<div className="col">
					<h6>WORK HISTORY</h6>
					{/* <p>Client: {clientDesc}</p>
					<p>Project: {projectName}</p>
					<p>Role: {role2}</p>
					<p>Duration: {startDate} {endDate}</p>
					<p>Business Solution: {bussinessSol}</p>
					<div className='tech-stack-output'>
						{techStackMapping()}
					</div>
					<div className='project-res-output'>
						<ul>
							{projRespMapping()}
						</ul>
					</div> */}
					{(resumeInfo.workExps) ? workExpMapping() : null}
				</div>
				<div className="column">
					<h6>SKILL & PROFICIENCIES</h6>
					<ul>
					{(resumeInfo.skills) ? skillsMapping(resumeInfo.skills) : null}
					</ul>
				</div>
				<div className="col">
					<h6>EDUCATIONAL BACKGROUND</h6>
					{(resumeInfo.educations) ? educationMapping() : null}
				</div>
				<div className="column">
					<h6>CERTIFICATION AND VOLUNTEER WORK</h6>
					<p>Achievements</p>
					<ul>
						{(resumeInfo.achievement) ? achievementMapping() : null}
					</ul>
					<p>Certificates</p>
					<ul>
						{(resumeInfo.certificate) ? certificateMapping() : null}
					</ul>
				</div>
				<div className="col">
					<h6>MEMBERSHIPS</h6>
					<ul>
						{(resumeInfo.membership) ? membershipMapping() : null}
					</ul>
				</div>
				
			</div>

		</section >

	)
}
export default EditTemplate;