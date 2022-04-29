import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './EditEducationalBackground.css';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";


const EditEducationalBackground = () => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState({
    "educationName": "",
    "educationType": "",
    "educationLocation": "",
    "startDate": "",
    "endDate": "",
    "percentage": ""
  });

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
    console.log(d);
    axios.put(`http://localhost:8080/edu/${resumeInfo.educations[0].educationId}`, 
      {
        "educationName": d.type,
        "educationType": d.name,
        "educationLocation": d.location,
        "startDate": d.startdate,
        "endDate": d.enddate,
        "percentage": d.percentage
        
      }
    )
      .then(res => {
        if (res) {
          let date = new Date();
          setTerm(date.toLocaleString());
          console.log(res.data);
        }
      })
    setTerm(5);



    reset();
  }

  // const handleChange = name => event => {
  //   setResumeInfo({ ...resumeInfo, educations[0].[name]: event.target.value })
  // }

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value })
  }

  //   educationId: 5
  // educationLocation: "Jaipur"
  // educationName: "b.Tech"
  // educationType: "Suryansh"
  // endDate: "2022-04-13"
  // percentage: 98
  // resume_id: 6
  // startDate: "2022-04-15"
  const educationMapper = () => {
    let result = [];
    result = resumeInfo.educations.map((data, index) => {
      return (
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
            <input className="eduName"{...register("name")}
              name="name" id="name" placeholder={data.educationName} />
          </label>

          <label className="edu-field">
            Location of Institute
            <input className="eduLocation"{...register("location")} placeholder={data.educationLocation}
              name="location" id="location" />
          </label>

          <label className="edu-field">
            Duration
            <input className="startDate"{...register("startdate")} type="date" name="startdate[]" placeholder={data.startDate} />
            <span><input placeholder={data.endDate}
              className="endDate"{...register("enddate")} type="date" name="enddate[]" /></span>

          </label>

          <label className="edu-field">
            Percentage
            <input placeholder={data.percentage}
              className="eduGrade"{...register("percentage")} name="percentage" id="Percentage" />
            <span>  %</span>
          </label>
        </div>
      )
    });
    return result;
  }

  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
        <div className="buttons">
          <button className="button2">Cancel</button>
          <input type="submit" name="aboutme" value="Save" />
          <button className="button1"><i><FaArrowRight /></i></button>
        </div>
        {(resumeInfo.educations) ? educationMapper() : null}
        {/* <div className="footer">
          <span className="plus"><FaPlus /></span><input className="element" {...register('addEducation')} type="text" name="addEducation[]" placeholder='Add education details' value="Add education details" />
        </div> */}


      </form>
    </>
  );
}
export default EditEducationalBackground;