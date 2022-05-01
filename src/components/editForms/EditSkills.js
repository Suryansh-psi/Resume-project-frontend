import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import SearchBox from 'react-search-box';
import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import './EditSkills.css'

const EditSkills = () => {
	const [term, setTerm] = useOutletContext();
	const { register, handleSubmit, reset } = useForm();
	const [skillData, setSkillData] = useState([]);

	const [temp, setTemp] = useState(0);
	const [resumeInfo, setResumeInfo] = useState({});
	const id = sessionStorage.getItem("editIdUser");

	useEffect(() => {
		let result = async () => {
			try {
				const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${id}`).then(res => {
					const response = res.data;
					setResumeInfo(response);
					console.log(response);
				})
			}
			catch (err) {
				console.log(err);
			}
		}
		result();
	}, [temp]);



	const customFunction = (d) => {
		axios.put(`http://localhost:8080/resume/skills/${id}`, {
			skills: d.skill
		}).then(res => {
			let date = new Date();
			setTerm(date.toLocaleString());
			console.log(res.data);
		})
		setTerm(3);
		setResumeInfo({ ...resumeInfo, "skills": d.skill });
		reset();
	}

	useEffect(() => {
		let result = async () => {
			try {
				const result2 = await axios.get(`http://localhost:8080/skills`).then(res => {
					const response = res.data;
					console.log(response);
					setSkillData(response);
				})
			}
			catch (err) {
				console.log(err);
			}
		}
		result();
	}, []);

	const deleteskills = (key) => {
		setResumeInfo({
		  ...resumeInfo, "skills": resumeInfo.skills.filter((ele, i) => {
			return i !== key;
		  })
		})
	  }


	const skillsFromDatabaseMapper = () => {
		let result = resumeInfo.skills.map((data, index) => {
			let category = data.split('#')[0];
			let skill = data.split('#')[1];
			// <p>{`${category} : ${skill}`}</p>
			return (
				<>
					<input className="sP" type="text"
					 value={`${category} : ${skill}`} /> 
					{/* <span ><GrFormClose /></span> */}
					<span onClick={() => deleteskills(index)} className="close" ><GrFormClose /></span>
				</>
			)
		})
		return result;
	}

	const skillsMapping = skillData.map((data, index) => {
		return (
			<tr key={index}>
				<td><input {...register('skill')} type="checkbox" name='skill[]' value={`${data.category}#${data.skill}`} /></td>
				<td>{data.category}</td>
				<td>{data.skill}</td>
			</tr>
		)
	})


	return (
		<div>

			<form onSubmit={handleSubmit((data) => customFunction(data))}>
				<div className="buttons">
					<button className="button2">Cancel</button>
					<input type="submit" name="aboutme" value="Save" />

					<button className="button1"><i><FaArrowRight /></i></button>
				</div>
				<h6 className="skillHeader"><div>Skills & </div>Proficiencies</h6>
				{/* i added list here */}
				<div className="skillEdit">
					{/* <span className="close"><GrFormClose /></span> */}
					{(resumeInfo.skills) ? skillsFromDatabaseMapper() : null}
				</div>
				{/* <div className="boxRole">
					

				</div> */}
				<div className="SearchBox">
					<input {...register('points')} type="text" name="points[]" placeholder="Search" />
					<i><FaSearch /></i>
				</div>
				<table border="2" className="skillTable">

					<thead>
						<tr>
							<th>Select</th>
							<th>Category<i><FaFilter /></i></th>
							<th>Skill<i><FaFilter /></i></th>
						</tr>
					</thead>
					<tbody>
						{skillsMapping}
					</tbody>
				</table>
			</form>
		</div>
	);
}

export default EditSkills;