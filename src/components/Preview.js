import React, { useState, useEffect } from 'react'
import './Template.css'
import { BiSquare } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import axios from 'axios';
import './Preview.css'
import { Link, useParams } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import swal from 'sweetalert';


const Preview = (props) => {
	const [resumeInfo, setResumeInfo] = useState({});
	const params = useParams();
	const [temp, setTemp] = useState({});

	let result = null;
	useEffect(() => {
		result = async () => {
			try {
				const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${params.id}`).then(res => {
					const response = res.data;
					console.log(res.data)
					setResumeInfo(res.data);
				})
			}
			catch (err) {
				console.log(err);
			}
		}
		result();
	}, [props.term, result, temp]);

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

	// swal("Good job!", "You clicked the button!", "success");

	const addCommentToResume = (id) => {
		swal("Write comments here:", {
			content: "input",
		}).then((value) => {
			if (value === null)
				return;
			axios.put(`http://localhost:8080/resume/comment/${id}`, {
				"comment": value
			})
			swal(`Resume Feedback is shared with the user`);
		});
	}

	const exportResume = () => {
		var divContents = document.querySelector(".preview").innerHTML;
		var printWindow = window.open('', '', 'height=200,width=400');
		printWindow.document.write('<html><head><title>Print DIV Content</title>');
		printWindow.document.write('</head><body >');
		printWindow.document.write(divContents);
		printWindow.document.write('</body></html>');
		printWindow.document.close();
		printWindow.print();
	}

	const approveResume = (id) => {
		if(resumeInfo.status === "Approved") {
			NotificationManager.success( 'Resume Already Approved !');
		} else {
			axios.put(`http://localhost:8080/resume/approve/${id}`).then(res => {
			NotificationManager.success( 'Approved Successfully !');
			setTemp(res);
		})
		}
	}

	const setColor = (resumeStatus) => {
        if(resumeStatus === 'Approved') {
            return '#32cd32';
        } 
    }

	return (

		<section className="preview" style={{ backgroundImage: "url(/ground.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
			<div className='preStyle'>
				<Link to="/managerHome" className="arrowBtn"><HiOutlineArrowCircleLeft /></Link>
				<span className='h3'><h3>Resume Preview</h3></span>
				
				<div className='mainBtn'>
					<button style={{backgroundColor: setColor(resumeInfo.status)}}
					onClick={() => approveResume(params.id)} className='preBtn'>
						{(resumeInfo.status === "Approved") ? `Approved` : "Approve"}
					</button>
					<button onClick={() => addCommentToResume(params.id)} className='preBtn'>Comment</button>
					<button onClick={exportResume} className='preBtn'>Export</button>
					<NotificationContainer/>
				</div>

			</div>



            <div className='preResume' style={{ backgroundImage: "url(/hd.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover" }} >
				<div className='gt'>
				<div className="PreHeader" >
					<i><img className='imagePreview' src={(resumeInfo.image) ? `data:image/jpeg;base64,${resumeInfo.image}` : ""} /></i>
					<h2>{resumeInfo.name}</h2>
					<h5>{(resumeInfo.role) ? roleMapping() : null}</h5>
					<h5>Total Exp: {resumeInfo.total_exp}</h5>
				</div>
				</div>
				

				<div className="PreRow">
					<div className="PreColumn">
						<h4>ABOUT ME</h4>
						<p>{resumeInfo.about_me}</p>
						<ul>
							{(resumeInfo.about_me_points) ? aboutMePointsMapping() : null}
						</ul>
					</div>
					<div className="PreColumn">
						<h4>WORK HISTORY</h4>
						{(resumeInfo.workExps) ? workExpMapping() : null}
					</div>
					<div className="PreColumn">
						<h4>SKILL & PROFICIENCIES</h4>
						<ul>
							{(resumeInfo.skills) ? skillsMapping(resumeInfo.skills) : null}
						</ul>
					</div>
					<div className="PreColumn">
						<h4>EDUCATIONAL BACKGROUND</h4>
						{(resumeInfo.educations) ? educationMapping() : null}
					</div>
					<div className="PreColumn">
						<h4>CERTIFICATION AND VOLUNTEER WORK</h4>
						<p>Achievements</p>
						<ul>
							{(resumeInfo.achievement) ? achievementMapping() : null}
						</ul>
						<p>Certificates</p>
						<ul>
							{(resumeInfo.certificate) ? certificateMapping() : null}
						</ul>
					</div>
					<div className="PreColumn">
						<h4>MEMBERSHIPS</h4>
						<ul>
							{(resumeInfo.membership) ? membershipMapping() : null}
						</ul>
					</div>

				</div>
			</div>
			

		</section >

	)
}
export default Preview;