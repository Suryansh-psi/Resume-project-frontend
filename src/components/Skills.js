import React, { useState } from "react";

import { useForm } from "react-hook-form";
import SearchBox from 'react-search-box';
import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import './Skills.css'

const Skills = () => {
	const [term, setTerm] = useOutletContext();
	const { register, handleSubmit } = useForm();
	const [data, setData] = useState("");

	const customFunction = (d) => {
		// sessionStorage.setItem("skills", JSON.stringify(d));
		// const data = JSON.parse(sessionStorage.getItem('skills'))
		// console.log(sessionStorage.key(0))
		// console.log(data)
		const resume_id = sessionStorage.getItem('resume_id');
		axios.put(`http://localhost:8080/resume/skills/${resume_id}`, {
			skills: d.skill
		})
			.then(res => {
				console.log(res);
				console.log(res.data);
			})
		setTerm(3);

		sessionStorage.setItem("skills", d.skill);
	}

	return (
		<div>

			<form onSubmit={handleSubmit((data) => customFunction(data))}>
				<div className="buttons">
					<button className="button2">Cancel</button>
					<input type="submit" name="aboutme" value="Save" />

					<button className="button1"><FaArrowRight /></button>
				</div>
				<h6 className="skillHeader"><div>Skills & </div>Proficiencies</h6>
				<div className="SearchBox">
					<input {...register('points')} type="text" name="points[]" placeholder="Search" />
					<i><FaSearch /></i>
				</div>
				<table border="2" className="skillTable">

					<thead>
						<tr>
							<th>Select</th>
							<th>Category<a><FaFilter /></a></th>
							<th>Skill<i><FaFilter /></i></th>
						</tr>
					</thead>
					<tbody>
						<tr key={0}>
							<td><input {...register('skill')} type="checkbox" name='skill[]' value="Business Analysis#Agile" /></td>
							<td>Business Analysis</td>
							<td>Agile</td>
						</tr>
						<tr key={1}>
							<td><input {...register('skill')} type="checkbox" name='skill[]' value="Business Analysis#Business Requirement Doc" /></td>
							<td>Business Analysis</td>
							<td>Business Requirement Doc</td>
						</tr>
						<tr key={2}>
							<td><input {...register('skill')} type="checkbox" name='skill[]' value="Business Analysis#Flow Diagrams" /></td>
							<td>Business Analysis</td>
							<td>Flow Diagrams</td>
						</tr>
						<tr key={3}>
							<td><input {...register('skill')} type="checkbox" name='skill[]' value="Business Analysis#Wireframe" /></td>
							<td>Business Analysis</td>
							<td>Wireframe</td>
						</tr>
						<tr key={4}>
							<td><input {...register('skill')} type="checkbox" name='skill[]' value="Business Analysis#Other" /></td>
							<td>Business Analysis</td>
							<td>Other</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	);
}

export default Skills