import React, { useState, useEffect } from 'react'
import './Template.css'
import { BiSquare} from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import axios from 'axios';
import './Preview.css'
import { Link, useParams } from 'react-router-dom';


const Preview = (props) => {
	// const arr = Array.from(sessionStorage.mydetails)
	// const [render, setRender] = useState(0)

	const params = useParams();
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
	// const resume_id = sessionStorage.getItem("resume_id");

	useEffect(() => {
		result = async () => {
			try {
				const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${params.id}`).then(res => {
					const response = res.data;
					console.log(res.data)
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
		// console.log(props.term);
	}, [props.term, result]);



	let name = sessionStorage.getItem("name");
	let role = sessionStorage.getItem("role");
	let total_exp = sessionStorage.getItem("total_exp");
	let imageBase = sessionStorage.getItem("imageBase");
	let imageURl = sessionStorage.getItem("image");
	const finalImage = `${imageBase},${imageURl}`;
	// let image = sessionStorage.getItem("image");

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

	let eduName = sessionStorage.getItem("educationName");
    let eduType = sessionStorage.getItem("educationType");
    let eduLocation = sessionStorage.getItem("educationLocation");
    let eduStartDate = sessionStorage.getItem("startDate");
    let eduEndDate = sessionStorage.getItem("endDate");
    let eduPercentage = sessionStorage.getItem("percentage");

	let achievemetns = sessionStorage.getItem("achievement");
    let certificates = sessionStorage.getItem("certificate");

	let membership = sessionStorage.getItem("membership");

	
	// console.log(finalImage);

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

	
	const techStackMapping = () => {
		techStack = techStack.split(',');
		let result = techStack.map(point => {
			return <input type="text" name="technology[]" value={point} />
		})
		return result;
	}

	const achievementMapping = () => {
		achievemetns = achievemetns.split(',');
		let result = achievemetns.map(point => {
			return <li>{point}</li>
		})
		return result;
	}

	const certificateMapping = () => {
		certificates = certificates.split(',');
		let result = certificates.map(point => {
			return <li>{point}</li>
		})
		return result;
	}

	const membershipMapping = () => {
		membership = membership.split(',');
		let result = membership.map(point => {
			return <li>{point}</li>
		})
		return result;
	}

	return (

		<section className="preview">
            <div className='preStyle'>
                <Link to="/managerHome" className="arrowBtn"><HiOutlineArrowCircleLeft /></Link>
                <i><img className='imagePreview' src={finalImage}/></i>
                <div className="PreHeader">
                    
                    <h2>{name}</h2>
                    <h5>{roleMapping()}</h5>
                    <h5>Total Exp: {total_exp}</h5>
                </div>
                <div className='mainBtn'>
                    <button className='preBtn'>Approve</button>
                    <button className='preBtn'>Comment</button>
					<button className='preBtn'>Export</button>
                </div>
                
            </div>
            
			<div className="PreRow">
				<div className="PreColumn">
					<h4>ABOUT ME</h4>
					<p>{aboutMe}</p>
					<ul>
						{aboutMePointsMapping()}
					</ul>
				</div>
				<div className="PreColumn">
					<h4>WORK HISTORY</h4>
					<p>Client: {clientDesc}</p>
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
					</div>
				</div>
				<div className="PreColumn">
					<h4>SKILL & PROFICIENCIES</h4>
					<ul>
						{skillsMapping()}
					</ul>
				</div>
				<div className="PreColumn">
					<h4>EDUCATIONAL BACKGROUND</h4>
					<p>{eduType}</p>
					<p>{eduName}</p>
					<p>{eduLocation}</p>
					<p>{eduStartDate} - {eduEndDate}</p>
					<p>{`Percentage : ${eduPercentage}`}</p>
				</div>
				<div className="PreColumn">
					<h4>CERTIFICATION AND VOLUNTEER WORK</h4>
					<p>Achievements</p>
					<ul>
						{achievementMapping()}
					</ul>
					<p>Certificates</p>
					<ul>
						{certificateMapping()}
					</ul>
				</div>
				<div className="PreColumn">
					<h4>MEMBERSHIPS</h4>
					{/* <p>Some text..</p> */}
					<ul>
						{membershipMapping()}
					</ul>
				</div>
				
			</div>

		</section >

	)
}
export default Preview;