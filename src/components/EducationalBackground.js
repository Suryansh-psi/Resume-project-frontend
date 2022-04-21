import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './EducationalBackground.css';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";


const EducationalBackground = () => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    // sessionStorage.setItem("educationalbackground", JSON.stringify(d))
    // const data = JSON.parse(sessionStorage.getItem('educationalbackground'))
    // console.log(sessionStorage.key(0))
    // console.log(data)

    console.log(d);
    const resume_id = sessionStorage.getItem('resume_id');
    axios.post('http://localhost:8080/edu', [
      {
        "educationName": d.type,
        "educationType": d.name,
        "educationLocation": d.location,
        "startDate": d.startdate,
        "endDate": d.enddate,
        "percentage": d.percentage,
        "resume_id": resume_id
      }
    ])
      .then(res => {
        if (res) {
          console.log(res);
        }
      })
    setTerm(5);


    sessionStorage.setItem("educationName", d.type);
    sessionStorage.setItem("educationType", d.name);
    sessionStorage.setItem("educationLocation", d.location);
    sessionStorage.setItem("startDate", d.startdate);
    sessionStorage.setItem("endDate", d.enddate);
    sessionStorage.setItem("percentage", d.percentage);

    // reset();
  }
  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
        <div className="buttons">
          <button className="button2">Cancel</button>
          <input type="submit" name="aboutme" value="Save" />
          <button className="button1"><i><FaArrowRight /></i></button>
        </div>
        <div className="eduBackground">
          <label className="edu-field">Type of Course</label>
          <select name="type" {...register("type")} id="type" className="dropdown">
            <option value="/">---Select---</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="b.Tech">B.Tech</option>
            <option value="m.Tech">M.Tech</option>
            <option value="bca">BCA</option>
            <option value="ba">BA</option>
            <option value="mca">MCA</option>
            <option value="ma">MA</option>
          </select>
          <label className="edu-field">
            Name of Institute
            <input className="eduName"{...register("name")} name="name" id="name" />
          </label>

          <label className="edu-field">
            Location of Institute
            <input className="eduLocation"{...register("location")} name="location" id="location" />
          </label>

          <label className="edu-field">
            Duration
            <input className="startDate"{...register("startdate")} type="date" name="startdate[]" />
            <span><input className="endDate"{...register("enddate")} type="date" name="enddate[]" /></span>

          </label>

          <label className="edu-field">
            Percentage
            <input className="eduGrade"{...register("percentage")} placeholder="Percentage" name="percentage" id="Percentage" />
            <span>  %</span>
          </label>
        </div>
        <div className="footer">
          <span className="plus"><FaPlus /></span><input className="element" {...register('addEducation')} type="text" name="addEducation[]" placeholder='Add education details' value="Add education details" />
        </div>


      </form>
    </>
  );
}
export default EducationalBackground