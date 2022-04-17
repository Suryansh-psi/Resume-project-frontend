import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './EducationalBackground.css'

function EducationalBackground() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    sessionStorage.setItem("educationalbackground", JSON.stringify(d))
    const data = JSON.parse(sessionStorage.getItem('educationalbackground'))
    console.log(sessionStorage.key(0))
    console.log(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <div className="buttons">
        <button className="button2">Cancel</button>
        <input type="submit" name="aboutme" value="Save" />
        <button className="button1"><FaArrowRight /></button>
      </div>
      <div className="eduBackground">
        <label className="edu-field">Type of Establishment</label>
        <select name="type" id="type" className="dropdown">
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
          Name of Establishment
          <input className="eduName"{...register("name")}  name="name" id="name" />
        </label>

        <label className="edu-field">
          Location of Establishment
          <input className="eduLocation"{...register("location")}  name="location" id="location" />
        </label>
        
        <label className="edu-field">
            Duration
            <input className="startDate"{...register("startdate")} type="date" name="startdate[]" />
            <span><input className="endDate"{...register("enddate")} type="date" name="enddate[]" /></span>
    
          </label>
        
          <label className="edu-field">
            Percentage
            <input className="eduGrade"{...register("percentage")} placeholder="Percentage" name="Percentage" id="Percentage" />
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